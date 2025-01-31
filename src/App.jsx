import React, { useState, useEffect } from "react";
import Card from "./Card";
import Scoreboard from "./Scoreboard";
import NameModal from "./NameModal";
import Congratulations from "./Congratulations";
import JSConfetti from "js-confetti";
import { RiResetLeftFill } from "react-icons/ri";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [errors, setErrors] = useState(0);
  const [successes, setSuccesses] = useState(0);
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
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].url === cards[secondIndex].url) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setSuccesses(successes + 1);
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
    setSuccesses(0);
    setUsername("");
    fetchImages();
    localStorage.removeItem("username");
    setShowModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold">Memory Animal Game</h1>
        <Scoreboard 
          errors={errors} 
          successes={successes}
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
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
          onClick={resetGame} 
        >
          <RiResetLeftFill className="mr-3" />
          Reset Game
        </button>
      </div>
    </>
  );
};

export default MemoryGame;
