import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Scoreboard from "../components/Scoreboard";
import NameModal from "../components/NameModal";
import Congratulations from "../components/Congratulations";
import JSConfetti from "js-confetti";
import { RiResetLeftFill } from "react-icons/ri";
import backgroundImage from "../assets/img/5371964.jpg";
import title from "../assets/img/titulo.png";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [errors, setErrors] = useState(0);
  const [matches, setMatches] = useState(0);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [showModal, setShowModal] = useState(!username);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const jsConfetti = new JSConfetti();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=10"
      );
      const data = await response.json();
      const images = data.entries.map((entry) => entry.fields.image.url);
      const shuffledCards = shuffle([...images, ...images]);
      setCards(shuffledCards.map((url, index) => ({ id: index, url, flipped: false })));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index) || isChecking) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].url === cards[secondIndex].url) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setMatches(matches + 1);
      } else {
        setErrors(errors + 1);
      }
      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setShowCongrats(true);
      jsConfetti.addConfetti();
      setTimeout(() => setShowCongrats(false), 3000);
    }
  }, [matchedCards]);


  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setErrors(0);
    setMatches(0);
    setUsername("");
    localStorage.removeItem("username");
    setShowModal(true);
    fetchImages();
  };

  return (
    <>
      <div 
        className="min-h-screen w-full flex flex-col items-center p-4 bg-cover bg-fixed bg-no-repeat" 
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "100% 100%" }}>
        <div className="flex items-center justify-center">
          <img src={title} alt="title" className="w-[90%] md:w-1/4" />
        </div>
        <Scoreboard 
          errors={errors} 
          matches={matches}
          username={username}
        />
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <Card 
              key={card.id} 
              card={card} 
              onClick={() => handleCardClick(index)} 
              flipped={flippedCards.includes(index) || matchedCards.includes(index)} 
            />
          ))}
        </div>
        {showModal && <NameModal setUsername={setUsername} setShowModal={setShowModal} />}
        {showCongrats && <Congratulations username={username} />}
        <button
          className="fixed top-0 right-0 mt-4 mr-4 bg-red-500 text-white p-3 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          onClick={resetGame}
        >
          <RiResetLeftFill className="text-xl" />
        </button>
      </div>
    </>
  );
};

export default MemoryGame;
