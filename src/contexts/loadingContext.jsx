import React, { createContext, useContext, useState } from "react";

// Create a Loading Context
const LoadingContext = createContext();

// Custom hook to use loading state
export const useLoading = () => {
  return useContext(LoadingContext);
};

// Provider component to wrap the app and provide loading state
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setLoading(true);
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100); 
  };

  const stopLoading = () => {
    setLoading(false);
    setProgress(0);
  };

  return (
    <LoadingContext.Provider value={{ loading, progress, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
