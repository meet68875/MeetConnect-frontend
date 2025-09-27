// src/components/QuestionCard.jsx
import React from "react";

export const QuestionCard = ({ question }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-900">{question.question}</h3>
      <p className="mt-2 text-gray-600">{question.answer}</p>
    </div>
  );
};