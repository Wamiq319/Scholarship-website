import React from 'react';

const Process = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Application Process</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold">1</div>
            <p>Register and create your profile.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold">2</div>
            <p>Search for scholarships.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold">3</div>
            <p>Apply and submit your documents.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
