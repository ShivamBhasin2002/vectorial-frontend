import AuthModal from "@components/authModal";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen px-16 pt-16">
      <div className="w-full h-full bg-cream rounded-[42px] flex p-8 gap-6 justify-between">
        <div className="flex flex-col gap-2 just min-w-[50%] w-[50%] justify-center">
          <div className="font-extrabold text-[48px] whitespace-pre-wrap">
            Vectorial AI: Insights at Your Fingertips
          </div>
          <p className="text-[16px]  whitespace-pre-wrap">
            Harness the power of AI to unlock deep insights into your products.
            Get started today!
          </p>
        </div>
        <div className="flex-auto max-w-[50%] h-full w-full rounded-[48px] bg-[#6A333348] shadow-[inset_5px_-5px_14px_5px_rgba(0,0,0,0.5)]">
          <AuthModal />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
