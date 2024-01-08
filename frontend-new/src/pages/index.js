import { useState } from "react";

import { useHttpClient } from "../hooks/http-hook";

export default function Home() {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, successMessage, errorMessage, sendRequest, clearError } =
    useHttpClient();

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      // send login request
      try {
        await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email,
            password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        // auth.login();
      } catch (err) {}
    } else {
      // send signup request
      try {
        await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            name,
            email,
            password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
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
