import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // backend

export default function ChatRoom() {
  const [username, setUsername] = useState('');
  const [tempName, setTempName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off('receive_message');
  }, []);

  const joinChat = (e) => {
    e.preventDefault();
    if (tempName.trim() !== '') {
      setUsername(tempName.trim());
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('send_message', { username, text: message });
      setMessage('');
    }
  };

  if (!username) {
    return (
      <div style={styles.container}>
        <h3>Masukkan Username</h3>
        <form onSubmit={joinChat} style={styles.form}>
          <input 
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Nama Anda"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Join</button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3>Realtime Chat Room 🗨️</h3>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div key={idx} style={styles.messageCard}>
            <b style={{color: msg.username === username ? '#007bff' : '#333'}}>
              {msg.username}:
            </b> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={styles.form}>
        <input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Kirim</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '30px auto', fontFamily: 'Arial, sans-serif' },
  chatBox: { background: '#f9f9f9', padding: 10, height: 300, overflowY: 'scroll', marginBottom: 10, borderRadius: 8, border: '1px solid #ddd' },
  messageCard: { background: '#fff', padding: 6, margin: '4px 0', borderRadius: 4, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' },
  form: { display: 'flex' },
  input: { flex: 1, padding: 6, borderRadius: 4, border: '1px solid #ccc' },
  button: { marginLeft: 6, padding: '6px 12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }
};
