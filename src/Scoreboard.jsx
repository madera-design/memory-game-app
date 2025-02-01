const Scoreboard = ({ errors, matches, username}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-2 flex text-center">
       <h2 className="text-md text-gray-600">Player: <span className="text-xl text-black font-bold mr-4">{username}</span></h2>
      <div className="text-center flex space-x-4">
        <h2 className="text-md text-gray-600">Errors: <span className="text-xl font-bold text-red-600">{errors}</span></h2>
        <h2 className="text-md text-gray-600">Matches: <span className="text-xl font-bold text-green-600">{matches}</span></h2>
      </div>
    </div>
  );
};
export default Scoreboard;