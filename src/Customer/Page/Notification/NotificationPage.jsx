import React, { useState } from 'react';
import './NotificationPage.css';
import { useNavigate } from 'react-router-dom';

const mockNotifications = [
  {
    id: 1,
    type: 'NEW_PROJECT',
    content: 'You have been assigned a new project: "Landing Page Redesign".',
    link_url: '/Q3VzdG9tZXI=/project/1',
    isRead: false,
    sender: { id: 100, fullName: 'Admin QArena' },
    receiver: { id: 200, fullName: 'User A' },
  },
  {
    id: 2,
    type: 'BUG_UPDATE',
    content: 'Bug #512 status has been updated to "Resolved".',
    link_url: '/Q3VzdG9tZXI=/project/2/bug/512',
    isRead: true,
    sender: { id: 100, fullName: 'System Bot' },
    receiver: { id: 200, fullName: 'User A' },
  },
  {
    id: 3,
    type: 'PAYOUT',
    content: 'You received a payout of $200 for bug resolution.',
    link_url: '/Q3VzdG9tZXI=/payment',
    isRead: false,
    sender: { id: 101, fullName: 'Finance Team' },
    receiver: { id: 200, fullName: 'User A' },
  },
];

const NotificationPage = () => {
  const [notifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const renderIcon = (type) => {
    switch (type) {
      case 'NEW_PROJECT': return '📁';
      case 'BUG_UPDATE': return '🐞';
      case 'PAYOUT': return '💰';
      default: return '🔔';
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="notification-page">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((noti) => (
          <li
            key={noti.id}
            className={`notification-item ${noti.isRead ? 'read' : 'unread'}`}
            onClick={() => handleNotificationClick(noti)}
          >
            <span className="icon">{renderIcon(noti.type)}</span>
            <div className="content">
              <div className="text">{noti.type}</div>
              <div className="sender">From: {noti.sender.fullName}</div>
            </div>
            {!noti.isRead && <span className="status-dot"></span>}
          </li>
        ))}
      </ul>

      {selectedNotification && (
        <div className="notification-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{selectedNotification.type}</h3>
              <button className="close-btn" onClick={closeModal}>✖</button>
            </div>
            <div className="modal-body">
              <p><strong>Type:</strong> {selectedNotification.type}</p>
              <p><strong>Content:</strong> {selectedNotification.content}</p>
              <p><strong>Link:</strong> <a href={selectedNotification.link_url} target="_blank" rel="noopener noreferrer">{selectedNotification.link_url}</a></p>
              <p><strong>From:</strong> {selectedNotification.sender.fullName}</p>
              <p><strong>To:</strong> {selectedNotification.receiver.fullName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
