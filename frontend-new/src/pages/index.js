import { useState } from "react";

export default function Home() {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      // send login request
    } else {
      // send signup request
      try {
        setIsLoading(true);
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
        console.log("Response", responseData);
        setIsLoading(false);
        // auth.login();
      } catch (err) {
        console.log("Error", err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    }
  };

  return (
    <>
      {isLoading && <div>Loading</div>}
      <form method="POST" onSubmit={authSubmitHandler} className="p-4">
        <input
          type="text"
          name="name"
          placeholder="name"
          className="block border border-slate-500 p-3 rounded mb-4 w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={isLoading}
        />
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
    </>
  );
}
