import { useState, useEffect } from "react";
import medal from "../../assets/images/emojione_1st-place-medal.png";

const AuctionTimer = ({ endDate, highestBid }) => {
  const userData = JSON.parse(localStorage.getItem("cognito_user"));

  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);
      if (Object.keys(timeLeft).length === 0) {
        setExpired(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="auction-timer">
      {expired ? (
        <div className="timer-wrapper d-flex gap-2 justify-content-start align-items-center">
          <img
            style={{
              display: highestBid ? "block" : "none",
              width: "30px",
              height: "30px",
              borderRadius: "100%",
            }}
            src={medal}
            alt=""
          />

          <div className="text-light text-center fs-4 d-flex justify-content-center align-items-center">
            {highestBid && highestBid?.name && highestBid?.imgUrl ? (
              highestBid?.name?.S === userData?.name?.S ? (
                <p
                  style={{
                    margin: "auto",
                    padding: "auto",
                    fontSize: "18px",
                    color: "white",
                    paddingBottom: 0,
                    display: "inline-block",
                    marginTop: "10px",
                  }}
                >
                  You win!
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img
                    className="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                    src={highestBid?.imgUrl?.S}
                    alt={highestBid?.name?.S}
                  />
                  <p style={{ color: "lightgray" }}>{highestBid?.name?.S}</p>
                </div>
              )
            ) : (
              <span style={{margin:"0 auto",padding:"0 auto",fontSize:"18px",textAlign:"center"}}>No bidder available</span>
            )}
          </div>
        </div>
      ) : (
        <div className="timer-wrapper d-flex">
          <div className="timer">
            <span className="days">{timeLeft.days}</span>
            <span>Days</span>
          </div>
          <div className="timer">
            <span className="hours">{timeLeft.hours}</span>
            <span>Hours</span>
          </div>
          <div className="timer">
            <span className="minutes d-block">{timeLeft.minutes}</span>
            <span>Minutes</span>
          </div>
          <div className="timer">
            <span className="seconds d-block">{timeLeft.seconds}</span>
            <span>Seconds</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionTimer;
