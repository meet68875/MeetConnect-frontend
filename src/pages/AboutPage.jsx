import React from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  UsersIcon,
  LightBulbIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import PageSEO from "../components/PageSEO";

// Team member data
const teamMembers = [
  {
    name: "Jane Doe",
    role: "Co-Founder & CEO",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Jane is a visionary leader with over 15 years of experience in the tech industry. She founded the company with a passion for simplifying career management.",
  },
  {
    name: "John Smith",
    role: "Co-Founder & CTO",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "John is a technology expert, driving the development of our innovative platform. His expertise in software architecture is the backbone of our product.",
  },
];

const investors = [
  {
    name: "Venture Capital A",
    logo: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Angel Investor B",
    logo: "https://img.freepik.com/free-photo/portrait-happy-handsome-adult-man-smiles-gladfully-looks-directly-camera-giggles-positively-has-hairstyle-wears-round-spectacles-casual-jumper-isolated-beige-background-emotions-concept_273609-56709.jpg",
  },
  {
    name: "Growth Partners C",
    logo: "https://static.vecteezy.com/system/resources/thumbnails/028/766/088/small/businessman-investor-sitting-in-modern-office-business-vision-and-investment-concept-generative-ai-photo.jpg",
  },
];

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
                 <PageSEO page="about" />
    
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-8">
      <motion.div
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <SparklesIcon className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            About Our Company
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We are dedicated to revolutionizing the way job seekers manage their careers and interview processes. Our mission is to provide powerful, intuitive tools that empower you to succeed.
          </p>
        </motion.div>

        {/* Our Team Section */}
        <motion.div
          className="mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center mb-6">
            <UsersIcon className="h-10 w-10 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Our Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl"
                variants={itemVariants}
              >
                <img
                  className="h-32 w-32 rounded-full object-cover mb-4 ring-4 ring-indigo-300"
                  src={member.image}
                  alt={member.name}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Vision Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center mb-6">
            <LightBulbIcon className="h-10 w-10 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Our Vision
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To create a world where every job seeker feels confident and prepared, equipped with the right tools to navigate their career path with ease. We believe that a streamlined process leads to better opportunities.
          </p>
        </motion.div>

        {/* Our Investors Section */}
        <motion.div
          className="mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center mb-6">
            <ChartBarIcon className="h-10 w-10 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Our Investors
            </h2>
          </div>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            We are proud to be backed by a group of forward-thinking investors who share our vision and commitment to innovation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {investors.map((investor, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl"
                variants={itemVariants}
              >
                <img
                  className="h-24 w-auto object-contain mb-4"
                  src={investor.logo}
                  alt={investor.name}
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {investor.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}