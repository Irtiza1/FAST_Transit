import React, { useEffect, useState } from 'react';
import { FaBullhorn, FaBus, FaChartBar, FaClipboardList } from 'react-icons/fa';

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500); // Delay to load cards
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      id: 1,
      icon: <FaBullhorn className="text-6xl text-gray-500" />,
      title: 'Make an Announcement',
      description: 'Reach out to your audience with ease.',
    },
    {
      id: 2,
      icon: <FaBus className="text-6xl text-gray-500" />,
      title: 'Register a Bus',
      description: 'Add new buses to your fleet.',
    },
    {
      id: 3,
      icon: <FaChartBar className="text-6xl text-gray-500" />,
      title: 'View Stats',
      description: 'Get insights on performance.',
    },
    {
      id: 4,
      icon: <FaClipboardList className="text-6xl text-gray-500" />,
      title: 'View Registrations',
      description: 'Manage bus registrations easily.',
    },
  ];

  return (
    <div className="min-h-screen bg p-6 flex flex-col items-center relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-indigo-100 opacity-25 pointer-events-none"></div>

      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 z-10">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl z-10">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`transform transition-transform duration-500 ease-in-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } delay-${index * 200}`}
            style={{ transitionDelay: `${index * 200}ms` }} // Smooth staggered animation
          >
            <div className="bg-gray-300 rounded-xl border border-black  p-10 w-72 h-72 flex flex-col items-center justify-center hover:bg-gray-50 hover:-translate-y-4 transition-transform">
              {feature.icon}
              <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-center">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
