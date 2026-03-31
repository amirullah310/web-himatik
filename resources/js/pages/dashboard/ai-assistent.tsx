'use client';
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Halo! Aku asisten HIMATIK 🤖. Mau tanya apa hari ini?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setLoading(true);

    try {
      // Kirim ke backend Laravel atau API AI
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const aiResponse = data.reply || 'Maaf, aku belum bisa menjawab itu.';

      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Terjadi kesalahan saat menghubungi AI.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-80 h-[450px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col border border-purple-200 dark:border-purple-800 overflow-hidden"
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
            <h4 className="font-semibold text-sm">Asisten HIMATIK</h4>
            <button onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-purple-100 dark:bg-purple-800/30 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-purple-400 animate-pulse">AI sedang mengetik...</div>
            )}
          </div>

          <div className="flex items-center border-t border-purple-200 dark:border-purple-700 bg-gray-50 dark:bg-gray-800">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tulis pesan..."
              className="flex-1 px-3 py-2 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-3 text-purple-600 hover:text-purple-800 dark:text-purple-400"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="p-4 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition"
        >
          <MessageCircle className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
