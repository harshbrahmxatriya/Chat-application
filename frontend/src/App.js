import './App.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import LeftBar from './components/LeftBar';
import MainPanel from './components/MainPanel';

function Header() {
  return (
    <div className='header h-[80px] pl-4 flex items-center bg-[#0e942b] text-3xl font-semibold text-white'>
      <h1>Chat Application</h1>
    </div>
  )
}

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (location.state && location.state.userData) {
      setCurrentUser(location.state.userData);
      console.log('Current user from App.js', location.state.userData);
    }
  }, [location.state]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/get-users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <>
      {users.length === 0 || !currentUser ? (
        <h1>Loading...</h1>
      ) : (
        <div className='app-window overflow-y-hidden'>
          <Header />
          <div className='main-section h-[calc(100vh-80px)] flex'>
            <LeftBar users={users} handleSelectUser={handleSelectUser} />
            {currentUser && (
              <MainPanel selectedUser={selectedUser} currentUser={currentUser} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
