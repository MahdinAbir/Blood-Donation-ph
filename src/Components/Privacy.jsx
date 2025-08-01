import React, { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#FFE8CD] min-h-screen px-6 py-12 text-[#2f2f2f]">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl border-l-8 border-[#AF3E3E] p-10">
        <h1 className="text-4xl font-bold text-[#AF3E3E] mb-8 text-center">
          Privacy Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">1. Overview</h2>
          <p>
            <strong>BloodConnect</strong> values your privacy and is committed to
            protecting the personal information you share with us. This policy outlines
            what we collect, how we use it, and your rights.
          </p>
        </section>

        <section className="mb-6 bg-[#FFDCDC]/50 p-5 rounded">
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">
            2. What We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full name, email address, and profile photo</li>
            <li>Blood group, location (district & upazila), and donation history</li>
            <li>Optional health information (e.g., eligibility notes)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">
            3. How We Use Your Data
          </h2>
          <p>
            Your data helps us match donors and recipients, improve the platform’s
            experience, and maintain safety. We do <strong>not</strong> sell or
            share your data with third parties without your consent.
          </p>
        </section>

        <section className="mb-6 bg-[#FFDCDC]/50 p-5 rounded">
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">
            4. Your Rights & Control
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You can update or delete your profile information at any time.</li>
            <li>You may request a copy of your stored data via email.</li>
            <li>You can disable notifications and control visibility settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">5. Policy Changes</h2>
          <p>
            Any future updates to this Privacy Policy will be communicated on our
            platform. Continued use implies your acceptance of the revised terms.
          </p>
        </section>

        <footer className="mt-10 text-center text-sm text-[#AF3E3E]">
          Last updated: August 1, 2025
        </footer>
      </div>
    </div>
  );
};

export default Privacy;
