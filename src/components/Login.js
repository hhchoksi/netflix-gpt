import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidDataSignin, checkValidDataSignup } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const ToggleSigninForm = () => {
    setIsSigninForm(!isSigninForm);
  };

  const fullname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    if (isSigninForm) {
      const msg = checkValidDataSignin(email.current.value, password.current.value);
      setErrorMessage(msg);
      if (msg) return;
    } else {
      const msg = checkValidDataSignup(fullname.current.value, email.current.value, password.current.value);
      setErrorMessage(msg);
      if (msg) return;
    }

    if (!isSigninForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in successfully, redirect to home page
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
          console.error("Error creating user:", errorMessage);
        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in successfully, redirect to home page
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
          console.error("Error signing in:", errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="relative w-full h-screen">
        <img
          src="https://nyctastemakers.com/wp-content/uploads/2021/10/NYCTM-Home-Banner-39.png"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-65 z-10"></div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute w-3/12 p-12 bg-black my-36 bg-opacity-65 mx-auto right-0 left-0 text-white z-20"
        >
          <h1 className="text-3xl font-bold text-left my-6">
            {isSigninForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSigninForm && (
            <input
              ref={fullname}
              type="text"
              placeholder="Full Name"
              className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-gray-700"
          />
          <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
          <button
            className="w-full p-2 bg-red-600 rounded-md my-2"
            onClick={handleButtonClick}
          >
            {isSigninForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-left space-x-2">
            {isSigninForm ? "New to Netflix?" : "Already a User?"}
          </p>
          <p
            className="cursor-pointer text-gray-500"
            onClick={ToggleSigninForm}
          >
            {isSigninForm ? "Sign up Now" : "Sign in now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
