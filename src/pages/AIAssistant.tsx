import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function AIAssistant() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'assistant', content: 'Olá! Sou seu assistente financeiro inteligente. Como posso ajudar você hoje?' },
    { role: 'assistant', content: 'Notei que seus gastos com alimentação aumentaram 15% esta semana. Gostaria de ver uma análise detalhada?' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChat([...chat, { role: 'user', content: message }]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'assistant', content: 'Analisando seus dados... Com base no seu perfil, recomendo reduzir os gastos em delivery para manter sua meta mensal.' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark">
      <Header
        showBack
        title="Assistente IA"
        subtitle="Online"
        rightElement={
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-zinc-400">more_vert</span>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                ? 'bg-primary text-black font-medium rounded-tr-none'
                : 'bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-tl-none'
              }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 pb-10 bg-background-dark/80 backdrop-blur-md border-t border-zinc-900">
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 pl-4">
          <input
            className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-zinc-600 focus:ring-0"
            placeholder="Pergunte sobre seus gastos..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-black font-bold">send</span>
          </button>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
          <button className="flex-shrink-0 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Resumo Semanal</button>
          <button className="flex-shrink-0 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Dicas de Economia</button>
          <button className="flex-shrink-0 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Onde investi?</button>
        </div>
      </div>
    </div>
  );
}
