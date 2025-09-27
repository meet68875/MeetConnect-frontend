import React from "react";
import ScheduleForm from "../../components/ScheduleForm";
import { motion } from "framer-motion";
import PageSEO from "../../components/PageSEO";

export default function Dashboard() {
  return (
    <>
             <PageSEO page="dashboard" />
    
    <motion.div
      className="max-w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ScheduleForm />
    </motion.div>
    </>
  );
}