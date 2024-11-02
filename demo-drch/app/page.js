'use client';

import { useState, useEffect, useRef } from 'react';
<<<<<<< Updated upstream
=======
import { Bus, Car, MapPin, Bike } from 'lucide-react';

const ROOM_TYPES = {
  BIKE: 'motorcycle',
  CAR: 'taxi',
  LOCATION: 'location',
  BUS: 'evmini'
};

const TransportButtons = ({ onSelectType, selectedType }) => {
  return (
    <div className="flex flex-col gap-2 max-w-sm w-full mb-4">
      <div className="flex gap-2">
        <button 
          onClick={() => onSelectType(ROOM_TYPES.BIKE)}
          className={`flex-1 flex items-center rounded-lg overflow-hidden border border-gray-200 ${
            selectedType === ROOM_TYPES.BIKE ? 'border-blue-500' : ''
          }`}
        >
          <div className={`flex items-center gap-2 py-2 px-3 w-full ${
            selectedType === ROOM_TYPES.BIKE ? 'bg-blue-50' : 'bg-white'
          }`}>
            <Bike className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">มอเตอร์ไซค์</span>
          </div>
        </button>

        <button 
          onClick={() => onSelectType(ROOM_TYPES.CAR)}
          className={`flex-1 flex items-center rounded-lg overflow-hidden border border-gray-200 ${
            selectedType === ROOM_TYPES.CAR ? 'border-orange-500' : ''
          }`}
        >
          <div className={`flex items-center gap-2 py-2 px-3 w-full ${
            selectedType === ROOM_TYPES.CAR ? 'bg-orange-100' : 'bg-white'
          }`}>
            <Car className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-orange-500">แท้กซี่</span>
          </div>
        </button>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onSelectType(ROOM_TYPES.LOCATION)}
          className={`flex-1 flex items-center rounded-lg overflow-hidden border border-gray-200 ${
            selectedType === ROOM_TYPES.LOCATION ? 'border-blue-500' : ''
          }`}
        >
          <div className={`flex items-center gap-2 py-2 px-3 w-full ${
            selectedType === ROOM_TYPES.LOCATION ? 'bg-blue-50' : 'bg-white'
          }`}>
            <MapPin className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">สองแถว</span>
          </div>
        </button>

        <button 
          onClick={() => onSelectType(ROOM_TYPES.BUS)}
          className={`flex-1 flex items-center rounded-lg overflow-hidden border border-gray-200 ${
            selectedType === ROOM_TYPES.BUS ? 'border-blue-500' : ''
          }`}
        >
          <div className={`flex items-center gap-2 py-2 px-3 w-full ${
           selectedType === ROOM_TYPES.BUS ? 'bg-blue-50' : 'bg-white'
          }`}>
            <Bus className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">Ev มินิบัส</span>
          </div>
        </button>
      </div>
    </div>
  );
};
>>>>>>> Stashed changes

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("room1"); // Default to room1
  const [isJoined, setIsJoined] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const socket = useRef(null);

  const joinChat = () => {
    if (username && room) {
      socket.current = new WebSocket(`ws://localhost:8000/ws/${room}/${username}`);
      
      socket.current.onmessage = function(event) {
        const message = event.data;
        
        // Check if the message contains the active users list
        if (message.startsWith("Active users: ")) {
          const users = message.replace("Active users: ", "").split(", ");
          setActiveUsers(users);
        } else {
          // Add regular messages to the chat
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      socket.current.onclose = function() {
        setIsJoined(false);
        setActiveUsers([]); // Clear active users when disconnected
      };

      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (inputMessage !== "" && socket.current) {
      socket.current.send(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div>
      {!isJoined ? (
        <div>
          <h2>Drive With Me</h2>
          <div>คุณพี่ชื่ออะไรค้าาาาาา</div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            <option value="room1">Room 1</option>
            <option value="room2">Room 2</option>
            <option value="room3">Room 3</option>
            <option value="room4">Room 4</option>
            <option value="room5">Room 5</option>
          </select>
          <button onClick={joinChat}>Join Chat</button>
        </div>
      ) : (
        <div>
          <nav class="navchatroom">
            <h1>Chat Room : {room}</h1>
          </nav>

          <div class="sp"></div>

          <div class="activeUser">
            <h3>Active Users</h3>
            <ul>
              {/* Display all active users including the current user */}
              {activeUsers.map((user, index) => (
                <li class="member" key={index}>
                  {user === username ? `${user} (You)` : user}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>

          <div class="textforsend">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          
        </div>
      )}
    </div>
  );
}
