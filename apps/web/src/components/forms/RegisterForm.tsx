import type { LoginFormFields } from "@/types/user.types";
import { useForm } from "react-hook-form";

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSubmit: (formFields: LoginFormFields) => void;
}

export default function RegisterForm({
  isLoading,
  setIsLoading,
  onSubmit,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  function onSubmitForm(data: LoginFormFields) {
    setIsLoading(true);
    onSubmit(data);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email addres
        </label>
        <div className="mt-1">
          <input
            id="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#7446EA] focus:border-[#7446EA] sm:text-sm ${errors.email?.message ? "border-red-600" : ""}`}
            placeholder="you@example.com"
          />
          {errors.email?.message && (
            <p className="mt-2 text-sm text-gray-400">
              {errors.email?.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full name
        </label>
        <div className="mt-1">
          <input
            id="name"
            autoComplete="name"
            {...register("name", { required: "Full name is required" })}
            className={`block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#7446EA] focus:border-[#7446EA] sm:text-sm ${errors.name?.message ? "border-red-600" : ""}`}
            placeholder="John Doe"
          />
          {errors.name?.message && (
            <p className="mt-2 text-sm text-gray-400">{errors.name?.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                message:
                  "Password must be at least 8 characters long and contain at least one letter and one number",
              },
            })}
            className={`block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-[#7446EA] focus:border-[#7446EA] sm:text-sm ${errors.password?.message ? "border-red-600" : ""}`}
          />
          {errors.password?.message && (
            <p className="mt-2 text-sm text-gray-400">
              {errors.password?.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#7446EA] border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7446EA] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? (
            <>
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
}
