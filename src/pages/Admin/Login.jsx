import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Admin from "./Admin.jsx";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/admin");
        console.log(user);
      })
      .catch((error) => {
        // console.log(errorCode, errorMessage)
        toast.error("Credientals doesn't matches!", {
          position: "bottom-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6 mx-5">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                class="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>

            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                class="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <button
              onClick={onLogin}
              type="submit"
              class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
