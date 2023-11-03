import axios from 'axios';
import { useState, useEffect } from 'react';

import './MainPanel.css';
import UserCard from "./UserCard";


function MainPanel({ selectedUser, currentUser }) {
  const [message, setMessage] = useState('');
  const [nameFrom, setNameFrom] = useState('');
  const [nameTo, setNameTo] = useState('');
  const [chatArray, setChatArray] = useState([]);
  const fetchMessages = async () => {
    try {
      if (!nameFrom || !nameTo) {
        console.error('Missing sender or receiver names');
        return;
      }

      const response = await axios.get('http://localhost:4000/get-messages');
      const allMessages = response.data;

      
      const filteredMessages = allMessages.filter(
        (message) =>
          (message.nameFrom === nameFrom && message.nameTo === nameTo) ||
          (message.nameFrom === nameTo && message.nameTo === nameFrom)
      );

      setChatArray(filteredMessages);
      
      console.log('Fetched messages:', chatArray);
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setNameFrom(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedUser) {
      setNameTo(selectedUser.name);
      // Only fetch messages when both sender and receiver names are defined
      if (nameFrom && nameTo) {
        fetchMessages();
      }
    }
  }, [selectedUser, nameFrom, nameTo]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
  if (!nameFrom || !nameTo || !message) {
    // Don't send a message if any of the required values are missing
    console.error('Missing required values for sending a message');
    return;
  }

  console.log('sender: ' + nameFrom + '  receiver: ' + nameTo);
  console.log('message: ' + message);

  const requestBody = {
    nameFrom: nameFrom,
    nameTo: nameTo,
    message: message,
  };

  try {
    axios
    .post('http://localhost:4000/send-message', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data)
      fetchMessages();
      setMessage('');
    })

  } catch (error) {
    console.error('Axios error:', error)
  }
  
};


  if (!selectedUser ) {
    return <div className="plain-page  flex items-center justify-center w-3/4 h-[calc(100vh-80px)]">
      <p className='w-[400px] h-fit text-gray-700 text-[64px]'>
        Click on the user to chat with them</p>
    </div>;
  } else if (!currentUser) {
    return <h1>Loading</h1>
  }

  return (
    <div className="chat flex flex-col w-3/4">
      <div className="header h-[88px]">
        {selectedUser ? (
          <UserCard user={selectedUser} />
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      {selectedUser && (
        <div className="display-chat overflow-y-scroll flex flex-col h-[calc(100vh-218px)]">
          {chatArray.map((chat) => (
            <div
            key={chat._id} 
            className={`message w-fit p-3 text-xl bg-white border border-gray-50 rounded-full
            ${chat.nameFrom === currentUser ? 'self-end' : ''}`}
            >{chat.message}</div>
          ))}
        </div>
      )}
      {selectedUser && (
        <div className="send-text h-[50px] justify-self-end flex justify-center pb-2">
          <input
            type="text"
            className="w-[400px] border border-1 shadow-md h-[50px] rounded-full"
            value={message}
            onChange={handleMessage}
            placeholder=" Type your message here..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button
            type="button"
            className="send-button rounded-full ml-2 pb-1 shadow-md text-white text-2xl w-[50px] h-[50px] bg-[rgb(92,229,50)]"
            onClick={sendMessage}
          >
            <span>&gt;</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPanel;
