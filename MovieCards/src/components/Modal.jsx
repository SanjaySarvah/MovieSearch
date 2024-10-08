import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-auto">
      <div className="relative w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
      
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        
        <div className="flex flex-col items-center space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
