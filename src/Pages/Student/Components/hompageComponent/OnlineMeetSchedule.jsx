import React, { useState } from "react";

const OnlineMeetSchedule = () => {
  // State to track selected tab
  const [activeTab, setActiveTab] = useState("ongoing");

  // Sample data for meetings
  const meetings = {
    ongoing: [
      { id: 1, subject: "Mathematics", date: "18th Nov 2024", time: "10:00 AM", link: "#" },
      { id: 2, subject: "Science", date: "18th Nov 2024", time: "12:00 PM", link: "#" },
    ],
    upcoming: [
      { id: 3, subject: "English", date: "19th Nov 2024", time: "9:00 AM", link: "#" },
      { id: 4, subject: "History", date: "19th Nov 2024", time: "11:00 AM", link: "#" },
    ],
    last: [
      { id: 5, subject: "Physics", date: "17th Nov 2024", time: "2:00 PM", link: "#" },
      { id: 6, subject: "Chemistry", date: "17th Nov 2024", time: "3:30 PM", link: "#" },
    ],
  };

  return (
    <div className=" rounded-lg  p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Online Meet Schedule</h1>

      {/* Navigation Tabs */}
      <nav className="flex border-b mb-4">
        <div
          onClick={() => setActiveTab("ongoing")}
          className={`cursor-pointer px-4 py-2 text-lg ${
            activeTab === "ongoing"
              ? "text-sky-800 border-b-2 border-sky-800"
              : "text-gray-600 "}`}
        >
          Ongoing
        </div>
        <div
          onClick={() => setActiveTab("upcoming")}
          className={`cursor-pointer px-4 py-2 text-lg ${
            activeTab === "upcoming"
              ? "text-sky-800 border-b-2 border-sky-800"
              : "text-gray-600"
          }`}
        >
          Upcoming
        </div>
        <div
          onClick={() => setActiveTab("last")}
          className={`cursor-pointer px-4 py-2 text-lg ${
            activeTab === "last"
              ? "text-sky-800 border-b-2 border-sky-800"
              : "text-gray-600"
          }`}
        >
          Last Meeting
        </div>
      </nav>

      {/* Meetings List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {meetings[activeTab].map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{meeting.subject}</h2>
              <p className="text-gray-600 text-red-400">{meeting.date}</p>
              <p className="text-gray-600 text-red-400">{meeting.time}</p>
            </div>
            <button
              onClick={() => window.open(meeting.link, "_blank")}
              className="mt-4 bg-sky-800 text-white px-4 py-2 rounded-md hover:bg-sky-800"
            >
              Open Meeting
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineMeetSchedule;
