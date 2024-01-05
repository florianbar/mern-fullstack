import { useState } from "react";

export default function Home() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      // send login request
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
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }

    // auth.login();
  };

  return (
    <form method="POST" onSubmit={authSubmitHandler} className="p-4">
      <input
        type="text"
        name="name"
        placeholder="name"
        className="block border border-slate-500 p-3 rounded mb-4 w-full"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        className="block border border-slate-500 p-3 rounded mb-4 w-full"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        className="block border border-slate-500 p-3 rounded mb-4 w-full"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        type="submit"
        className="bg-slate-500 text-white p-3 rounded mb-4"
      >
        Submit
      </button>
    </form>
  );
}
