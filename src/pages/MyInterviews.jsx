// src/pages/MyInterviews.js
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useLoading } from "../contexts/loadingContext";
import { interviewService } from "../services/interviewService";
import InterviewCard from "../components/InterviewCard";
import { motion } from "framer-motion";
import PageSEO from "../components/PageSEO";
import EditInterviewModal from "../components/EditInterviewModal";

export default function MyInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { startLoading, stopLoading } = useLoading();

  // ✨ STATE FOR MODAL MANAGEMENT ✨
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const fetchInterviews = async () => {
    setError(null);
    startLoading();
    try {
      const { interviews, totalPages } = await interviewService.getUserInterviews(statusFilter, currentPage);
      setInterviews(interviews);
      setTotalPages(totalPages);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to load interviews. Please try again.";
      setError(errorMessage);
      setInterviews([]);
      setTotalPages(1);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [statusFilter, currentPage]);

  const handleStatusUpdate = async (interviewId) => {
    setError(null);
    startLoading();
    try {
      await interviewService.updateInterviewStatus(interviewId, { status: "Completed" });
      fetchInterviews(); // Re-fetch interviews to show updated data
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update interview status.";
      setError(errorMessage);
    } finally {
      stopLoading();
    }
  };

  const handleOpenModal = (interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleUpdateComplete = () => {
    fetchInterviews(); // This function ensures the list is refreshed after an update
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="py-8 px-6 flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md" role="alert">
          <p className="font-bold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageSEO page="myInterviews" />

      <div className="pt-8 pb-12 px-6">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => handleFilterChange("Upcoming")}
              className={`py-2 px-4 text-sm font-medium rounded-l-lg border transition-colors duration-200 ease-in-out
              ${statusFilter === "Upcoming" ? "bg-gray-200 text-gray-800" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => handleFilterChange("Completed")}
              className={`py-2 px-4 text-sm font-medium rounded-r-lg border transition-colors duration-200 ease-in-out
              ${statusFilter === "Completed" ? "bg-gray-200 text-gray-800" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
            >
              Completed
            </button>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {interviews.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-16">
              <svg className="w-16 h-16 mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v2a1 1 0 11-2 0V9zm2 6a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd"></path>
              </svg>
              <p className="text-xl font-semibold">
                No {statusFilter.toLowerCase()} interviews available.
              </p>
              <p className="mt-2 text-sm text-center">
                Looks like you don't have any interviews scheduled for this category.
              </p>
            </div>
          ) : (
            interviews.map((interview) => (
              <InterviewCard
                key={interview._id}
                interview={interview}
                onStatusUpdate={handleStatusUpdate}
                onEdit={handleOpenModal} // Pass the handler to the InterviewCard
              />
            ))
          )}
        </motion.div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

     <EditInterviewModal
      isOpen={isModalOpen} // The modal is only rendered when this prop is true
      onClose={handleCloseModal}
      interviewData={selectedInterview}
      onUpdate={handleUpdateComplete}
    />
    </>
  );
}