"use client";
import { AUTH_API_ENDPOINT } from "@constants/restConstants";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { FormEvent, useRef } from "react";
import nookies from "nookies";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import VectorialLogo from "@assets/icons/vectorialLogo";

const AuthModal = ({ isLogin }: { isLogin?: boolean }) => {
  const router = useRouter();
  const toggleErrorMessage = (errMsg: string) => {
    toast.error(errMsg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleLogin = async () => {
    const formElement = formRef.current;
    if (!formElement) return;
    const email = (formElement.elements.namedItem("email") as HTMLInputElement)
      .value;
    const password = (
      formElement.elements.namedItem("password") as HTMLInputElement
    ).value;
    await axios
      .post(`${AUTH_API_ENDPOINT}/api/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.status !== 200) {
          if (res.data?.errorMessage) toggleErrorMessage(res.data.errorMessage);
          return;
        }
        nookies.set(null, "authToken", res.data?.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/dashboard");
      })
      .catch(({ response }) => {
        toggleErrorMessage(response.data.errorMessage);
      });
  };
  const handleRegister = async () => {
    const formElement = formRef.current;
    if (!formElement) return;
    const email = (formElement.elements.namedItem("email") as HTMLInputElement)
      .value;
    const name = (
      formElement.elements.namedItem("username") as HTMLInputElement
    ).value;
    const password = (
      formElement.elements.namedItem("password") as HTMLInputElement
    ).value;
    const confirmPassword = (
      formElement.elements.namedItem("confirm-password") as HTMLInputElement
    ).value;
    if (confirmPassword !== password) {
      toggleErrorMessage(
        "Passwords do not match! Please check and enter the passwords"
      );
      return;
    }
    await axios
      .post(`${AUTH_API_ENDPOINT}/api/auth/register`, {
        name,
        email,
        password,
        role: "USER",
      })
      .then((res) => {
        if (res.status !== 200) {
          if (res.data?.errorMessage) toggleErrorMessage(res.data.errorMessage);
          return;
        }
        nookies.set(null, "authToken", res.data?.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/dashboard");
      })
      .catch(({ response }) => {
        toggleErrorMessage(response.data.errorMessage);
      });
  };
  const { slug } = useParams();
  const showLogin = isLogin ?? slug === "login";
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (showLogin) handleLogin();
    else handleRegister();
  };

  return (
    <>
      <ToastContainer />
      <div className="h-full w-100   bg-white rounded-[48px] origin-top-left shadow-[0_2px_2px_1px_rgba(0,0,0,0.25)] p-[24px] flex flex-col gap-10 justify-between overflow-y-scroll">
        <section>
          <div className="text-[48px] font-semibold text-center flex gap-4 justify-center items-center">
            <VectorialLogo width={40} height={40} />
            Vectorial AI
          </div>
          <div className="text-[24px] text-gray-500 text-center">
            {showLogin
              ? "Welcome back!"
              : "Welcome onboard! Please enter your details."}
          </div>
        </section>
        <form
          className="flex flex-col gap-5"
          onSubmit={onFormSubmit}
          ref={formRef}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-lg">
              Email
            </label>
            <input
              required
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-lg p-[14px] border border-gray-400 height-[48px] text-[14px] outline-none"
            />
          </div>
          {!showLogin && (
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-semibold text-lg">
                Full Name
              </label>
              <input
                required
                name="username"
                type="text"
                placeholder="Full Name"
                className="rounded-lg p-[14px] border border-gray-400 height-[48px] text-[14px] outline-none"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-lg">
              Password
            </label>
            <input
              required
              name="password"
              type="password"
              placeholder="Enter your password"
              className="rounded-lg p-[14px] border border-gray-400 height-[48px] text-[14px] outline-none"
            />
          </div>
          {!showLogin && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm-password"
                className="font-semibold text-lg"
              >
                Confirm Password
              </label>
              <input
                required
                name="confirm-password"
                type="password"
                placeholder="Confrim your password"
                className="rounded-lg p-[14px] border border-gray-400 height-[48px] text-[14px] outline-none"
              />
            </div>
          )}
          {showLogin && (
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="w-4 h-4"
                  checked
                />
                Remember me
              </div>
              <div className="text-gray-500 underline cursor-pointer">
                Forgot passoword?
              </div>
            </div>
          )}
          <button className="w-full h-12 text-center text-white bg-black rounded-lg">
            Sign {showLogin ? "in" : "up"}
          </button>
          {/* <div className="flex gap-2 items-center">
          <hr className="flex-1" />
          <span className="text-gray-500">
            or sign {showLogin ? "in" : "up"} with
          </span>
          <hr className="flex-1" />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="text-white w-min  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            <div className="whitespace-nowrap">Sign up with Google</div>
          </button>
        </div> */}
        </form>
        <div className="flex gap-2 justify-center">
          {showLogin ? "Don't have an account?" : "Already have an account?"}
          <strong
            className="underline cursor-pointer hover:text-black/60"
            onClick={() => {
              if (showLogin) router.replace("/auth/signUp");
              if (!showLogin) router.replace("/auth/login");
            }}
          >
            {showLogin ? "Sign up" : "Sign in"}
          </strong>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
