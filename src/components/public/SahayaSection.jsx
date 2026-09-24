import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, HeartHandshake, ShieldCheck, UserCheck, Activity, Info, X } from 'lucide-react';

export default function SahayaSection({ onOpenSahaya }) {
  const { t } = useLanguage();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <section className="sahaya-showcase-section" id="sahaya-overview">
      <div className="sahaya-showcase-card">
        {/* Header with Subtle Teal Icon */}
        <div className="sahaya-showcase-header">
          <div className="sahaya-brand-lockup">
            <div className="sahaya-brand-icon" aria-hidden="true">
              <HeartHandshake size={28} />
            </div>
            <div className="sahaya-title-wrap">
              <div style={{ display: 'inline-block', fontSize: '0.74rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--sahaya-teal-dark)', background: 'var(--sahaya-teal-subtle)', padding: '0.2rem 0.6rem', borderRadius: '4px', marginBottom: '0.25rem' }}>
                {t('sahaya.badge')}
              </div>
              <h2>{t('sahaya.title')}</h2>
              <div className="sahaya-subtitle">
                Department of Social Justice & Empowerment, Government of India
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Description (Exact Prompt Text) */}
        <p className="sahaya-desc-text">
          "{t('sahaya.description')}"
        </p>

        {/* 4 Core Pillars of SAHAYA */}
        <div className="sahaya-features-row">
          <div className="sahaya-feature-item">
            <div className="sahaya-feature-icon">
              <Activity size={20} />
            </div>
            <div>
              <div className="sahaya-feature-title">Vulnerability Indicators</div>
              <div className="sahaya-feature-desc">
                Multimodal extraction of distress, fear, threat, and isolation patterns without clinical labeling.
              </div>
            </div>
          </div>

          <div className="sahaya-feature-item">
            <div className="sahaya-feature-icon">
              <UserCheck size={20} />
            </div>
            <div>
              <div className="sahaya-feature-title">Human-in-the-Loop</div>
              <div className="sahaya-feature-desc">
                AI assists prioritization only; designated nodal officers review and decide all case actions.
              </div>
            </div>
          </div>

          <div className="sahaya-feature-item">
            <div className="sahaya-feature-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="sahaya-feature-title">Voluntary & Consent-First</div>
              <div className="sahaya-feature-desc">
                Victims choose whether to enable AI assistance; grievance registration remains completely independent.
              </div>
            </div>
          </div>

          <div className="sahaya-feature-item">
            <div className="sahaya-feature-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="sahaya-feature-title">Tailored Support Referral</div>
              <div className="sahaya-feature-desc">
                Recommends psychological debriefing, legal advocacy, and witness safety assessments.
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sahaya-actions-row">
          <button className="btn-sahaya-primary" onClick={onOpenSahaya} id="btn-start-sahaya-section">
            <Sparkles size={18} />
            <span>{t('sahaya.startBtn')}</span>
          </button>

          <button className="btn-sahaya-secondary" onClick={() => setShowHowItWorks(true)} id="btn-learn-sahaya">
            <Info size={18} />
            <span>{t('sahaya.learnBtn')}</span>
          </button>

          <div style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={14} color="var(--sahaya-teal)" />
            <span>Administrative demonstration capability — not a medical diagnosis system</span>
          </div>
        </div>
      </div>

      {/* How SAHAYA Works Informational Modal */}
      {showHowItWorks && (
        <div className="modal-backdrop" onClick={() => setShowHowItWorks(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h3>How SAHAYA Operates Inside NHAA</h3>
                <p>System workflow, safeguards, and administrative demonstration guidelines</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowHowItWorks(false)} aria-label="Close dialog">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ fontSize: '0.92rem', lineHeight: '1.65' }}>
              <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#115e59' }}>
                <strong>Strict Statutory & Clinical Safeguard:</strong> SAHAYA is designed strictly to assist administrative case prioritization. It never makes a medical diagnosis, does not diagnose PTSD, depression or psychological disorders, and never replaces human decision-makers.
              </div>

              <h4 style={{ color: 'var(--nhaa-blue-dark)', marginBottom: '0.5rem', fontWeight: '700' }}>The Complete Integrated Workflow:</h4>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1.5rem', color: '#1e293b' }}>
                VICTIM → NHAA Grievance Intake → Explicit Consent → SAHAYA Multimodal Assessment → Linguistic & Acoustic Indicators → Stress Vulnerability Index (SVI: 0-100) → NHAA Case Dossier → Nodal Officer Human Review → Tailored Support & Referral → Audit & Resolution
              </div>

              <h4 style={{ color: 'var(--nhaa-blue-dark)', marginBottom: '0.5rem', fontWeight: '700' }}>Multimodal Signals Analyzed:</h4>
              <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li><strong>Text Indicators:</strong> Fear, Threat, Intimidation, Social Isolation, Displacement, and Acute Safety concerns.</li>
                <li><strong>Supporting Acoustic Signals:</strong> Speech rate, pause duration, pitch variation, and hesitation patterns (strictly non-diagnostic supporting signals).</li>
                <li><strong>Explainable AI (XAI):</strong> Transparently explains why a case was flagged without exposing black-box chains.</li>
              </ul>

              <h4 style={{ color: 'var(--nhaa-blue-dark)', marginBottom: '0.5rem', fontWeight: '700' }}>Stress Vulnerability Index (SVI) Demonstrations:</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                The SVI combines threat severity, distress indicators, and context into a 0–100 score categorized into Low (0–24), Moderate (25–49), High (50–74), and Critical (75–100). All thresholds shown are administrative demonstration thresholds.
              </p>
            </div>

            <div className="modal-footer">
              <button className="btn-sahaya-primary" onClick={() => { setShowHowItWorks(false); onOpenSahaya(); }}>
                <Sparkles size={16} />
                <span>Start Assessment</span>
              </button>
              <button className="btn-track-action" style={{ padding: '0.6rem 1.2rem' }} onClick={() => setShowHowItWorks(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
