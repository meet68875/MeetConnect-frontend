/* eslint-disable no-unused-vars */
// src/components/Login.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { authService } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { EnvelopeIcon, LockClosedIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import PageSEO from "../../components/PageSEO";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
         <PageSEO page="login" />
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left side: Static branding content */}
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col items-center justify-center text-center bg-indigo-700 text-white">
          <UserIcon className="h-28 w-28 text-indigo-400 mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-indigo-100">
            Welcome to Our CMS
          </h1>
          <p className="text-indigo-200 text-lg">
            Sign in to manage your account and interviews.
          </p>
          <div className="mt-8">
            {/* You can add more static content or a subtle brand image here */}
            <p className="text-indigo-300">
              Your one-stop solution for seamless workflow management.
            </p>
          </div>
        </div>

        {/* Right side: Login form */}
        <div className="md:w-1/2 p-8 lg:p-12 bg-white text-gray-800 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Log In
          </h2>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm text-center mb-4 border border-red-200">
              {errorMessage}
            </div>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              setErrorMessage("");
              try {
                const res = await authService.login(values);
                localStorage.setItem("accessToken", res.token);
                login(); // Call the login function from AuthContext
                navigate(ROUTES.DASHBOARD);
              } catch (err) {
                setErrorMessage("Login failed. Please check your credentials.");
              } finally {
                setSubmitting(false);
              }
            }}
          >

            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="relative">
                  <EnvelopeIcon className="absolute top-1/2 left-3 h-5 w-5 transform -translate-y-1/2 text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 pl-10 text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-600 text-sm mt-1" />
                </div>

                <div className="relative">
                  <LockClosedIcon className="absolute top-1/2 left-3 h-5 w-5 transform -translate-y-1/2 text-gray-400" />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 pl-10 text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-600 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Log In</span>
                    </>
                  )}
                </button>

                <div className="text-center text-gray-500 mt-6 text-sm sm:text-base">
                  Don’t have an account?{" "}
                  <Link
                    to={ROUTES.SIGNUP}
                    className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </>
  );
}