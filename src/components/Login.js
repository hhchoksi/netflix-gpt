import Header from "./Header"
import { useState } from "react";

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true)
  const ToggleSigninForm = () => {
    setIsSigninForm(!isSigninForm)
  }

  return (
    <div>
      <Header />
      <div lassName="relative w-full h-screen">
        <img
          src="https://nyctastemakers.com/wp-content/uploads/2021/10/NYCTM-Home-Banner-39.png"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-black bg-opacity-65"></div>
      </div>
      <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="text-3xl font-bold text-left my-6">{isSigninForm ? "Sign In" : "Sign Up"}</h1>
        {!isSigninForm && <input type="text" placeholder="Full Name"
          className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-gray-700" />}
        <input type="text" placeholder="Email Address" 
          className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-gray-700" />
        <input type="password" placeholder="Password" 
          className="block w-full p-2 my-6 border border-gray-300 rounded-md bg-gray-700" />
        <button className="w-full p-2 bg-red-500 rounded-md my-2">{isSigninForm ? "Sign In" : "Sign Up"}</button>
        <p className="text-left space-x-2">{isSigninForm ? "New to Netflix?" : "Already a User?"}</p>
        <p className="cursor-pointer text-gray-500" onClick={ToggleSigninForm}>{isSigninForm ? "Sign up Now" : "Sign in now"}</p>

      </form>
    </div>
  )
}

export default Login