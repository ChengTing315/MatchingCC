import React, { useState, useEffect } from "react";

const cities = [
  { city: "Tokyo", capital: "Japan" },
  { city: "Moscow", capital: "Russia" },
  { city: "Bangkok", capital: "Thailand" },
  { city: "Sydney", capital: "Australia" },
  { city: "Lima", capital: "Peru" },
  { city: "Hanoi", capital: "Vietnam" },
  { city: "Cairo", capital: "Egypt" },
];

const cityNames = cities.map((a) => a.city);
const capitals = cities.map((b) => b.capital);
const concatenatedArray = cityNames
  .concat(capitals)
  .sort(() => Math.random() - 0.5);

const Example = () => {
  const [remainingCity, setRemainingCity] = useState(concatenatedArray);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [match, setMatch] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (selectedItem1 && selectedItem2) {
      setIsLocked(true);
      const found = cities.find(
        (item) =>
          (item.city === selectedItem1 && item.capital === selectedItem2) ||
          (item.city === selectedItem2 && item.capital === selectedItem1)
      );
      if (found) {
        setMatch(true);
        setRemainingCity(
          remainingCity.filter(
            (item) => !(item === selectedItem1) && !(item === selectedItem2)
          )
        );
      } else {
        setMatch(false);
      }

      setTimeout(() => {
        setSelectedItem1(null);
        setSelectedItem2(null);
        setIsLocked(false);
      }, 1000);
    }
  }, [selectedItem1 && selectedItem2]);

  const handleFirstSelection = (item) => {
    setSelectedItem1(item);
  };

  const handleSecondSelection = (item) => {
    setSelectedItem2(item);
  };

  return (
    <div>
      <h2>
        Welcome to the Maching game!Please match the city with its capital
      </h2>
      <div>
        <div
          style={{
            flex: 2,
            //flexDirection: "row",
            //justifyContent: "space-around",
          }}
        >
          {remainingCity.map((item) => (
            <button
              key={item}
              onClick={() =>
                !selectedItem1
                  ? handleFirstSelection(item)
                  : handleSecondSelection(item)
              }
              style={{
                padding: 20,
                // margin: "10px 0",
                marginLeft: 20,
                marginTop: 20,
                //justifyContent: "space-around",
                pointerEvents: isLocked,
                backgroundColor:
                  (selectedItem1 === item && selectedItem2 && !match) ||
                  (selectedItem2 === item && selectedItem1 && !match)
                    ? "red"
                    : selectedItem1 === item || selectedItem2 === item
                    ? "blue"
                    : "white",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {remainingCity.length === 0 && match && <p>Finish!</p>}
      {match && <p>Correct match!</p>}
      {selectedItem1 && selectedItem2 && !match && (
        <p style={{ color: "red" }}>Incorrect match, try again.</p>
      )}
    </div>
  );
};

export default Example;
