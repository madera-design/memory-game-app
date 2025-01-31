const Card = ({ card, onClick, flipped }) => {
  return (
    <div
      className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 flex items-center justify-center cursor-pointer border"
      onClick={onClick}
    >
      {flipped && <img src={card.url} alt="Animal" className="w-full h-full object-cover" />}
    </div>
  );
  };
  export default Card;