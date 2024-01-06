import { useState } from "react";

export default function Home() {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (isLoginMode) {
      // send login request
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        setSuccessMessage("You've successfully logged in!");
        // auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setErrorMessage(
          err.message || "Something went wrong, please try again."
        );
      }
    } else {
      // send signup request
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        setSuccessMessage("You've successfully signed up!");
        // auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setErrorMessage(
          err.message || "Something went wrong, please try again."
        );
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setIsLoginMode(!isLoginMode);
          setName("");
          setEmail("");
          setPassword("");
        }}
      >
        {!isLoginMode ? "Login" : "Signup"}
      </button>
      <h1 className="text-3xl font-bold mb-4">
        {isLoginMode ? "Login" : "Signup"}
      </h1>
      {isLoading && <div>Loading</div>}
      {errorMessage && (
        <div className="text-red-800 font-bold bg-red-200 mb-4 p-4">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="text-green-800 font-bold bg-green-200 mb-4 p-4">
          {successMessage}
        </div>
      )}
      <form method="POST" onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <input
            type="text"
            name="name"
            placeholder="name"
            className="block border border-slate-500 p-3 rounded mb-4 w-full"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isLoading}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="email"
          className="block border border-slate-500 p-3 rounded mb-4 w-full"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="block border border-slate-500 p-3 rounded mb-4 w-full"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-slate-500 text-white p-3 rounded mb-4"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
