// src/components/Layout.jsx

import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GlobalLoading from "./ui/GlobalLoading";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <GlobalLoading /> 
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}