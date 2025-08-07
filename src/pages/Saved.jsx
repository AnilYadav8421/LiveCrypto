import React from 'react';

const Saved = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center mt-20 mb-24 px-4">
      <div className="text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          No Saved Coins Yet
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          You haven’t saved any coins. Go explore and bookmark your favorites!
        </p>
      </div>
    </section>
  );
};

export default Saved;
