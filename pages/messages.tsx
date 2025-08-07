import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

type MessageType = {
  id: number | string;
  content: string;
  from_user_id: number | string;
  to_user_id: number | string;
  // alte câmpuri relevante
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  useEffect(() => {
    supabase.from('messages').select('*').then(({ data, error }) => {
      if (error) {
        setMessages([]);
      } else {
        setMessages(data || []);
      }
    });
  }, []);
  return (
    <ul>
      {messages.map(msg => (
        <li key={msg.id}>{msg.content}</li>
      ))}
    </ul>
  );
}
