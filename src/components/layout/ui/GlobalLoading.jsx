// src/components/ui/GlobalLoading.jsx

import React from "react";
import { useLoading } from "../../../contexts/loadingContext";

const GlobalLoading = () => {
  const { loading, progress } = useLoading();

  // If loading is false, the component is not rendered
  if (!loading) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 z-50 transition-transform duration-300 ease-in-out"
      style={{ transform: `scaleX(${progress / 100})`, transformOrigin: "left" }}
    >
      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg" />
    </div>
  );
};

export default GlobalLoading;