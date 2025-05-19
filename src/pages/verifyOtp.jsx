import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";
import toast from "react-hot-toast";  // <-- import toast

const schema = z.object({
  code: z
    .string()
    .length(7, "Code must be exactly 7 digits")
    .regex(/^\d{7}$/, "Code must only contain numbers"),
});

export default function VerifyEmail() {
  useDocumentTitle("OpenVoice -Verify-Email");
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", "", ""]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const fullCode = data.code;
    try {
      const response = await fetch("https://citizen-engagement-system-backend.onrender.com/api/user/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: fullCode }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Verification successful:", result);
        toast.success("Code Verified!");  // <-- success toast
        reset();
        setCode(["", "", "", "", "", "", ""]);
        setTimeout(() => navigate("/login"), 1500);
      
      } else {
        console.error("Verification failed:", result);
        toast.error(result.message || "Invalid verification code.");  // <-- error toast
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("Something went wrong. Please try again later.");  // <-- error toast
    }
  };

  return (
    <div className="bg-[#f3f5ff] flex items-center justify-center w-screen min-h-screen p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl flex flex-col p-6 gap-8">
        <div className="w-full flex flex-col rounded-md p-6 justify-center items-center">
          <div className="mb-6">
            <img src={Icon} alt="Logo" className="h-12 w-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>
          <p className="text-sm text-center mt-4 text-gray-600 px-4">
            Please enter the 7-digit code sent to your email address.
          </p>
        </div>

        <div className="w-full flex flex-col justify-center">
          <h2 className="flex justify-center items-center text-2xl font-bold mb-5">
            Enter the code.
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
            <div className="flex gap-4 w-full justify-center">
              <div className="flex gap-4 w-full justify-center flex-wrap">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!/^\d?$/.test(val)) return;
                      const newCode = [...code];
                      newCode[index] = val;
                      setCode(newCode);

                      if (val && index < code.length - 1) {
                        document.getElementById(`digit-${index + 1}`)?.focus();
                      }

                      const fullCode = newCode.join("");
                      setValue("code", fullCode);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !code[index] && index > 0) {
                        document.getElementById(`digit-${index - 1}`)?.focus();
                      }
                    }}
                    id={`digit-${index}`}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] w-8 text-center"
                    placeholder="—"
                  />
                ))}
                <input type="hidden" {...register("code")} />
              </div>
            </div>

            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code.message}</p>
            )}

            <button
              type="submit"
              className="mt-4 bg-[#FFB640] text-white p-3 rounded-md hover:bg-[#ae7821] transition duration-200"
            >
              Verify Email
            </button>

            <div className="text-sm text-gray-600 mt-2 text-center">
              Didn't receive a code?{" "}
              <span className="text-[#FFB640] hover:underline cursor-pointer">
                Resend
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
