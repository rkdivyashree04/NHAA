import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';

export default function SahayaConsentModal({ isOpen, onClose, onConsent, onContinueWithoutAI }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header with Calming Teal Lockup */}
        <div className="modal-header" style={{ background: '#f0fdfa', borderBottom: '1px solid #99f6e4' }}>
          <div className="modal-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: 'var(--sahaya-teal)', color: '#ffffff', padding: '0.35rem', borderRadius: '8px' }}>
                <Sparkles size={18} />
              </div>
              <div>
                <h3 style={{ color: 'var(--sahaya-teal-dark)' }}>{t('sahaya.consentTitle')}</h3>
                <p style={{ color: '#0f766e' }}>Department of Social Justice & Empowerment, GoI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body" style={{ padding: '2rem 1.75rem' }}>
          {/* Main Statement */}
          <div style={{ background: '#ffffff', border: '1px solid #ccfbf1', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(13, 148, 136, 0.05)' }}>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-primary)', lineHeight: '1.65', fontWeight: '500' }}>
              "{t('sahaya.consentText')}"
            </p>
          </div>

          {/* 4 Explicit Disclaimers (Required by prompt) */}
          <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.85rem' }}>
            Important Public Protections & Disclaimers:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <CheckCircle2 size={18} color="var(--sahaya-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Non-Medical:</strong> {t('sahaya.disclaimer1')}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <CheckCircle2 size={18} color="var(--sahaya-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Professional Assessment:</strong> {t('sahaya.disclaimer2')}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <UserCheck size={18} color="var(--nhaa-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Human-in-the-Loop:</strong> {t('sahaya.disclaimer3')}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <ShieldCheck size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>Completely Voluntary:</strong> {t('sahaya.disclaimer4')}
              </div>
            </div>
          </div>

          {/* Action Buttons: 3 Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="btn-sahaya-primary"
              style={{ justifyContent: 'center', padding: '0.95rem', fontSize: '1rem' }}
              onClick={onConsent}
              id="btn-sahaya-consent-agree"
            >
              <CheckCircle2 size={20} />
              <span>{t('sahaya.consentAgree')}</span>
            </button>

            <button
              className="btn-track-action"
              style={{ justifyContent: 'center', padding: '0.85rem' }}
              onClick={onContinueWithoutAI}
              id="btn-sahaya-continue-no-ai"
            >
              <span>{t('sahaya.consentSkip')}</span>
            </button>

            <button
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              onClick={onClose}
            >
              <ArrowLeft size={16} />
              <span>{t('sahaya.consentBack')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
