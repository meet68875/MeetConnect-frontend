import React from "react";
import { Link } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const HOME_ROUTE = "/";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div
        className="w-full max-w-xl lg:max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 lg:p-16 text-center 
                      transform transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-3xl border border-gray-100"
      >
        <ExclamationTriangleIcon className="h-24 w-24 text-indigo-700 mx-auto mb-8 transition-colors duration-300 hover:text-indigo-800" />

        <h1
          className="text-8xl sm:text-9xl font-extrabold tracking-tight mb-4 text-indigo-200"
          style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.05)" }}
        >
          404
        </h1>

        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-gray-900">
          Oops! Page Not Found
        </h2>

        <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-sm mx-auto">
          It looks like the page you were looking for doesn't exist or has
          moved. Let's get you back on track.
        </p>

        <Link
          to={HOME_ROUTE}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 rounded-full text-white 
                     font-bold text-lg hover:bg-indigo-700 transition-all duration-300 
                     shadow-xl hover:shadow-2xl hover:translate-y-[-2px] 
                     focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-70 focus:bg-indigo-800"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Return to Homepage</span>
        </Link>
        <div className="mt-12 text-sm text-gray-500">
          <p>
            If you continue to see this error, please consider{" "}
            <a
              href="#"
              className="underline hover:text-indigo-600 transition-colors"
            >
              contacting support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
