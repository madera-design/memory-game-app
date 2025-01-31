const Score = ({ errors, successes }) => {
  return (
  <div className="mt- 2 text-center flex space-x-4 text-lg">
    <p className="font-bold text-red-500">Errors: {errors}</p>
    <p className="font-bold text-green-500">Successes: {successes}</p>
  </div>
  );
};
export default Score;