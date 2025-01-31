const Scoreboard = ({ errors, successes, username}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-5 mb-5 text-center">
       <h2 className="text-xl font-bold mb-4">Player: {username}</h2>
      <div className="mb-3 text-center flex space-x-4 text-lg">
        <div className="text-center">
          <p className="text-md text-gray-600">Errors: </p>
          <p className="text-2xl font-bold text-red-600">{errors}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Matches: </p>
          <p className="text-2xl font-bold text-green-600">{successes}</p>
        </div>
      </div>
    </div>
  );
};
export default Scoreboard;