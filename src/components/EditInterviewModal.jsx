// src/components/EditInterviewModal.js

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { interviewService } from "../services/interviewService";

export default function EditInterviewModal({
  isOpen,
  onClose,
  interviewData,
  onUpdate,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (interviewData) {
      // Initialize formData with interviewData, handling date format for the input field
      setFormData({
        ...interviewData,
        date: interviewData.date
          ? new Date(interviewData.date).toISOString().substring(0, 16) // Use 'datetime-local'
          : "",
      });
    }
  }, [interviewData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await interviewService.updateInterviewDetails(
        interviewData._id,
        formData
      );
      toast.success("Interview updated successfully! 🎉");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update interview.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(25, 29, 36, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        padding: "1rem",
      }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-4 sm:p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Edit Interview Details
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  id="position"
                  type="text"
                  name="position"
                  value={formData.position || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                  placeholder="e.g., Tech Solutions Inc."
                />
              </div>
              
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  id="date"
                  type="datetime-local" // Use datetime-local for both date and time
                  name="date"
                  value={formData.date || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                />
              </div>

              {/* Interviewer */}
              <div>
                <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
                <input
                  id="interviewer"
                  type="text"
                  name="interviewer"
                  value={formData.interviewer || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                  placeholder="e.g., Jane Doe"
                />
              </div>

              {/* Interview Type */}
              <div>
                <label htmlFor="interviewType" className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                <input
                  id="interviewType"
                  type="text"
                  name="interviewType"
                  value={formData.interviewType || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                  placeholder="e.g., Technical, Behavioral"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                  placeholder="e.g., Remote, On-site"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                rows="3"
                className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                placeholder="Add any relevant notes here..."
              ></textarea>
            </div>

            {/* Conditional fields for completed interviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {/* Feedback */}
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback || ""}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                    placeholder="Add interview feedback..."
                  ></textarea>
                </div>

                {/* Score */}
                <div>
                  <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                  <input
                    id="score"
                    type="number"
                    name="score"
                    value={formData.score || ""}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                    placeholder="e.g., 8"
                  />
                </div>

                {/* Result */}
                <div>
                  <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">Result</label>
                  <select
                    id="result"
                    name="result"
                    value={formData.result || ""}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 text-sm"
                  >
                    <option value="">Select Result</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Passed">Passed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}