import { GiAnimalSkull } from "react-icons/gi";
import backgroundImageCard from "./assets/img/cuadro.png";

const Card = ({ card, onClick, flipped }) => {
  return (
    <div
      className="card w-20 h-20 md:w-24 md:h-24 cursor-pointer perspective shadow-lg"
      onClick={onClick}
    >
      <div
        className={`card-inner w-full h-full relative transition-transform duration-500 transform-style-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div 
          className="card-front absolute w-full h-full bg-[#cc7a37] flex items-center justify-center border rounded-lg backface-hidden bg-cover"
          style={{ backgroundImage: `url(${backgroundImageCard})`}}
        >
          {/* <span className="text-white text-3xl font-bold">?</span> */}
          <GiAnimalSkull className="text-white text-3xl font-bold" />
        </div>
        <div className="card-back absolute w-full h-full bg-white flex items-center justify-center border rounded-lg backface-hidden transform rotate-y-180">
          <img src={card.url} alt="Animal" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Card;