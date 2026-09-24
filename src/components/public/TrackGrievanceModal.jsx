import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCases } from '../../context/CaseContext';
import { X, Search, ShieldCheck, CheckCircle2, Clock, UserCheck, AlertCircle, FileCheck } from 'lucide-react';

export default function TrackGrievanceModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { cases, getCaseById } = useCases();

  const [searchId, setSearchId] = useState('NHAA-2026-1042');
  const [searchPhone, setSearchPhone] = useState('');
  const [matchedCase, setMatchedCase] = useState(() => cases.find(c => c.id === 'NHAA-2026-1042') || cases[0]);
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    const found = getCaseById(searchId.trim());
    setMatchedCase(found || null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card large" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h3>{t('track.title')}</h3>
            <p>{t('track.subtitle')}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close track dialog">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Lookup Form */}
          <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr auto', gap: '0.75rem', marginBottom: '1.5rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="form-group">
              <label style={{ fontSize: '0.82rem', fontWeight: '600' }}>{t('track.caseIdLabel')} *</label>
              <input
                type="text"
                required
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. NHAA-2026-1042"
                className="form-control"
                id="track-case-id"
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.82rem', fontWeight: '600' }}>{t('track.phoneLabel')}</label>
              <input
                type="text"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="Registered mobile (optional)"
                className="form-control"
                id="track-phone"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                type="submit"
                className="btn-primary-action"
                style={{ padding: '0.68rem 1.4rem', flexDirection: 'row', height: '42px', fontSize: '0.9rem' }}
                id="btn-track-submit"
              >
                <Search size={16} />
                <span>{t('track.searchBtn')}</span>
              </button>
            </div>
          </form>

          {/* Demonstration Quick Case Pickers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Quick Demo Lookup:</span>
            {cases.slice(0, 4).map(c => (
              <button
                key={c.id}
                type="button"
                className="font-btn"
                onClick={() => { setSearchId(c.id); setMatchedCase(c); setSearched(true); }}
                style={{ background: matchedCase?.id === c.id ? '#dbeafe' : '#ffffff', color: matchedCase?.id === c.id ? '#1e40af' : '#334155' }}
              >
                {c.id} ({c.grievance.category.substring(0, 15)}...)
              </button>
            ))}
          </div>

          {/* Results Display */}
          {matchedCase ? (
            <div>
              {/* Case Overview Card (Public View - Does NOT expose raw AI scores!) */}
              <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.75rem', boxShadow: 'var(--card-shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem', marginBottom: '0.85rem' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Registered NHAA Case
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>
                      {matchedCase.id}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Reference: {matchedCase.referenceNumber} | Channel: {matchedCase.channel}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Current Status</div>
                    <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1e40af', padding: '0.3rem 0.8rem', borderRadius: '999px', fontWeight: '700', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                      {matchedCase.status}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Grievance Category:</span>
                    <strong>{matchedCase.grievance.category}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Jurisdiction:</span>
                    <strong>{matchedCase.victim.district}, {matchedCase.victim.state}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Date Registered:</span>
                    <strong>{matchedCase.date}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Supervising Officer:</span>
                    <strong>{matchedCase.assignedOfficer || 'Assigned to Nodal Cell'}</strong>
                  </div>
                </div>
              </div>

              {/* Public Milestone Progression */}
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '1rem' }}>
                Grievance Progression Timeline
              </h4>

              <div className="timeline-list" style={{ marginBottom: '1.75rem' }}>
                {matchedCase.publicTimeline.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-dot completed" />
                    <div className="timeline-time">{item.date}</div>
                    <div className="timeline-title">{item.step}</div>
                    <div className="timeline-desc">{item.note}</div>
                  </div>
                ))}
              </div>

              {/* Privacy Notice (No AI Internal Exposing) */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={18} color="var(--sahaya-teal)" style={{ flexShrink: 0 }} />
                <span>{t('track.noPublicAiNotice')}</span>
              </div>
            </div>
          ) : searched ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', background: '#f8fafc', borderRadius: '10px' }}>
              <AlertCircle size={36} color="#d97706" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>No Case Record Found</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Please verify the Case ID format (e.g. NHAA-2026-1042) or contact the 24x7 helpline at 14566.
              </p>
            </div>
          ) : null}
        </div>

        <div className="modal-footer">
          <button className="btn-track-action" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
