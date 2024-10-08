import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Register() {
  return (
    <>
      {/* <div className="mx-auto flex h-screen w-screen flex-col items-center md:flex-row bg-blue-700"> */}
      <div className="flex h-full flex-col lg:flex-row">
        {/* Left Column - Title and Typewriter */}
        <div className="bg-gray-950 text-white px-6 py-12 w-full lg:w-1/2 lg:px-10 lg:py-20 ">
          <p className="my-2 text-5xl font-extrabold tracking-wider sm:text-6xl lg:text-7xl ">
            FAST
          </p>
          <p className="font-bold text-3xl sm:text-4xl">Transit</p>
          <p className="mt-32  font-bold  sm:text-4xl md:text-5xl lg:text-5xl text-gray-9=200">
            <span className="whitespace-normal break-words">
              <Typewriter
                words={["Continue your journey with us"]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={200}
                deleteSpeed={150}
                delaySpeed={1000}
              />
            </span>
          </p>
          <p className="mt-4 text-gray-500 font-semibold leading-relaxed text-2xl">
            Join the community that moves forward fast!
          </p>
        </div>

        {/* Right Column - Form */}
        <div className="w-full max-w-lg px-6 py-12 lg:w-1/2 lg:py-20 m-auto">
          <h2 className="mb-2 text-3xl font-bold">Sign In</h2>
          <a
            href="#"
            className="mb-16 block font-bold text-gray-400 hover:text-gray-800"
          >
            Already Have an account?
          </a>

          <p className="mb-2 font-medium text-black">Are you a?</p>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex w-full items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 sm:w-1/2">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio1"
                checked
              />
              <label
                className="peer-checked:border-gray-600 peer-checked:bg-gray-200 absolute inset-0 cursor-pointer rounded-xl border"
                htmlFor="radio1"
              ></label>
              <div className="peer-checked:border-transparent peer-checked:bg-gray-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-gray-600 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Vendor</span>
            </div>

            <div className="relative flex w-full items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 sm:w-1/2">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio3"
                checked
              />
              <label
                className="peer-checked:border-gray-600 peer-checked:bg-gray-200 absolute inset-0 cursor-pointer rounded-xl border"
                htmlFor="radio3"
              ></label>
              <div className="peer-checked:border-transparent peer-checked:bg-gray-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-gray-600 ring-offset-2"></div>
              <span className="pointer-events-none z-10">
                Student or Faculty
              </span>
            </div>
          </div>

          <p className="mb-2 font-medium text-black">Email</p>
          <div className="mb-6">
            <div className="focus-within:border-black relative rounded-md border-2">
              <input
                type="email"
                id="signup-email"
                className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <p className="mb-2 font-medium text-black">Password</p>
          <div className="mb-6">
            <div className="focus-within:border-black relative rounded border-2">
              <input
                type="password"
                id="signup-password"
                className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Choose a password (minimum 8 characters)"
              />
            </div>
          </div>

          <button className="w-full rounded bg-gray-300 hover:bg-gray-400 px-8 py-3 font-bold text-gray-900  transition-all hover:opacity-90 hover:shadow-lg">
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
