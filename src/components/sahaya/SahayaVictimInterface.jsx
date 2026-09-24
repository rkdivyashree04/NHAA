import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { speechService } from '../../services/speechService';
import { analyzeText, analyzeVoiceFeatures, DEMO_NARRATIVES } from '../../services/sahayaEngine';
import AudioVisualizer from './AudioVisualizer';
import {
  Mic,
  MicOff,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Phone,
  Send,
  Globe,
  X,
  FileText,
  Volume2,
  ShieldAlert
} from 'lucide-react';

export default function SahayaVictimInterface({
  isOpen,
  onClose,
  initialData = null,
  onSubmitAssessment,
  onRequestHumanAssistance
}) {
  const { t, victimLang, setVictimLang, languages, languageNames } = useLanguage();

  // Active Input Mode: 'type' | 'speak'
  const [activeTab, setActiveTab] = useState('type');

  // Text narrative
  const [narrativeText, setNarrativeText] = useState(
    initialData?.grievanceData?.description ||
    DEMO_NARRATIVES.tamil_critical.text
  );

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [visualizerData, setVisualizerData] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);

  // Immediate Safety Trigger state
  const [safetyTriggered, setSafetyTriggered] = useState(false);

  // Live NLP safety check on text changes
  useEffect(() => {
    const analysis = analyzeText(narrativeText);
    setSafetyTriggered(analysis.immediateSafety);
  }, [narrativeText]);

  if (!isOpen) return null;

  // Toggle Voice Recording
  const handleToggleRecord = async () => {
    if (isRecording) {
      speechService.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setRecordedAudioUrl(null);
      setAudioDuration(0);

      const interval = setInterval(() => {
        setAudioDuration(d => d + 1);
      }, 1000);

      await speechService.startRecording({
        language: victimLang,
        onVisualizerData: (data) => {
          setVisualizerData(data);
        },
        onTranscript: (transcript) => {
          if (transcript) {
            setNarrativeText(prev => (prev ? `${prev} ${transcript}` : transcript));
          }
        },
        onDataAvailable: ({ audioBlob, audioUrl }) => {
          clearInterval(interval);
          setRecordedAudioUrl(audioUrl);
          setIsRecording(false);
        }
      });
    }
  };

  // Replay recorded audio
  const handleReplay = () => {
    if (recordedAudioUrl) {
      const audio = new Audio(recordedAudioUrl);
      audio.play();
    }
  };

  // Handle Preset Narrative Selection for rapid demo evaluation
  const handleSelectDemoNarrative = (key) => {
    const demo = DEMO_NARRATIVES[key];
    if (demo) {
      setNarrativeText(demo.text);
      if (demo.language) {
        setVictimLang(demo.language);
      }
    }
  };

  const handleSubmit = () => {
    const voiceFeatures = analyzeVoiceFeatures({
      durationSec: audioDuration || 12,
      elevatedDistress: narrativeText.toLowerCase().includes('afraid') || narrativeText.toLowerCase().includes('threat')
    });

    onSubmitAssessment({
      narrativeText,
      voiceFeatures: activeTab === 'speak' || recordedAudioUrl ? voiceFeatures : null,
      language: victimLang,
      victimData: initialData?.victimData || null,
      grievanceData: initialData?.grievanceData || null
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card large" onClick={(e) => e.stopPropagation()}>
        {/* Soothing Calm Header */}
        <div className="modal-header" style={{ background: '#f0fdfa', borderBottom: '1px solid #99f6e4' }}>
          <div className="modal-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'var(--sahaya-teal)', color: '#ffffff', padding: '0.4rem', borderRadius: '8px' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h3 style={{ color: 'var(--sahaya-teal-dark)' }}>{t('sahaya.victimTitle')}</h3>
                <p style={{ color: '#0f766e' }}>Calm & Confidential Assessment</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#ffffff', padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #99f6e4' }}>
              <Globe size={14} color="var(--sahaya-teal)" />
              <select
                value={victimLang}
                onChange={(e) => setVictimLang(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', color: 'var(--sahaya-teal-dark)', fontWeight: '600', cursor: 'pointer', outline: 'none' }}
                aria-label="Assessment Language"
              >
                {languages.map((lng) => (
                  <option key={lng} value={lng}>
                    {languageNames[lng]}
                  </option>
                ))}
              </select>
            </div>

            <button className="modal-close-btn" onClick={onClose} aria-label="Close Assessment">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Immediate Safety Detection Trigger Layer (Calm Banner, Not Alarming) */}
          {safetyTriggered && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: '#dc2626', color: '#ffffff', padding: '0.4rem', borderRadius: '50%' }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#b91c1c', fontSize: '0.95rem' }}>
                    {t('sahaya.immediateSafety')}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#991b1b' }}>
                    {t('sahaya.immediateSafetyDesc')}
                  </div>
                </div>
              </div>

              <button
                className="btn-rescue-action"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', flexDirection: 'row' }}
                onClick={onRequestHumanAssistance}
                id="btn-safety-request-human"
              >
                <Phone size={16} />
                <span>{t('sahaya.requestHuman')}</span>
              </button>
            </div>
          )}

          {/* Victim Prompt */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.25rem' }}>
              {t('sahaya.victimPrompt')}
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              You may type your thoughts or record your voice. Take your time; there is no rush.
            </p>
          </div>

          {/* Input Method Switcher: [ 💬 Type ] vs [ 🎤 Speak ] */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('type')}
              style={{
                background: activeTab === 'type' ? 'var(--sahaya-teal-subtle)' : 'transparent',
                color: activeTab === 'type' ? 'var(--sahaya-teal-dark)' : 'var(--text-secondary)',
                border: activeTab === 'type' ? '1px solid var(--sahaya-teal-border)' : '1px solid transparent',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              id="tab-type"
            >
              <FileText size={18} />
              <span>{t('sahaya.textTab')}</span>
            </button>

            <button
              onClick={() => setActiveTab('speak')}
              style={{
                background: activeTab === 'speak' ? 'var(--sahaya-teal-subtle)' : 'transparent',
                color: activeTab === 'speak' ? 'var(--sahaya-teal-dark)' : 'var(--text-secondary)',
                border: activeTab === 'speak' ? '1px solid var(--sahaya-teal-border)' : '1px solid transparent',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              id="tab-speak"
            >
              <Mic size={18} />
              <span>{t('sahaya.voiceTab')}</span>
            </button>
          </div>

          {/* TAB 1: Voice Input Interface */}
          {activeTab === 'speak' && (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.25rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.9rem', color: isRecording ? '#dc2626' : 'var(--text-secondary)', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {isRecording ? `${t('sahaya.recordingActive')} (${audioDuration}s)` : 'Click Record to speak. Audio is analyzed for supporting acoustic signals.'}
                </div>

                {/* Live Waveform Canvas */}
                <AudioVisualizer isRecording={isRecording} visualizerData={visualizerData} />
              </div>

              {/* Voice Controls */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  style={{
                    background: isRecording ? '#dc2626' : 'var(--sahaya-teal)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                  id="btn-voice-toggle"
                >
                  {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  <span>{isRecording ? t('sahaya.stopRecord') : t('sahaya.startRecord')}</span>
                </button>

                {recordedAudioUrl && !isRecording && (
                  <button
                    type="button"
                    onClick={handleReplay}
                    className="btn-track-action"
                    style={{ padding: '0.75rem 1.4rem', flexDirection: 'row', fontSize: '0.92rem' }}
                    id="btn-voice-replay"
                  >
                    <Play size={16} />
                    <span>{t('sahaya.replayAudio')}</span>
                  </button>
                )}
              </div>

              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                Speech features (rate, pauses, pitch variation) are processed modularly as supporting signals only.
              </div>
            </div>
          )}

          {/* TAB 2: Text Narrative Area */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Narrative Statement:</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {narrativeText.length} characters
              </span>
            </label>
            <textarea
              rows={5}
              value={narrativeText}
              onChange={(e) => setNarrativeText(e.target.value)}
              placeholder={t('sahaya.placeholderText')}
              className="form-control"
              style={{ fontSize: '0.95rem', lineHeight: '1.6' }}
              id="sahaya-narrative-input"
            />
          </div>

          {/* Quick Demo Pre-sets for Instant Evaluation */}
          <div style={{ background: '#f0f7ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e40af', marginBottom: '0.5rem' }}>
              Evaluate With Demonstration Scenarios (Click to test):
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="font-btn"
                onClick={() => handleSelectDemoNarrative('tamil_critical')}
                style={{ background: '#ffffff', color: '#1e40af' }}
              >
                Tamil Prompt Critical Case (SVI 82)
              </button>
              <button
                type="button"
                className="font-btn"
                onClick={() => handleSelectDemoNarrative('english_critical')}
                style={{ background: '#ffffff', color: '#dc2626' }}
              >
                English Prompt Scenario ("threatened me and my family")
              </button>
              <button
                type="button"
                className="font-btn"
                onClick={() => handleSelectDemoNarrative('hindi_high')}
                style={{ background: '#ffffff', color: '#d97706' }}
              >
                Hindi High Risk (Social Boycott)
              </button>
              <button
                type="button"
                className="font-btn"
                onClick={() => handleSelectDemoNarrative('english_moderate')}
                style={{ background: '#ffffff', color: '#16a34a' }}
              >
                English Moderate Grievance
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn-rescue-action"
            style={{ padding: '0.7rem 1.25rem', flexDirection: 'row', fontSize: '0.88rem' }}
            onClick={onRequestHumanAssistance}
            id="btn-sahaya-request-human-footer"
          >
            <Phone size={16} />
            <span>{t('sahaya.requestHuman')}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn-track-action" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-sahaya-primary"
              onClick={handleSubmit}
              id="btn-submit-sahaya-assessment"
            >
              <Sparkles size={18} />
              <span>{t('sahaya.submitAssessment')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
