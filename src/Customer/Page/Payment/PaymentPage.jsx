import React, { useState } from 'react';
import './PaymentPage.css';

const Payment = () => {
    const paymentDataList = [
        { id: 1, paymentMethod: "Credit Card", amount: 150.00, payment_date: "2025-05-01", status: "Completed", user: "John Doe", testProject: "Test Project A" },
        { id: 2, paymentMethod: "Bank Transfer", amount: 200.00, payment_date: "2025-05-02", status: "Processing", user: "Jane Smith", testProject: "Test Project B" },
        { id: 3, paymentMethod: "PayPal", amount: 100.00, payment_date: "2025-05-03", status: "Pending", user: "Alice Brown", testProject: "Test Project C" },
        { id: 4, paymentMethod: "Credit Card", amount: 300.00, payment_date: "2025-05-04", status: "Completed", user: "Bob White", testProject: "Test Project D" },
        { id: 5, paymentMethod: "Bank Transfer", amount: 500.00, payment_date: "2025-05-05", status: "Processing", user: "Charlie Green", testProject: "Test Project E" },
        { id: 6, paymentMethod: "PayPal", amount: 250.00, payment_date: "2025-05-06", status: "Pending", user: "David Black", testProject: "Test Project F" },
        { id: 7, paymentMethod: "Cash", amount: 400.00, payment_date: "2025-05-07", status: "Completed", user: "Emily Clark", testProject: "Test Project G" },
        { id: 8, paymentMethod: "PayPal", amount: 350.00, payment_date: "2025-05-08", status: "Pending", user: "Frank Harris", testProject: "Test Project H" }
    ];

    const [selectedTab, setSelectedTab] = useState("Completed");
    const [showQR, setShowQR] = useState(false);
    const [paymentToPay, setPaymentToPay] = useState(null);

    const filteredPayments = paymentDataList.filter(payment => payment.status === selectedTab);

    const handlePayClick = (payment) => {
        setPaymentToPay(payment);
        setShowQR(true);
    };

    const handleCloseQR = () => {
        setShowQR(false);
        setPaymentToPay(null);
    };

    return (
        <div className="payment-container">
            <div className="tabs">
                <button 
                    className={selectedTab === "Completed" ? "active" : ""}
                    onClick={() => setSelectedTab("Completed")}
                >
                    Hoàn Thành
                </button>
                <button 
                    className={selectedTab === "Processing" ? "active" : ""}
                    onClick={() => setSelectedTab("Processing")}
                >
                    Đang Xử Lý
                </button>
                <button 
                    className={selectedTab === "Pending" ? "active" : ""}
                    onClick={() => setSelectedTab("Pending")}
                >
                    Chưa Thanh Toán
                </button>
            </div>

            <div className="payment-list">
                {filteredPayments.map(payment => (
                    <div key={payment.id} className="payment-card">
                        <div><strong>Payment Method:</strong> {payment.paymentMethod}</div>
                        <div><strong>Amount:</strong> ${payment.amount.toFixed(2)}</div>
                        <div><strong>Payment Date:</strong> {payment.payment_date}</div>
                        <div><strong>Status:</strong> {payment.status}</div>
                        <div><strong>Test Project:</strong> {payment.testProject}</div>
                        
                        {payment.status === "Pending" && (
                            <button className="pay-button" onClick={() => handlePayClick(payment)}>Thanh Toán</button>
                        )}
                    </div>
                ))}
            </div>

            {showQR && (
                <div className="qr-popup">
                    <div className="qr-popup-content">
                        <h3>Thanh Toán QR</h3>
                        <p>Quét mã QR để thanh toán</p>
                        <div className="qr-code">
                            <img src="" alt="QR Code" />
                        </div>
                        <button onClick={handleCloseQR}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
