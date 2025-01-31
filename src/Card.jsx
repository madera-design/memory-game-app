const Card = ({ card, onClick, flipped }) => {
  return (
    <div
      className="w-20 h-20 md:w-24 md:h-24 bg-blue-400 flex items-center justify-center cursor-pointer border rounded"
      onClick={onClick}
    >
      {flipped && <img src={card.url} alt="Animal" className="w-full h-full object-cover rounded" />}
    </div>
  );
  };
  export default Card;