import React, { useEffect, useState } from 'react';

const SSEComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/events`);

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Cleanup connection on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Eventos en tiempo real!</h1>
      <ol>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ol>
    </div>
  );
};

export default SSEComponent;
