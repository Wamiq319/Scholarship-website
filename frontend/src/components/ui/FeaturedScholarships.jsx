import React from 'react';

const FeaturedScholarships = () => {
  const scholarships = [
    { id: 1, title: 'Merit Scholarship', description: 'For students with excellent academic records.' },
    { id: 2, title: 'Need-Based Scholarship', description: 'For students with financial need.' },
    { id: 3, title: 'Athletic Scholarship', description: 'For students with exceptional athletic abilities.' },
  ];

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Scholarships</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">{scholarship.title}</h3>
            <p>{scholarship.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedScholarships;
