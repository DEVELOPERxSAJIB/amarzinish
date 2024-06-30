import { useState, useEffect } from "react";
import { useGetSingleProductQuery } from "../../app/ProductApi";
import { useGetSingleBidByProductIdQuery } from "../../app/BidApi";
import medal from "../../assets/images/emojione_1st-place-medal.png";

// eslint-disable-next-line react/prop-types
const AuctionDetails = ({ id }) => {
  const userData = JSON.parse(localStorage.getItem("cognito_user"));
  const { data } = useGetSingleProductQuery(id);
  const { data: bidders } = useGetSingleBidByProductIdQuery(id);
  const [highestBidder, setHighestBidder] = useState(null);

  const calculateTimeLeft = () => {
    const difference = new Date(data?.date.S) - new Date();
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
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      if (Object.keys(timeLeft).length === 0) {
        setExpired(true);
        clearInterval(timer); // Stop the timer when time is up
      } else {
        setTimeLeft(timeLeft);
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup function to clear interval
  }, [data, calculateTimeLeft]);

  useEffect(() => {
    if (bidders && bidders.length > 0) {
      const highestBid = Math.max(
        ...bidders.map((item) => parseFloat(item.price.N))
      );
      setHighestBidder(
        bidders.find((item) => parseFloat(item.price.N) === highestBid)
      );
    }
  }, [bidders]);
  return (
    <div className="auction-timer">
      {expired ? (
        <div className="timer-wrapper d-flex gap-2 justify-content-start align-items-center w-100 h-100">
          <img
            style={{
              display: highestBidder ? "block" : "none",
              width: "30px",
              height: "30px",
              borderRadius: "100%",
            }}
            src={medal}
            alt=""
          />

          <div className="text-light fs-4 d-flex justify-content-center align-items-center w-100 h-100">
            {highestBidder && highestBidder?.name && highestBidder?.imgUrl ? (
              highestBidder?.name?.S === userData?.name?.S ? (
                <span
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
                </span>
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
                    src={highestBidder?.imgUrl?.S}
                    alt={highestBidder?.name?.S}
                  />
                  <p style={{ color: "lightgray", fontSize : "16px", margin : 0 }}>{highestBidder?.name?.S}</p>
                </div>
              )
            ) : (
              <span
                style={{
                  display: "inline-block",
                  textAlign: "center",
                  fontSize: "18px",
                  margin: "0 auto",
                }}
              >
                No bider available
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="timer-wrapper d-flex w-100 h-100 align-items-center justify-content-evenly">
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

export default AuctionDetails;
