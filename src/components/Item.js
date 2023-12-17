import React, { useState, useEffect } from "react";
import { formatTime, formatMoney } from "../utils/formatString";

const itemStatus = (item) => {
  const bids = Object.keys(item.bids ?? {}).length;
  const amount = bids ? item.bids[bids].amount : item.startingPrice ?? 0;
  return { bids, amount };
};

const Item = ({ item, openInfoModal, openBidModal }) => {
  const [bids, setBids] = useState(0);
  const [amount, setAmount] = useState(item.startingPrice);
  const [timeLeft, setTimeLeft] = useState("");
  const [biddingComplete, setBiddingComplete] = useState(false);

  useEffect(() => {
    const status = itemStatus(item);
    setBids(status.bids);
    setAmount(formatMoney(item.currency, status.amount));
  }, [item]);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remaining = item.endTime - now;

      if (remaining > 0) {
        setTimeLeft(formatTime(remaining));
        requestAnimationFrame(updateTimer);
      } else {
        setTimeLeft("Item Ended");
        setBiddingComplete(true);
      }
    };

    requestAnimationFrame(updateTimer);
  }, [item.endTime]);

  return (
    <div className="col">
      <div className="card">
        <img
          src={item.primaryImage}
          className="card-img-top"
          alt={item.title}
        />
        <div className="card-body">
          <h5 className="title">{item.title}</h5>
          <p className="card-subtitle">{item.detail}</p>

          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Current bid:</th>
                <td className="current-bid">
                  {amount} [{bids} bids]
                </td>
              </tr>
              <tr>
                <th scope="row">Time left:</th>
                <td className="time-left">{timeLeft}</td>
              </tr>
            </tbody>
          </table>

          <div className="btn-group">
            <button
              onClick={openInfoModal}
              type="button"
              className="btn btn-secondary"
            >
              Info
            </button>
            <button
              disabled={biddingComplete}
              onClick={openBidModal}
              type="button"
              className="btn btn-primary"
            >
              Submit bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Item, itemStatus };