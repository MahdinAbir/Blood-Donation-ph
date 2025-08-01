import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#FFE8CD] min-h-screen px-6 py-12 text-[#2f2f2f]">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl border-l-8 border-[#AF3E3E] p-10">
        <h1 className="text-4xl font-bold text-[#AF3E3E] mb-8 text-center">
          Terms & Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">1. Agreement to Terms</h2>
          <p>
            By accessing and using <strong>BloodConnect</strong>, you agree to abide by our Terms & Conditions. 
            This platform is intended for ethical, non-commercial blood donation coordination.
          </p>
        </section>

        <section className="mb-6 bg-[#FFDCDC]/50 p-5 rounded">
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">2. Donor & Recipient Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ensure accurate and honest information in your profile.</li>
            <li>Respond to requests promptly and respectfully.</li>
            <li>Never charge money or seek profit for blood donations.</li>
            <li>Follow medical guidelines and eligibility criteria before donating.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">3. Health & Safety Disclaimer</h2>
          <p>
            We are not liable for any health risks or outcomes related to blood donations.
            Users must verify medical compatibility and consult licensed healthcare professionals as needed.
          </p>
        </section>

        <section className="mb-6 bg-[#FFDCDC]/50 p-5 rounded">
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">4. Account Suspension</h2>
          <p>
            We reserve the right to suspend or ban accounts involved in misinformation, abusive behavior, 
            or violation of these terms without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#CD5656] mb-2">5. Policy Updates</h2>
          <p>
            Terms may be updated periodically. Continued use of BloodConnect signifies 
            acceptance of the most current version.
          </p>
        </section>

        <footer className="mt-10 text-center text-sm text-[#AF3E3E]">
          Last updated: August 1, 2025
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;
