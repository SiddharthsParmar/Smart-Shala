import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="w-screen min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Header */}
      <header className="w-full bg-blue-700 bg-opacity-80 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">SmartShala</h1>
        <nav className="flex space-x-6">
          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
          <Link to="/signup" className="hover:text-gray-200">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg m-6">
        {/* Welcome Section */}
        <section className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Welcome to SmartShala</h2>
          <p className="text-lg text-gray-700 mt-4">
            Simplifying access to government services and resources for every citizen.
          </p>
        </section>

        {/* Carousel */}
        <div className="w-full max-w-5xl mb-10">
          <div className="carousel">
            <img
              src=""
              alt=""
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Section Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Latest News */}
          <div className="bg-sky-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-sky-800 mb-4">Latest News</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Portal maintenance scheduled for next weekend.</li>
              <li>• New initiatives launched for digital inclusion.</li>
              <li>• Government releases annual performance report.</li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-sky-800 mb-4">FAQs</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• How to create an account?</li>
              <li>• What services are available?</li>
              <li>• How to update personal information?</li>
            </ul>
          </div>

          {/* Activities & Initiatives */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-sky-800 mb-4">Activities & Initiatives</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Digital India Campaign</li>
              <li>• Swachh Bharat Mission</li>
              <li>• Smart City Projects</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-blue-700 bg-opacity-80 text-white py-4 mt-10">
        <div className="container mx-auto flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-300">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-300">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-300">
              LinkedIn
            </a>
          </div>
          <p>&copy; 2024 SmartShala. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
