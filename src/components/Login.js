import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidDataSignin, checkValidDataSignup } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fullname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const USER_AVATAR = "https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/hand-two-finger-color-icon.png";

  const ToggleSigninForm = () => {
    setIsSigninForm(!isSigninForm);
  };

  const handleButtonClick = () => {
    if (!isSigninForm) {
      const msg = checkValidDataSignup(fullname.current.value, email.current.value, password.current.value);
      setErrorMessage(msg);
      if (msg) return;

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullname.current.value,
            photoURL: USER_AVATAR,
          })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              })
            );
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
          console.error("Error creating user:", error.message);
        });
    } else {
      const msg = checkValidDataSignin(email.current.value, password.current.value);
      setErrorMessage(msg);
      if (msg) return;

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
          console.error("Error signing in:", error.message);
        });
    }
  };

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
              className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-black bg-opacity-10"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-black bg-opacity-10"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-black bg-opacity-10"
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
