import React, { useState } from 'react';
import './MessagePage.css';

const mockMessages = [
  {
    id: 1,
    content: 'Chào bạn, tôi là admin QArena. Bạn cần hỗ trợ gì không?',
    time_created: '2025-04-28T09:15:00.000+00:00',
    user: { fullName: 'Admin QArena', isAdmin: true },
  },
  {
    id: 2,
    content: 'Dạ vâng, tôi muốn hỏi về lỗi không hiển thị project.',
    time_created: '2025-04-28T09:16:00.000+00:00',
    user: { fullName: 'Bạn', isAdmin: false },
  },
  {
    id: 3,
    content: 'Dạ vâng, tôi muốn hỏi về lỗi không hiển thị project.',
    time_created: '2025-04-28T09:16:00.000+00:00',
    user: { fullName: 'Bạn', isAdmin: false },
  },
  {
    id: 4,
    content: 'Dạ vâng, tôi muốn hỏi về lỗi không hiển thị project.',
    time_created: '2025-04-28T09:16:00.000+00:00',
    user: { fullName: 'Bạn', isAdmin: false },
  },
  {
    id: 5,
    content: 'Dạ vâng, tôi muốn hỏi về lỗi không hiển thị project.',
    time_created: '2025-04-28T09:16:00.000+00:00',
    user: { fullName: 'Bạn', isAdmin: false },
  },
  {
    id: 6,
    content: 'Dạ vâng, tôi muốn hỏi về lỗi không hiển thị project.',
    time_created: '2025-04-28T09:16:00.000+00:00',
    user: { fullName: 'Bạn', isAdmin: false },
  },
  {
    id: 7,
    content: 'Dạ vâng, tôi muốn hỏi về lỗi không hiển thị project.',
    time_created: '2025-04-28T09:16:00.000+00:00',
    user: { fullName: 'Bạn', isAdmin: false },
  },
];

const MessagePage = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMsg, setNewMsg] = useState('');

  const handleSend = () => {
    if (!newMsg.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      content: newMsg,
      time_created: new Date().toISOString(),
      user: { fullName: 'Bạn', isAdmin: false },
    };

    setMessages([...messages, newMessage]);
    setNewMsg('');
  };

  return (
    <div className="message-page">
      <h2>Message</h2>
      <div className="message-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-item ${msg.user.isAdmin ? 'admin' : 'user'}`}
          >
            <div className="message-content">{msg.content}</div>
            <div className="message-time">
              {new Date(msg.time_created).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button onClick={handleSend}>Gửi</button>
      </div>
    </div>
  );
};

export default MessagePage;
