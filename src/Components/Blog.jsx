import React from 'react';

const Blog = () => {
  return (
    <div className="min-h-screen bg-[#EAEBD0] p-6">
      <h1 className="text-3xl font-bold text-[#AF3E3E] mb-6">📝 Blog</h1>
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-[#CD5656]">Why Blood Donation Matters</h2>
          <p className="text-gray-700 mt-2">
            Donating blood saves lives. It's a small act that creates a big impact—helping accident victims,
            surgical patients, and those with chronic illnesses.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#CD5656]">Who Can Donate?</h2>
          <p className="text-gray-700 mt-2">
            Healthy individuals aged 18–60 with a minimum weight of 50 kg can donate. Make sure you're well rested and hydrated!
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#CD5656]">How Often Can You Donate?</h2>
          <p className="text-gray-700 mt-2">
            Every 3 months for men and 4 months for women. Give your body time to recover and regenerate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
