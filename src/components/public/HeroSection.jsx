import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, AlertTriangle, Search, Sparkles, Shield, HeartHandshake } from 'lucide-react';

export default function HeroSection({ onOpenGrievance, onOpenRescue, onOpenTrack, onOpenSahaya }) {
  const { t } = useLanguage();

  return (
    <section className="hero-container">
      <div className="hero-content">
        {/* Top Official Tag */}
        <div className="hero-pill-badge">
          <Shield size={16} color="var(--nhaa-blue)" />
          <span>Statutory Platform under PoA Act 1989 & PCR Act 1955</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          {t('hero.title')}<br />
          <span style={{ fontSize: '0.85em', color: 'var(--nhaa-blue)', fontWeight: '700' }}>(NHAA)</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>

        {/* Primary Action Buttons Grid */}
        <div className="hero-actions-grid">
          {/* Button 1: Register Grievance */}
          <button className="btn-primary-action" onClick={onOpenGrievance} id="btn-register-grievance">
            <FileText size={24} />
            <span>{t('hero.registerGrievanceBtn')}</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.9, fontWeight: 'normal' }}>Formal Grievance Intake</span>
          </button>

          {/* Button 2: Register a Rescue */}
          <button className="btn-rescue-action" onClick={onOpenRescue} id="btn-register-rescue">
            <AlertTriangle size={24} />
            <span>{t('hero.registerRescueBtn')}</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.85, fontWeight: 'normal' }}>Immediate Threat Escalation</span>
          </button>

          {/* Button 3: Track Grievance Status */}
          <button className="btn-track-action" onClick={onOpenTrack} id="btn-track-grievance">
            <Search size={24} color="var(--nhaa-blue)" />
            <span>{t('hero.trackGrievanceBtn')}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Track by Case ID / Phone</span>
          </button>

          {/* Button 4: SAHAYA AI Support (Balanced so it does NOT visually overpower NHAA) */}
          <button className="btn-sahaya-hero" onClick={onOpenSahaya} id="btn-sahaya-support">
            <Sparkles size={24} />
            <span>{t('hero.sahayaBtn')}</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.95, fontWeight: 'normal' }}>Vulnerability Assessment</span>
          </button>
        </div>

        {/* Micro reassurance notes below hero */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Shield size={14} color="#16a34a" /> 100% Confidential & Secure Intake
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <HeartHandshake size={14} color="#0d9488" /> Human-in-the-Loop Supervision
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb', display: 'inline-block' }} /> 24x7 Multi-Lingual Support
          </span>
        </div>
      </div>
    </section>
  );
}
