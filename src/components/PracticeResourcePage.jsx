// src/components/PracticeResourcePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { QuestionCard } from "./QuestionCard";
import { BlogSection } from "./BlogSection";
import questionsData from "../../src/data/questions.json"; // Import the questions JSON

const topics = [
 { value: "frontend", label: "Frontend" },
 { value: "backend", label: "Backend" },
 { value: "fullstack", label: "Full Stack" },
];

const PracticeResourcePage = () => {
 const [selectedTopic, setSelectedTopic] = useState("frontend");
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const dropdownRef = useRef(null);

 const [questions, setQuestions] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [perPage] = useState(5); // Show 10 questions per page
 const [blogs, setBlogs] = useState([
  { id: 1, title: "Understanding JavaScript Closures", url: "https://medium.com/@prashantramnyc/javascript-closures-simplified-d0d23fa06ba4" },
  { id: 2, title: "Supercharging React Performance: Best Tips and Tools", url: "https://dev.to/ra1nbow1/supercharging-react-performance-best-tips-and-tools-4ff0" },
  { id: 3, title: "Node.js Event Loop Explained", url: "https://dev.to/endeavourmonk/nodejs-event-loop-46oo" },
 ]);

 const allQuestionsForTopic = questionsData[selectedTopic] || [];
 const totalQuestions = allQuestionsForTopic.length;
 const totalPages = Math.ceil(totalQuestions / perPage);

 useEffect(() => {
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  setQuestions(allQuestionsForTopic.slice(startIndex, endIndex));
 }, [selectedTopic, currentPage, allQuestionsForTopic]);

 useEffect(() => {
  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setIsDropdownOpen(false);
   }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [dropdownRef]);

 // Handle Topic Change
 const handleTopicSelect = (topicValue) => {
  setSelectedTopic(topicValue);
  setCurrentPage(1); // Reset to page 1
  setIsDropdownOpen(false); // Close dropdown
 };

 // Pagination Handlers
 const handleNextPage = () => {
  setCurrentPage((prev) => prev + 1);
 };

 const handlePreviousPage = () => {
  setCurrentPage((prev) => Math.max(prev - 1, 1));
 };

 const selectedTopicLabel = topics.find(t => t.value === selectedTopic)?.label;

 return (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
   <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
    {/* Left Section: Questions */}
    <div className="w-full md:w-2/3">
     {/* Custom Dropdown */}
     <div className="bg-white p-6 rounded-2xl shadow-lg mb-8" ref={dropdownRef}>
      <label className="font-semibold text-xl text-gray-800">Select Topic:</label>
      <div className="relative mt-2">
       <button
        type="button"
        className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-between hover:bg-gray-200 transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
       >
        <span className="font-medium text-gray-700">{selectedTopicLabel}</span>
        <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
       </button>
       {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200 animate-fade-in-down">
         <ul className="py-1">
          {topics.map((topic) => (
           <li
            key={topic.value}
            className="py-2 px-4 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => handleTopicSelect(topic.value)}
           >
            {topic.label}
           </li>
          ))}
         </ul>
        </div>
       )}
      </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {questions.length > 0 ? (
       questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
       ))
      ) : (
       <p className="text-gray-500 col-span-full text-center">No questions available for this topic.</p>
      )}
     </div>

     {/* Pagination */}
     <div className="flex justify-between items-center mt-8">
      <button
       onClick={handlePreviousPage}
       className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
       disabled={currentPage === 1}
      >
       Previous
      </button>
      <span className="text-sm text-gray-600">
       Page {currentPage} of {totalPages}
      </span>
      <button
       onClick={handleNextPage}
       className="py-2 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
       disabled={currentPage >= totalPages}
      >
       Next
      </button>
     </div>
    </div>

    {/* Right Section: Blog Section */}
    <div className="w-full md:w-1/3">
     <BlogSection blogs={blogs} />
    </div>
   </div>
  </div>
 );
};

export default PracticeResourcePage;