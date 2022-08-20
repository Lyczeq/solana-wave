import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import './Waves.css';

const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
];

export const Waves = ({ walletAddress }) => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = event => {
    const { value } = event.target;
    setUserMessage(value);
  };

  const sendMessage = async () => {
    if (userMessage.length > 0) {
      console.log('Gif link:', userMessage);
      setMessages([userMessage, ...messages]);
      setUserMessage('');
    } else {
      console.log('Empty input. Try again.');
    }
  };

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching messages...');

      setMessages(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="connected-container">
      <form
        onSubmit={event => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          placeholder="Enter your message!"
          value={userMessage}
          onChange={handleMessageChange}
        />
        <Button type="submit" className="submit-gif-button">
          Submit
        </Button>
      </form>
      <div className="gif-grid">
        {messages.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
};
