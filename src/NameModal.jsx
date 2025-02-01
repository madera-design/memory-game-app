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
    <div className="bg-orange-600 p-6 rounded-lg shadow-lg inline-block text-center">
      <h2 className="text-yellow-300 drop-shadow-[3px_3px_0px_#a64d00] font-bold text-4xl break-words whitespace-normal mb-5">Enter your name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        placeholder="Your name"
      />
      <button 
        className="bg-[#cc7a37] py-2 rounded w-full flex items-center justify-center text-white"
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