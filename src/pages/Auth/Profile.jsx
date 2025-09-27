/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  UserCircleIcon,
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  CakeIcon,
} from "@heroicons/react/24/outline";
import { authService } from "../../services/authService";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/loadingContext";
import PageSEO from "../../components/PageSEO";

// Utility function to format date
const formatDate = (dateString) => {
  if (!dateString) return "Not provided";
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Yup validation schema
const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Contact must be a valid 10-digit number")
    .nullable()
    .notRequired(),
  dob: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .nullable()
    .notRequired(),
});

export default function Profile() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    const fetchUserProfile = async () => {
      startLoading();
      try {
        const profileData = await authService.getProfile();
        setUser(profileData);
      } catch (err) {
        setError("Error loading profile data. Please try again.");
        console.error("Failed to fetch profile:", err);
      } finally {
        stopLoading();
      }
    };
    fetchUserProfile();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-800">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
     <PageSEO page="profile" />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left side */}
        <div className="md:w-1/2 p-6 lg:p-8 flex flex-col items-center justify-center text-center bg-indigo-700 text-white">
          <UserCircleIcon className="h-24 w-24 text-indigo-400 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-indigo-100">
            {user.name || "Your Profile"}
          </h1>
          <p className="text-indigo-200 text-base">{user.email}</p>
          <div className="mt-6 space-y-3 w-full max-w-md">
            <div className="flex items-center bg-indigo-600 bg-opacity-50 p-3 rounded-xl">
              <EnvelopeIcon className="h-5 w-5 text-indigo-100 mr-3" />
              <span className="text-indigo-100 text-sm">{user.email}</span>
            </div>
            <div className="flex items-center bg-indigo-600 bg-opacity-50 p-3 rounded-xl">
              <PhoneIcon className="h-5 w-5 text-indigo-100 mr-3" />
              <span className="text-indigo-100 text-sm">
                {user.contact || "Not provided"}
              </span>
            </div>
            <div className="flex items-center bg-indigo-600 bg-opacity-50 p-3 rounded-xl">
              <CakeIcon className="h-5 w-5 text-indigo-100 mr-3" />
              <span className="text-indigo-100 text-sm">
                {formatDate(user.dob)}
              </span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 p-6 lg:p-8 bg-white text-gray-800 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            {isEditing ? "Update Profile" : "Manage Your Account"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded-md text-xs text-center mb-3 border border-red-200">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-2 rounded-md text-xs text-center mb-3 border border-green-200">
              {successMessage}
            </div>
          )}

          {isEditing ? (
            <Formik
              initialValues={{
                name: user.name || "",
                contact: user.contact || "",
                dob: user.dob
                  ? new Date(user.dob).toISOString().split("T")[0]
                  : "",
              }}
              validationSchema={profileSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setError("");
                setSuccessMessage("");
                startLoading();
                try {
                  const response = await authService.updateProfile(values);
                  setUser(response);
                  setIsEditing(false);
                  setSuccessMessage("Profile updated successfully!");
                } catch (err) {
                  setError("Failed to update profile.");
                  console.error("Failed to update profile:", err);
                } finally {
                  stopLoading();
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm font-semibold">
                      Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="bg-gray-100 px-3 py-2.5 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm font-semibold">
                      Contact Number
                    </label>
                    <Field
                      name="contact"
                      type="tel"
                      className="bg-gray-100 px-3 py-2.5 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                      placeholder="Enter your contact number"
                    />
                    <ErrorMessage
                      name="contact"
                      component="p"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm font-semibold">
                      Date of Birth
                    </label>
                    <Field
                      name="dob"
                      type="date"
                      className="bg-gray-100 px-3 py-2.5 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                    />
                    <ErrorMessage
                      name="dob"
                      component="p"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 border text-sm border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-indigo-600 text-sm rounded-lg text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600 mb-4 text-center text-sm">
                Click below to update your personal details or log out of your
                account.
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 rounded-lg text-white font-bold text-sm hover:bg-indigo-700 transition"
              >
                <PencilIcon className="h-4 w-4" /> Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 text-red-600 text-sm font-bold hover:bg-red-50 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
        </>  
  );
}
