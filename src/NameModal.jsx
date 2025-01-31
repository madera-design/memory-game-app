import React, { useState} from "react";
import { IoGameControllerOutline } from "react-icons/io5";

const NameModal = ({ setUsername, setShowModal }) => {
  const [name, setName] = useState("");
  
  const handleSave = () => {
    if (name.trim()) {
      setUsername(name);
      localStorage.setItem("username", name);
      setShowModal(false);
    }
  };

  return (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-lg font-bold mb-4 text-center">Enter your name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        placeholder="Your name"
      />
      <button 
        className="bg-blue-500 text-white py-2 rounded w-full flex items-center justify-center"
        onClick={handleSave} 
      >
        Let's play
        <IoGameControllerOutline className="ml-3" />
      </button>
    </div>
  </div>
);
};
export default NameModal;