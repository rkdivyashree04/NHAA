import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MessageSquare, X, Send, Mic, MicOff, Sparkles, User, ShieldAlert, Bot } from 'lucide-react';
import { speechService } from '../../services/speechService';

export default function ChatbotWidget({
  onOpenGrievance,
  onOpenTrack,
  onOpenSahaya,
  onOpenRescue
}) {
  const { t, victimLang, setVictimLang, languages, languageNames } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: t('chatbot.welcome'),
      showQuickOptions: true
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Handle bot intelligent routing
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botReply = '';
      let triggerAction = null;

      if (lower.includes('grievance') || lower.includes('complaint') || lower.includes('register')) {
        botReply = 'Opening the statutory grievance registration portal for you now. Please fill the incident details.';
        onOpenGrievance();
      } else if (lower.includes('track') || lower.includes('status')) {
        botReply = 'Opening the case tracking lookup portal. Please have your NHAA Case ID or registered mobile ready.';
        onOpenTrack();
      } else if (lower.includes('support') || lower.includes('help') || lower.includes('fear') || lower.includes('afraid') || lower.includes('threat')) {
        botReply = 'Connecting you to the SAHAYA AI-Assisted Support module for vulnerability and trauma assessment. Proceeding to consent screen...';
        setTimeout(() => onOpenSahaya(), 1000);
      } else if (lower.includes('rescue') || lower.includes('danger') || lower.includes('emergency')) {
        botReply = 'Opening Emergency Rescue Intake. If you are in active danger, also call 112 immediately.';
        onOpenRescue();
      } else if (lower.includes('human') || lower.includes('officer')) {
        botReply = 'Routing you to the 24x7 toll-free Helpline at 14566 to speak directly with an on-duty nodal officer.';
      } else {
        botReply = 'Thank you for your message. How can we assist you? You can choose to register a formal grievance, track an existing case, or request AI-assisted vulnerability assessment through SAHAYA.';
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply,
          showQuickOptions: true
        }
      ]);
    }, 600);
  };

  const handleOptionClick = (optKey) => {
    if (optKey === 'optRegister') {
      handleSendMessage(t('chatbot.optRegister'));
    } else if (optKey === 'optTrack') {
      handleSendMessage(t('chatbot.optTrack'));
    } else if (optKey === 'optSupport') {
      handleSendMessage(t('chatbot.optSupport'));
    } else if (optKey === 'optHuman') {
      handleSendMessage(t('chatbot.optHuman'));
    }
  };

  const toggleMic = async () => {
    if (isRecording) {
      speechService.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      await speechService.startRecording({
        language: victimLang,
        onTranscript: (transcript) => {
          setInputVal(transcript);
        },
        onDataAvailable: () => {
          setIsRecording(false);
        }
      });
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          className="chatbot-trigger-btn"
          onClick={() => setIsOpen(true)}
          id="btn-open-chatbot"
          aria-label="Open NHAA AI Support Assistant"
        >
          <Bot size={22} />
          <span>{t('chatbot.title')}</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Bot size={18} color="#60a5fa" />
                <h4>{t('chatbot.title')}</h4>
              </div>
              <p>24x7 Public Support & Grievance Guidance</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Language Switcher in Chatbot */}
              <select
                value={victimLang}
                onChange={(e) => setVictimLang(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '0.72rem', padding: '0.2rem' }}
                aria-label="Chatbot Language"
              >
                {languages.map((lng) => (
                  <option key={lng} value={lng} style={{ color: '#000' }}>
                    {languageNames[lng].split(' ')[0]}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer', padding: '0.2rem' }}
                aria-label="Close Chatbot"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Statutory Disclaimer Notice */}
          <div style={{ background: '#eff6ff', padding: '0.45rem 0.75rem', fontSize: '0.72rem', color: '#1e40af', borderBottom: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldAlert size={13} style={{ flexShrink: 0 }} />
            <span>{t('chatbot.disclaimer')}</span>
          </div>

          {/* Message List */}
          <div className="chatbot-messages-area">
            {messages.map((m) => (
              <div key={m.id} className={`chat-bubble ${m.sender}`}>
                <div style={{ fontSize: '0.88rem' }}>{m.text}</div>

                {m.showQuickOptions && (
                  <div className="chat-quick-options">
                    <button
                      className="chat-quick-btn"
                      onClick={() => handleOptionClick('optRegister')}
                      id="chat-opt-register"
                    >
                      📝 {t('chatbot.optRegister')}
                    </button>
                    <button
                      className="chat-quick-btn"
                      onClick={() => handleOptionClick('optTrack')}
                      id="chat-opt-track"
                    >
                      🔍 {t('chatbot.optTrack')}
                    </button>
                    <button
                      className="chat-quick-btn support-btn"
                      onClick={() => handleOptionClick('optSupport')}
                      id="chat-opt-support"
                    >
                      <Sparkles size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                      <strong>{t('chatbot.optSupport')}</strong> (SAHAYA)
                    </button>
                    <button
                      className="chat-quick-btn"
                      onClick={() => handleOptionClick('optHuman')}
                      id="chat-opt-human"
                    >
                      👤 {t('chatbot.optHuman')} (14566)
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="chatbot-input-bar">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isRecording ? 'Listening to speech...' : t('chatbot.placeholder')}
              style={{
                flex: 1,
                border: '1px solid var(--border-light)',
                borderRadius: '20px',
                padding: '0.55rem 0.9rem',
                fontSize: '0.85rem',
                outline: 'none'
              }}
              id="chatbot-input-field"
            />

            {/* Mic Toggle */}
            <button
              onClick={toggleMic}
              style={{
                background: isRecording ? '#fee2e2' : '#f1f5f9',
                border: 'none',
                color: isRecording ? '#dc2626' : 'var(--text-secondary)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={isRecording ? 'Stop Recording' : 'Speak into Microphone'}
              aria-label="Toggle Microphone"
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              style={{
                background: 'var(--nhaa-blue)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Send Message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
