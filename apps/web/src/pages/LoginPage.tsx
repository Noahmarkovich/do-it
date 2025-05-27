import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import logo from "/photos/doIt-logo.png";
import loginBg from "/photos/login-bg.png";
import { login, register } from "@/services/auth.service";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import type { LoginFormFields } from "@/types/user.types";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);

  async function handleSubmit(formFields: LoginFormFields) {
    setIsLoading(true);
    setError("");

    try {
      let user;
      if (isNewUser) {
        user = await register(formFields);
      } else {
        user = await login(formFields);
      }

      if (user) {
        setUser(user);
        navigate("/tasks");
      }
    } catch (err) {
      console.error("Login/Register error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function changeLoginForm() {
    setError("");
    setIsNewUser(!isNewUser);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center w-full max-w-md px-6 py-12 mx-auto">
        <div className="mb-10 text-center">
          <img src={logo} alt="Logo" className=" mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            {isNewUser ? "Welcome" : "Welcome back"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isNewUser
              ? "Sign up to create an account"
              : "Sign in to your account to continue"}
          </p>
        </div>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-800 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {isNewUser ? (
          <RegisterForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSubmit={handleSubmit}
          />
        ) : (
          <LoginForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSubmit={handleSubmit}
          />
        )}

        <p className="mt-8 text-sm text-center text-gray-600">
          {isNewUser ? "Already have an account? " : "Don't have an account? "}
          <a
            className="font-medium text-[#7446EA] hover:text-[#7446EA] cursor-pointer"
            onClick={changeLoginForm}
          >
            {isNewUser ? "Sign in" : "Sign up"}
          </a>
        </p>
      </div>

      <div
        className="hidden w-1/2 bg-cover bg-center lg:block bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="flex flex-col justify-center h-full px-20 bg-[#1018287d]">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold text-white">
              Task Management System
            </h2>
            <p className="mt-4 text-xl text-white">
              Organize your work, manage your team, and track your progress all
              in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
