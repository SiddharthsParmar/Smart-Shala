// EvaluationGSA.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EvaluationGSA = (params) => {
  const [selectedTab, setSelectedTab] = useState('grammar mistakes');
  const [grammerMistakes, setGrammerMistakes] = useState('');
  const [spellingMistakes, setSpellingMistakes] = useState('');
  const [answerCorrectness, setAnswerCorrectness] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
      try{
        const res = await axios.post(`http://localhost:3000/homework/analysis`, {url : params.url});
        console.log(res.data);
        setGrammerMistakes(res.data.answer[0].grammer);
        setSpellingMistakes(res.data.answer[0].spelling);
        setAnswerCorrectness(res.data.answer[0].correct);
        setLoading(false);
      } catch(err) {
        console.log(err);
      }
      
    }
    fetchAnalysis();
    
  });

  if(loading) {
    return <div className="text-center mt-8">Generating Report ...</div>;
  }

  return (
    <>
      <div className="p-4 rounded-lg border-b-2 flex gap-4 m-5">
        <button
          onClick={() => setSelectedTab('grammar mistakes')}
          className={`cursor-pointer px-4 py-2 text-lg ${
            selectedTab === 'grammar mistakes'
              ? 'text-blue-600 border-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Grammar Mistakes
        </button>
        <button
          onClick={() => setSelectedTab('spelling mistakes')}
          className={`cursor-pointer px-4 py-2 text-lg ${
            selectedTab === 'spelling mistakes'
              ? 'text-blue-600 border-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Spelling Mistakes
        </button>
        <button
          onClick={() => setSelectedTab('answer evaluation')}
          className={`cursor-pointer px-4 py-2 text-lg ${
            selectedTab === 'answer evaluation'
              ? 'text-blue-600 border-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Answer Evaluation
        </button>
      </div>

      {/* Display content based on the selectedTab */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        {selectedTab === 'grammar mistakes' && (
          <p className="text-gray-700 text-lg">
            {grammerMistakes}
          </p>
        )}
        {selectedTab === 'spelling mistakes' && (
          <p className="text-gray-700 text-lg">
            {spellingMistakes}
          </p>
        )}
        {selectedTab === 'answer evaluation' && (
          <p className="text-gray-700 text-lg">
            {answerCorrectness}
          </p>
        )}
      </div>
    </>
  );
};

export default EvaluationGSA;
