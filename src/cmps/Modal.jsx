import React from 'react';

export const Modal = ({ children, signup }) => {
  return (
    <div
      className={
        signup
          ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-28 px-16 rounded-xl'
          : 'fixed top 0 right-0 left-0 z-10 justify-center items-center flex max-w-full max-h-full bg-black bg-opacity-70'
      }>
      {children}
    </div>
  );
};
