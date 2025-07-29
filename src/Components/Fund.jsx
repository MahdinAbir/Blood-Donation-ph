import React from 'react';

const Fund = () => {
  return (
    <div className="min-h-screen bg-[#FFDCDC] p-6">
      <h1 className="text-3xl font-bold text-[#AF3E3E] mb-6">💰 Fundraising</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-800 text-lg">
          Every drop of blood counts, but so does every bit of support. Our organization runs on generosity—
          not only from blood donors but also from financial contributors.
        </p>

        <div className="mt-6 bg-[#FFF2EB] p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-[#CD5656]">How Your Funds Help</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
            <li>Organizing blood donation camps</li>
            <li>Providing transport to urgent donors</li>
            <li>Maintaining our app and outreach</li>
            <li>Helping families with critical blood needs</li>
          </ul>
        </div>

        <div className="mt-8 text-center text-sm italic text-[#901E3E]">
          Together, we can save more lives. Thank you for your support! ❤️
        </div>
      </div>
    </div>
  );
};

export default Fund;
