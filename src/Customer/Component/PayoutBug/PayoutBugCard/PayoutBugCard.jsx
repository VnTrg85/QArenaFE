import React from 'react';
import './PayoutBugCard.css';

const PayoutBugCard = ({ payout }) => {
  return (
    <div className="payout-card">
      <img src={payout.icon_link} alt={payout.name} className="payout-icon" />
      <h4>{payout.name}</h4>
      <p><strong>Tiền thưởng:</strong> {payout.amount} VNĐ</p>
    </div>
  );
};

export default PayoutBugCard;
