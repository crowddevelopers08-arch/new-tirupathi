'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      message: 'Hello! Welcome to Advanced Grohair. Our experienced professionals recommend the best hair treatments to match your needs and help you achieve the results you\'ve always wanted. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');

    setMessages(prev => [...prev, { type: 'user', message: userMessage, timestamp: new Date() }]);

    // Simple bot responses based on keywords
    setTimeout(() => {
      let botResponse = '';
      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('hair transplant') || lowerMessage.includes('transplant')) {
        botResponse = 'Our expert hair transplant solutions provide natural, permanent restoration for a fuller, thicker look. We use advanced techniques to ensure natural-looking results that match your hair pattern.';
      } else if (lowerMessage.includes('baldness') || lowerMessage.includes('bald')) {
        botResponse = 'Regain lost hair and rebuild confidence with our expert-backed restoration solutions. Whether it\'s partial or complete baldness, we have personalized treatments that work effectively for your condition.';
      } else if (lowerMessage.includes('thinning') || lowerMessage.includes('thin hair')) {
        botResponse = 'Thicker, fuller hair is possible! Our specialized therapies strengthen your hair from the roots, reducing thinning and improving volume with proven results.';
      } else if (lowerMessage.includes('alopecia') || lowerMessage.includes('patchy')) {
        botResponse = 'Tired of dealing with sudden bald patches? Our advanced treatments target alopecia specifically, reactivating dormant follicles for visible regrowth and comprehensive coverage.';
      } else if (lowerMessage.includes('hairline') || lowerMessage.includes('receding')) {
        botResponse = 'Stop your hairline from moving backward! Our customized approach helps strengthen existing hair and stimulate new growth for a more youthful, defined hairline.';
      } else if (lowerMessage.includes('genetic') || lowerMessage.includes('hereditary')) {
        botResponse = 'Inherited hair loss doesn\'t have to define your look. Our personalized treatments tackle hereditary patterns, giving you the best chance at long-term regrowth and maintenance.';
      } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('consult')) {
        botResponse = 'To book a consultation, please call us at 74368 56789. Our hair experts will assess your condition and recommend the best treatment plan for your needs.';
      } else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee')) {
        botResponse = 'We offer competitive pricing with personalized treatment plans. The cost varies based on your specific condition and treatment requirements. Please call us at 74368 56789 for detailed pricing information.';
      } else if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
        botResponse = 'We\'re located at: First Floor, No.187, MS Koil St, above Time emporium, Somu Nagar, Royapuram, Chennai, Tamil Nadu 600013';
      } else if (lowerMessage.includes('time') || lowerMessage.includes('hour') || lowerMessage.includes('open')) {
        botResponse = 'Our clinic timings are customized based on appointments. Please call us at 74368 56789 to schedule your visit at a convenient time.';
      } else if (lowerMessage.includes('treatment') || lowerMessage.includes('plan')) {
        botResponse = 'We create personalized treatment plans based on your hair condition, goals, and medical history. All our treatments are backed by 5+ years of expertise and FDA-approved technology.';
      } else if (lowerMessage.includes('experience') || lowerMessage.includes('years')) {
        botResponse = 'We have 5+ years of proven expertise in advanced hair restoration and have helped over 2,00,000+ happy patients regain their confidence with real results.';
      } else if (lowerMessage.includes('dermatologist') || lowerMessage.includes('doctor')) {
        botResponse = 'Our treatments are led by certified dermatologists and trusted professionals who specialize in hair restoration. You\'re in expert hands!';
      } else if (lowerMessage.includes('fda') || lowerMessage.includes('technology')) {
        botResponse = 'We use only FDA-approved technology that is safe, effective, and backed by science. Your safety and results are our top priority.';
      } else if (lowerMessage.includes('result') || lowerMessage.includes('success')) {
        botResponse = 'With 2,00,000+ happy patients and proven expertise, we deliver real results and real confidence. Our personalized approach ensures the best outcomes for each individual.';
      } else {
        botResponse = 'Thank you for your message! For specific questions about hair transplant, baldness treatment, thinning hair, alopecia, receding hairline, or genetic hair loss, I recommend speaking with our hair experts. Call us at 74368 56789 for personalized assistance.';
      }

      setMessages(prev => [...prev, { type: 'bot', message: botResponse, timestamp: new Date() }]);
    }, 1000);
  };

  return (
    <>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      {/* Chat Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 max-[470px]:mb-[50px] sm:right-6 z-50" style={{fontFamily: "'Outfit', sans-serif" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center cursor-pointer"
          style={{backgroundColor: '#d90f12', boxShadow: '0 4px 14px rgba(217, 15, 18, 0.4)'}}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-2 sm:bottom-24 sm:right-6 w-[calc(100vw-20px)] sm:w-80 h-80 sm:h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden"
             style={{boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'}}>
          {/* Header */}
          <div className="p-3 sm:p-4 rounded-t-2xl text-white flex items-center space-x-2 sm:space-x-3"
               style={{backgroundColor: '#d90f12', background: 'linear-gradient(135deg, #d90f12 0%, #b80d0f 100%)'}}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm sm:text-base truncate">Advanced Grohair Assistant</div>
              <div className="text-xs opacity-90 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Online now
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2 sm:space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] xs:max-w-xs p-2 sm:p-3 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-white text-gray-800 rounded-tr-none shadow-sm border border-gray-100' 
                    : 'text-white rounded-tl-none'
                }`}
                style={msg.type === 'bot' ? {background: 'linear-gradient(135deg, #d90f12 0%, #b80d0f 100%)'} : {}}>
                  <div className="text-xs sm:text-sm whitespace-pre-line">{msg.message}</div>
                  <div className={`text-[10px] mt-1 opacity-70 ${msg.type === 'user' ? 'text-right text-gray-500' : 'text-left text-white'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about hair treatments..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d90f12] focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="w-8 h-8 rounded-full max-[470px]:w-[45px] text-white flex items-center justify-center hover:opacity-90 transition-all flex-shrink-0 shadow-sm hover:shadow-md"
                style={{backgroundColor: '#d90f12', background: 'linear-gradient(135deg, #d90f12 0%, #b80d0f 100%)'}}
                aria-label="Send message"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}