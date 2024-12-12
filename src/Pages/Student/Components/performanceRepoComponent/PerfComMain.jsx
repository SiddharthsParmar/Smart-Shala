import React from 'react';

const PerfComMain = ({ activeTab, setActiveTab }) => {
  return (
    <div className="p-4 flex gap-4 border-b-2">
      {/* <button
        onClick={() => setActiveTab('overall performance')}
        className={`cursor-pointer px-4 py-2 text-lg ${
          activeTab === 'overall performance'
            ? 'text-sky-800 border-b-2 border-sky-800'
            : 'text-gray-600'
        }`}
      >
        Overall Performance
      </button> */}
      <button
        onClick={() => setActiveTab('evaluate test')}
        className={`cursor-pointer px-4 py-2 text-lg ${
          activeTab === 'evaluate test'
            ? 'text-sky-800 border-b-2 border-sky-800 font-bold text-2xl'
            : 'text-gray-600'
        }`}
      >
        Evaluate 
      </button>
      {/* <button
        onClick={() => setActiveTab('test results')}
        className={`cursor-pointer px-4 py-2 text-lg ${
          activeTab === 'test results'
            ? 'text-sky-800 border-b-2 border-sky-800'
            : 'text-gray-600'
        }`}
      >
        Test Result
      </button> */}
    </div>
  );
};

export default PerfComMain;
