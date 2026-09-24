import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldAlert, Phone, ArrowRight, HeartHandshake, Scale, Activity } from 'lucide-react';

export default function SahayaResultModal({
  isOpen,
  onClose,
  assessmentResult,
  caseId = 'NHAA-2026-1042',
  onContinueToOfficerCase,
  onRequestHumanAssistance
}) {
  const { t } = useLanguage();

  if (!isOpen || !assessmentResult) return null;

  const {
    svi,
    riskCategory,
    riskColor,
    textAnalysis,
    voiceFeatures,
    explainabilityPoints,
    recommendations,
    thresholdDisclaimer,
    aiNotice
  } = assessmentResult;

  const indicators = textAnalysis?.indicatorTiers || {
    fear: 'HIGH',
    threat: 'HIGH',
    trauma: 'HIGH',
    isolation: 'MEDIUM',
    safety_concern: 'HIGH'
  };

  const raw = textAnalysis?.rawIndicators || {
    fear: 85,
    threat: 92,
    trauma: 74,
    isolation: 55,
    safety_concern: 88
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card large" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#f0fdfa', borderBottom: '1px solid #99f6e4' }}>
          <div className="modal-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'var(--sahaya-teal)', color: '#ffffff', padding: '0.4rem', borderRadius: '8px' }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 style={{ color: 'var(--sahaya-teal-dark)' }}>{t('sahaya.completeTitle')}</h3>
                <p style={{ color: '#0f766e' }}>AI-Assisted Victim Support & Vulnerability Dossier</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned Grievance ID:</span>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>
              {caseId}
            </div>
          </div>
        </div>

        <div className="modal-body">
          {/* Top SVI Gauge Card */}
          <div className="svi-gauge-card" style={{ marginBottom: '1.5rem', background: '#f8fafc' }}>
            <div
              className="svi-circle-display"
              style={{ borderColor: riskColor, color: riskColor }}
            >
              <span className="svi-score-num">{svi}</span>
              <span className="svi-score-total">/ 100</span>
            </div>

            <div className="svi-meta-info" style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h4>{t('sahaya.sviTitle')}</h4>
                <span className={`risk-badge ${riskCategory.toLowerCase()}`}>
                  {riskCategory}
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Multimodal synthesis of victim narrative statement, acoustic distress signals, and safety indicators.
              </p>

              <div className="svi-disclaimer-pill">
                <strong>Administrative Notice:</strong> {thresholdDisclaimer}
              </div>
            </div>
          </div>

          {/* Key Indicators Breakdown Grid (Fear, Threat, Trauma, Anxiety/Isolation, Safety) */}
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.75rem' }}>
            Assessed Vulnerability Indicators
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Threat / Coercion</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#dc2626', margin: '0.2rem 0' }}>
                {indicators.threat}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Score: {raw.threat}/100</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fear Apprehension</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#dc2626', margin: '0.2rem 0' }}>
                {indicators.fear}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Score: {raw.fear}/100</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Trauma Language</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ea580c', margin: '0.2rem 0' }}>
                {indicators.trauma}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Score: {raw.trauma}/100</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Social Isolation</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#d97706', margin: '0.2rem 0' }}>
                {indicators.isolation}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Score: {raw.isolation}/100</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Physical Safety</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#dc2626', margin: '0.2rem 0' }}>
                {indicators.safety_concern}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Score: {raw.safety_concern}/100</div>
            </div>
          </div>

          {/* Explainable AI: Why Was This Case Prioritized? */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#92400e', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={18} color="#b45309" />
              {t('sahaya.whyPrioritized')}
            </h4>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: '#78350f' }}>
              {explainabilityPoints.map((pt, idx) => (
                <li key={idx}>• {pt}</li>
              ))}
            </ul>
          </div>

          {/* Recommended Support Services (Marked AI Recommendation) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)' }}>
                {t('sahaya.recommendedSupport')}
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                {aiNotice}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
              {recommendations.map((rec, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--nhaa-blue-dark)' }}>
                      {rec.title}
                    </span>
                    <span className={`risk-badge ${rec.priority.toLowerCase()}`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                      {rec.priority}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                    {rec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with 3 Required Buttons */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn-rescue-action"
            style={{ padding: '0.7rem 1.25rem', flexDirection: 'row', fontSize: '0.9rem' }}
            onClick={onRequestHumanAssistance}
            id="btn-result-request-human"
          >
            <Phone size={16} />
            <span>{t('sahaya.requestHuman')}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-track-action"
              onClick={onClose}
              id="btn-save-assessment"
            >
              <span>{t('sahaya.saveAssessment')}</span>
            </button>

            <button
              type="button"
              className="btn-primary-action"
              style={{ padding: '0.7rem 1.4rem', flexDirection: 'row' }}
              onClick={onContinueToOfficerCase}
              id="btn-continue-to-case"
            >
              <span>{t('sahaya.continueToCase')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
