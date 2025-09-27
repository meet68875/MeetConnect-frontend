/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useLoading } from "../contexts/loadingContext";
import { interviewService } from "../services/interviewService";

export default function ScheduleForm() {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    interviewType: "Behavioral",
    date: "",
    interviewer: "",
    notes: "",
    location: "",
  });
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      await interviewService.scheduleInterview(formData);
      toast.success("🚀 Interview scheduled successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/my-interviews");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to schedule interview.";
      toast.error(`❌ ${errorMessage}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col items-center justify-center text-center bg-indigo-700 text-white">
          <CalendarDaysIcon className="h-24 w-24 text-indigo-400 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-indigo-100">
            Schedule Your Interview
          </h1>
          <p className="text-indigo-200 text-base">
            Effortlessly add and manage your upcoming interviews.
          </p>
          <div className="mt-6">
            <p className="text-indigo-300 text-sm">
              Stay organized and on top of your job search journey.
            </p>
          </div>
        </div>

        {/* Right side: Scheduling form */}
        <div className="md:w-1/2 p-6 lg:p-8 bg-white text-gray-800 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Schedule New Interview
          </h2>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <BriefcaseIcon className="absolute top-1/2 left-3 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  placeholder="Position"
                  className="w-full p-2 pl-9 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <BuildingOfficeIcon className="absolute top-1/2 left-3 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Company"
                  className="w-full p-2 pl-9 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <UserIcon className="absolute top-1/2 left-3 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="interviewer"
                  name="interviewer"
                  value={formData.interviewer}
                  onChange={handleChange}
                  required
                  placeholder="Interviewer Name"
                  className="w-full p-2 pl-9 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <MapPinIcon className="absolute top-1/2 left-3 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Location"
                  className="w-full p-2 pl-9 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <ClockIcon className="absolute top-1/2 left-3 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full p-2 pl-9 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <PlusIcon className="absolute top-1/2 left-3 h-4 w-4 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="interviewType"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  required
                  className="block w-full appearance-none px-2 py-2 pl-9 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-gray-900 bg-gray-100"
                >
                  <option value="Behavioral">Behavioral</option>
                  <option value="Technical">Technical</option>
                  <option value="Full-stack">Full-stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="System Design">System Design</option>
                  <option value="HR">HR</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Add any additional notes about the interview here..."
                className="w-full p-2 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 flex items-center justify-center gap-2 text-sm bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Schedule Interview</span>
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}