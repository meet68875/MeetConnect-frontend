// src/components/InterviewCard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  PencilIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
  StarIcon,
  TrophyIcon,
  TagIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const InterviewCard = ({ interview, onStatusUpdate, onEdit }) => {
  const interviewDate = new Date(interview.date);
  const formattedDate = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(interviewDate);
  const formattedTime = new Intl.DateTimeFormat(undefined, { timeStyle: 'short' }).format(interviewDate);

  const statusColor = {
    Upcoming: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Canceled: "bg-red-100 text-red-800",
  }[interview.status] || "bg-gray-100 text-gray-800";

  const resultColor = {
    Hired: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  }[interview.result] || "bg-gray-100 text-gray-800";

  return (
    <motion.div
      className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between transform transition-transform hover:scale-105"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{interview.position}</h3>
          <p className="text-sm font-medium text-indigo-600 mt-1">{interview.company}</p>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {interview.status}
        </span>
      </div>

      <div className="text-gray-600 text-sm mb-3 space-y-1 flex-grow">
        <p className="flex items-center">
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          <span className="ml-2 font-medium">{formattedDate}</span>
        </p>
        <p className="flex items-center">
          <ClockIcon className="h-4 w-4 text-gray-500" />
          <span className="ml-2 font-medium">{formattedTime}</span>
        </p>
        <p className="flex items-center">
          <UserIcon className="h-4 w-4 text-gray-500" />
          <span className="ml-2 font-medium">Interviewer: {interview.interviewer || 'N/A'}</span>
        </p>
        
        {interview.interviewType && (
          <div className="flex items-center">
            <TagIcon className="h-4 w-4 text-gray-500" />
            <span className="ml-2 font-medium">Type:</span> 
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-800">{interview.interviewType}</span>
          </div>
        )}

        <p className="flex items-center">
          <MapPinIcon className="h-4 w-4 text-gray-500" />
          <span className="ml-2 font-medium">Location: {interview.location || 'N/A'}</span>
        </p>

        {interview.notes && (
          <p className="flex items-center min-h-[1.5rem]">
            <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
            <span className="ml-2 font-medium">Notes: {interview.notes}</span>
          </p>
        )}
        
        {interview.feedback && (
          <p className="flex items-center min-h-[1.5rem]">
            <ChatBubbleBottomCenterTextIcon className="h-5  w-5 text-gray-500" />
            <span className="ml-2 font-medium">Feedback: {interview.feedback}</span>
          </p>
        )}
        
        {interview.score !== null && interview.score !== undefined && (
          <p className="flex items-center min-h-[1.5rem]">
            <StarIcon className="h-4 w-4 text-gray-500" />
            <span className="ml-2 font-medium">Score: {interview.score}</span>
          </p>
        )}
        
        {interview.result && (
          <div className="flex items-center">
            <TrophyIcon className="h-4 w-4 text-gray-500" />
            <span className="ml-2 font-medium">Result:</span> 
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${resultColor}`}>
              {interview.result}
            </span>
          </div>
        )}
      </div>

      {interview.status === "Upcoming" && (
        <div className="flex space-x-2 mt-auto">
          <button
            onClick={() => onStatusUpdate(interview._id, 'Completed')}
            className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md text-sm"
          >
            Mark as Completed
          </button>
          <button
            onClick={() => onEdit(interview)}
            className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-md"
            aria-label="Edit Interview"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default InterviewCard;