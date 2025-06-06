import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner ">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
              BlogBook
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Share your thoughts with the world
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} BlogBook. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
