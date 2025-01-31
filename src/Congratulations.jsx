const Congratulations = ({ username}) => {
  return (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1>Congratulations {username}! You won!</h1>
    </div>
  </div>
);
};
export default Congratulations;