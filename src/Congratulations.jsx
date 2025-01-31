const Congratulations = ({ username }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-orange-600 p-6 rounded-lg shadow-lg inline-block text-center">
          <h1 className="text-yellow-300 drop-shadow-[3px_3px_0px_#a64d00] font-bold text-5xl break-words whitespace-normal">
            Congratulations {username}! You won!
          </h1>
        </div>
      </div>
    );
  };
  
  export default Congratulations;