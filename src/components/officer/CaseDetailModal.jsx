import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Shield,
  Sparkles,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Scale,
  Activity,
  FileText,
  Phone,
  MessageSquare,
  Share2,
  Check,
  Send,
  Siren
} from 'lucide-react';

export default function CaseDetailModal({ caseId, isOpen, onClose }) {
  const { cases, updateHumanReview, createReferral, addCaseNote } = useCases();
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sahaya' | 'referrals' | 'timeline'
  const [reviewDecision, setReviewDecision] = useState('Confirm Priority');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [newCaseNote, setNewCaseNote] = useState('');
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [referralType, setReferralType] = useState('Counselling');
  const [referralSpecialist, setReferralSpecialist] = useState('Smt. Ananya Sharma');
  const [referralPriority, setReferralPriority] = useState('HIGH');
  const [referralNotes, setReferralNotes] = useState('');

  if (!isOpen || !caseId) return null;

  const targetCase = cases.find(c => c.id === caseId) || cases[0];
  const { victim, grievance, sahayaAssessment, humanReview, internalTimeline, publicTimeline } = targetCase;

  // Handle Human Review Submission
  const handleExecuteReview = (decisionType) => {
    updateHumanReview(targetCase.id, {
      decision: decisionType || reviewDecision,
      priority: selectedPriority || sahayaAssessment?.riskCategory || 'HIGH',
      notes: reviewNotes || `Human review executed by ${currentUser?.name}. Action: ${decisionType || reviewDecision}.`,
      officerName: currentUser?.name || 'Authorized Nodal Officer',
      officerId: currentUser?.id || 'OFF-1042'
    });
    setReviewNotes('');
  };

  // Handle Referral Creation
  const handleCreateReferral = (e) => {
    e.preventDefault();
    createReferral({
      caseId: targetCase.id,
      type: referralType,
      assignedSpecialist: referralSpecialist,
      priority: referralPriority,
      notes: referralNotes
    });
    setShowReferralForm(false);
    setReferralNotes('');
  };

  // Handle Add Note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newCaseNote.trim()) return;
    addCaseNote(targetCase.id, newCaseNote.trim(), currentUser?.name);
    setNewCaseNote('');
  };

  const isCritical = sahayaAssessment?.riskCategory === 'CRITICAL';
  const isHigh = sahayaAssessment?.riskCategory === 'HIGH';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '92vh' }}>
        {/* Dossier Header */}
        <div className="modal-header" style={{ background: isCritical ? '#fef2f2' : '#ffffff', borderBottom: isCritical ? '1px solid #fecaca' : '1px solid var(--border-light)' }}>
          <div className="modal-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ background: isCritical ? '#dc2626' : 'var(--nhaa-blue)', color: '#ffffff', padding: '0.35rem', borderRadius: '8px' }}>
                <Shield size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <h3 style={{ color: isCritical ? '#b91c1c' : 'var(--nhaa-blue-dark)', fontSize: '1.25rem' }}>
                    CASE DOSSIER: {targetCase.id}
                  </h3>
                  {sahayaAssessment && (
                    <span className={`risk-badge ${sahayaAssessment.riskCategory.toLowerCase()}`}>
                      {sahayaAssessment.riskCategory} RISK
                    </span>
                  )}
                  {sahayaAssessment?.safetyFlags?.immediateSafety && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#dc2626', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>
                      <Siren size={12} />
                      URGENT SAFETY FLAG
                    </span>
                  )}
                </div>
                <p style={{ color: isCritical ? '#991b1b' : 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Channel: {targetCase.channel} | Registered: {targetCase.date} | Jurisdiction: {victim.district}, {victim.state}
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Assigned Officer:</span>
              <div style={{ fontSize: '0.88rem', fontWeight: '700', color: targetCase.assignedOfficer === 'Unassigned' ? '#b91c1c' : 'var(--text-primary)' }}>
                {targetCase.assignedOfficer}
              </div>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close Dossier">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Inner Tabs: Overview, SAHAYA Assessment, Referrals, Audit Timeline */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', background: '#f8fafc', padding: '0 1.5rem' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.75rem 1.1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'overview' ? '3px solid var(--nhaa-blue)' : '3px solid transparent',
              color: activeTab === 'overview' ? 'var(--nhaa-blue)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'overview' ? '700' : '600',
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
            id="tab-dossier-overview"
          >
            1. Grievance & Victim Info
          </button>

          <button
            onClick={() => setActiveTab('sahaya')}
            style={{
              padding: '0.75rem 1.1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'sahaya' ? '3px solid var(--sahaya-teal)' : '3px solid transparent',
              color: activeTab === 'sahaya' ? 'var(--sahaya-teal-dark)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'sahaya' ? '700' : '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            id="tab-dossier-sahaya"
          >
            <Sparkles size={15} color="var(--sahaya-teal)" />
            <span>2. SAHAYA AI Assessment (SVI)</span>
          </button>

          <button
            onClick={() => setActiveTab('referrals')}
            style={{
              padding: '0.75rem 1.1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'referrals' ? '3px solid var(--nhaa-blue)' : '3px solid transparent',
              color: activeTab === 'referrals' ? 'var(--nhaa-blue)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'referrals' ? '700' : '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            id="tab-dossier-referrals"
          >
            <Share2 size={15} />
            <span>3. Support Referrals ({targetCase.referrals?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            style={{
              padding: '0.75rem 1.1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'timeline' ? '3px solid var(--nhaa-blue)' : '3px solid transparent',
              color: activeTab === 'timeline' ? 'var(--nhaa-blue)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'timeline' ? '700' : '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            id="tab-dossier-timeline"
          >
            <Clock size={15} />
            <span>4. Case Audit Timeline</span>
          </button>
        </div>

        <div className="modal-body" style={{ overflowY: 'auto' }}>
          {/* TAB 1: Grievance & Victim Particulars */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Victim Information Card */}
              <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <UserCheck size={18} color="var(--nhaa-blue)" />
                  Victim Particulars & Confidential Demographics
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.86rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Full Name:</span>
                    <strong>{victim.name}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Age / Gender:</span>
                    <strong>{victim.age} years / {victim.gender}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Contact Phone:</span>
                    <strong>{victim.contact}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Preferred Comm Method:</span>
                    <strong>{victim.preferredComm || 'Phone Call'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Location / Address:</span>
                    <strong>{victim.location}, {victim.district}, {victim.state}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>AI Consent Recorded:</span>
                    <strong style={{ color: victim.consentGiven ? '#16a34a' : '#d97706' }}>
                      {victim.consentGiven ? '✓ Explicit Consent Granted' : '✗ Standard Non-AI Intake'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Grievance Incident Card */}
              <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}>
                <h4 style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={18} color="var(--nhaa-blue)" />
                  Incident Details & Statutory Grievance
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.86rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Statutory Category:</span>
                    <strong>{grievance.category}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Incident Date:</span>
                    <strong>{grievance.incidentDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Intake Reference:</span>
                    <strong>{targetCase.referenceNumber}</strong>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.3rem' }}>
                    Incident Narrative Statement:
                  </span>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                    "{grievance.description}"
                  </div>
                </div>

                {grievance.supportingInfo && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.2rem' }}>
                      Supporting Documents / Witness Info:
                    </span>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      {grievance.supportingInfo}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SAHAYA AI Assessment (The Complete Core Module) */}
          {activeTab === 'sahaya' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {sahayaAssessment ? (
                <>
                  {/* SVI Score Gauge & Category */}
                  <div className="svi-gauge-card" style={{ background: '#f0fdfa', border: '1px solid #99f6e4' }}>
                    <div className="svi-circle-display" style={{ borderColor: sahayaAssessment.riskColor, color: sahayaAssessment.riskColor, background: '#ffffff' }}>
                      <span className="svi-score-num">{sahayaAssessment.svi}</span>
                      <span className="svi-score-total">/ 100</span>
                    </div>

                    <div className="svi-meta-info" style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                        <h4 style={{ color: 'var(--sahaya-teal-dark)' }}>Stress Vulnerability Index (SVI)</h4>
                        <span className={`risk-badge ${sahayaAssessment.riskCategory.toLowerCase()}`}>
                          {sahayaAssessment.riskCategory}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        Calculated by SAHAYA Multimodal Feature Fusion Engine from victim narrative and acoustic signals.
                      </p>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', background: '#ffffff', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #ccfbf1' }}>
                        SVI thresholds shown in this prototype are administrative demonstration thresholds and are not clinical diagnostic cutoffs.
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Explainable AI Indicators */}
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#92400e', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <AlertTriangle size={18} color="#b45309" />
                      Explainable AI (XAI) — Why Was This Case Prioritized?
                    </h4>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.88rem', color: '#78350f' }}>
                      {sahayaAssessment.explainability?.map((pt, idx) => (
                        <li key={idx}>• {pt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 5: Safety Indicators Breakdown */}
                  <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.85rem' }}>
                      Vulnerability Sub-Indicator Scores
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
                      <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Threat / Coercion</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#dc2626' }}>{sahayaAssessment.indicators?.threat || 'HIGH'}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Fear Apprehension</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#dc2626' }}>{sahayaAssessment.indicators?.fear || 'HIGH'}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Trauma Language</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ea580c' }}>{sahayaAssessment.indicators?.trauma || 'HIGH'}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Social Isolation</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#d97706' }}>{sahayaAssessment.indicators?.isolation || 'MEDIUM'}</div>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Physical Safety</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#dc2626' }}>{sahayaAssessment.indicators?.safety_concern || 'HIGH'}</div>
                      </div>
                    </div>

                    {/* Acoustic Feature Indicators */}
                    {sahayaAssessment.voiceFeatures && (
                      <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', padding: '0.9rem', borderRadius: '8px', fontSize: '0.82rem', color: '#115e59' }}>
                        <div style={{ fontWeight: '700', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Activity size={16} />
                          Supporting Voice / Acoustic Signals:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.5rem' }}>
                          <div>Speech Rate: <strong>{sahayaAssessment.voiceFeatures.speechRate}</strong></div>
                          <div>Pause Duration: <strong>{sahayaAssessment.voiceFeatures.pauseDuration}</strong></div>
                          <div>Pitch Variation: <strong>{sahayaAssessment.voiceFeatures.pitchVariation}</strong></div>
                          <div>Voice Activity: <strong>{sahayaAssessment.voiceFeatures.voiceActivity}</strong></div>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#0f766e', marginTop: '0.4rem', fontStyle: 'italic' }}>
                          *Supporting signals only. Voice features do not constitute clinical or diagnostic evidence.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 6: Recommended Support Engine */}
                  <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)' }}>
                        Recommended Support Engine
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                        AI recommendation — requires authorized human review
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {sahayaAssessment.recommendations?.map((rec, idx) => (
                        <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                              {rec.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              {rec.description}
                            </div>
                          </div>
                          <span className={`risk-badge ${rec.priority?.toLowerCase() || 'high'}`} style={{ fontSize: '0.7rem' }}>
                            {rec.priority || 'HIGH'}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Officer Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                      <button
                        className="font-btn"
                        onClick={() => { setReferralType('Counselling'); setShowReferralForm(true); setActiveTab('referrals'); }}
                        style={{ background: '#f0fdfa', color: 'var(--sahaya-teal-dark)', border: '1px solid var(--sahaya-teal-border)', fontWeight: '700' }}
                        id="btn-action-assign-counsellor"
                      >
                        <HeartHandshake size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Assign Counsellor
                      </button>

                      <button
                        className="font-btn"
                        onClick={() => { setReferralType('Legal Aid'); setShowReferralForm(true); setActiveTab('referrals'); }}
                        style={{ background: '#eff6ff', color: 'var(--nhaa-blue)', border: '1px solid var(--nhaa-blue-border)', fontWeight: '700' }}
                        id="btn-action-refer-legal"
                      >
                        <Scale size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Refer Legal Support
                      </button>

                      <button
                        className="font-btn"
                        onClick={() => { setReferralType('Safety'); setShowReferralForm(true); setActiveTab('referrals'); }}
                        style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', fontWeight: '700' }}
                        id="btn-action-safety-review"
                      >
                        <Shield size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Safety Review
                      </button>

                      <button
                        className="font-btn"
                        onClick={() => handleExecuteReview('Assigned to Active Case Officer')}
                        style={{ background: '#ffffff', color: 'var(--text-secondary)', border: '1px solid var(--border-light)' }}
                        id="btn-action-assign-officer"
                      >
                        <UserCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Assign Case Officer
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', background: '#f8fafc', borderRadius: '10px' }}>
                  <Shield size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem' }} />
                  <h4 style={{ color: 'var(--text-primary)' }}>Standard Grievance (Non-AI Intake)</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    The victim opted to continue grievance intake without SAHAYA AI assessment. Processing under standard statutory workflow.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Referrals & Actions */}
          {activeTab === 'referrals' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)' }}>
                  Support Referrals for Case {targetCase.id}
                </h4>
                <button
                  className="btn-sahaya-primary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                  onClick={() => setShowReferralForm(!showReferralForm)}
                  id="btn-add-referral-toggle"
                >
                  <Share2 size={15} />
                  <span>+ Create New Referral</span>
                </button>
              </div>

              {/* Referral Creation Form */}
              {showReferralForm && (
                <form onSubmit={handleCreateReferral} style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: '10px', padding: '1.25rem' }}>
                  <h5 style={{ fontWeight: '700', color: 'var(--sahaya-teal-dark)', marginBottom: '0.75rem' }}>
                    New Support Referral Details
                  </h5>

                  <div className="form-grid" style={{ marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label>Referral Service Type *</label>
                      <select value={referralType} onChange={(e) => setReferralType(e.target.value)} className="form-control" id="ref-type-select">
                        <option value="Counselling">Trauma & Psychosocial Counselling</option>
                        <option value="Legal Aid">Special PoA Legal Aid (DLSA)</option>
                        <option value="Medical">Medical Examination & Care</option>
                        <option value="Safety">Witness & Physical Protection Review</option>
                        <option value="Rehabilitation">Statutory Relief & Rehabilitation Grant</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Assigned Specialist / Organization *</label>
                      <select value={referralSpecialist} onChange={(e) => setReferralSpecialist(e.target.value)} className="form-control" id="ref-specialist-select">
                        <option value="Smt. Ananya Sharma (Trauma Cell)">Smt. Ananya Sharma (Trauma Cell)</option>
                        <option value="Adv. Prakash Rao (DLSA Legal Aid)">Adv. Prakash Rao (DLSA Legal Aid)</option>
                        <option value="District Medical Superintendent">District Medical Superintendent</option>
                        <option value="Nodal Police Liaison Cell">Nodal Police Liaison Cell</option>
                        <option value="District Welfare Officer (Relief Grant)">District Welfare Officer (Relief Grant)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Priority Level</label>
                      <select value={referralPriority} onChange={(e) => setReferralPriority(e.target.value)} className="form-control" id="ref-priority-select">
                        <option value="CRITICAL">Critical</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Case Officer Instructions</label>
                      <input
                        type="text"
                        value={referralNotes}
                        onChange={(e) => setReferralNotes(e.target.value)}
                        placeholder="Specific instructions or protective measures..."
                        className="form-control"
                        id="ref-notes-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button type="button" className="btn-track-action" onClick={() => setShowReferralForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-sahaya-primary" style={{ padding: '0.5rem 1.25rem' }} id="btn-save-referral">
                      Save Referral
                    </button>
                  </div>
                </form>
              )}

              {/* Referrals List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {targetCase.referrals?.length === 0 ? (
                  <div style={{ background: '#f8fafc', padding: '2rem', textAlign: 'center', borderRadius: '8px', color: 'var(--text-muted)' }}>
                    No referrals currently logged for this case. Use "+ Create New Referral" or the AI recommendation action buttons.
                  </div>
                ) : (
                  targetCase.referrals.map((refId, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>{refId}</span>
                          <span style={{ fontSize: '0.74rem', background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                            Active Referral
                          </span>
                        </div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                          Assigned to: <strong>{targetCase.assignedOfficer}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="risk-badge high" style={{ fontSize: '0.72rem' }}>In Progress</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Case Audit Timeline */}
          {activeTab === 'timeline' && (
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '1.25rem' }}>
                Chronological Case Event & Audit History
              </h4>

              <div className="timeline-list">
                {internalTimeline?.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-dot completed" />
                    <div className="timeline-time">{item.timestamp}</div>
                    <div className="timeline-title">{item.actor}</div>
                    <div className="timeline-desc">{item.action}</div>
                  </div>
                ))}
              </div>

              {/* Add Case Note Input */}
              <form onSubmit={handleAddNote} style={{ marginTop: '2rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Append Officer Case Note to Audit Log:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    required
                    value={newCaseNote}
                    onChange={(e) => setNewCaseNote(e.target.value)}
                    placeholder="Enter observation, telephonic update, or dispatch note..."
                    className="form-control"
                    id="case-note-input"
                  />
                  <button type="submit" className="btn-primary-action" style={{ padding: '0.55rem 1.25rem', flexDirection: 'row' }} id="btn-save-case-note">
                    <Send size={15} />
                    <span>Add Note</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* HUMAN-IN-THE-LOOP MANDATORY DECISION BOX (Sections 31 of Prompt) */}
          <div style={{ marginTop: '2rem', borderTop: '2px solid var(--border-light)', paddingTop: '1.5rem' }}>
            <div style={{ background: '#f0f7ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UserCheck size={20} color="var(--nhaa-blue)" />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>
                    Human-in-the-Loop Review Box
                  </h4>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <span>AI Assessment: <strong style={{ color: '#16a34a' }}>COMPLETED</strong></span> |
                  <span>Human Review: <strong style={{ color: humanReview?.status === 'COMPLETED' ? '#16a34a' : '#dc2626' }}>{humanReview?.status || 'PENDING'}</strong></span>
                </div>
              </div>

              {humanReview?.reviewedBy && (
                <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <strong>Prior Review Completed:</strong> By {humanReview.reviewedBy} at {humanReview.reviewedAt}. Decision: <em>{humanReview.decision}</em>.
                  {humanReview.officerNotes && <p style={{ marginTop: '0.2rem' }}>"{humanReview.officerNotes}"</p>}
                </div>
              )}

              {/* Action Buttons for Officer */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => handleExecuteReview('Confirm Priority')}
                  className="font-btn"
                  style={{ background: '#1e40af', color: '#ffffff', padding: '0.5rem 0.9rem', fontWeight: '700' }}
                  id="btn-hitl-confirm"
                >
                  <Check size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {t('officer.confirmPriority')}
                </button>

                <button
                  type="button"
                  onClick={() => handleExecuteReview('Modified Priority to High')}
                  className="font-btn"
                  style={{ background: '#ea580c', color: '#ffffff', padding: '0.5rem 0.9rem', fontWeight: '700' }}
                  id="btn-hitl-modify"
                >
                  {t('officer.modifyPriority')}
                </button>

                <button
                  type="button"
                  onClick={() => handleExecuteReview('Requested Supplementary Information')}
                  className="font-btn"
                  style={{ background: '#ffffff', color: 'var(--text-primary)', border: '1px solid var(--border-light)', padding: '0.5rem 0.9rem' }}
                  id="btn-hitl-more-info"
                >
                  {t('officer.requestMoreInfo')}
                </button>

                <button
                  type="button"
                  onClick={() => { setShowReferralForm(true); setActiveTab('referrals'); }}
                  className="font-btn"
                  style={{ background: '#0d9488', color: '#ffffff', padding: '0.5rem 0.9rem', fontWeight: '700' }}
                  id="btn-hitl-refer"
                >
                  <Share2 size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {t('officer.referSpecialist')}
                </button>

                <button
                  type="button"
                  onClick={() => handleExecuteReview('Close AI Flag')}
                  className="font-btn"
                  style={{ background: '#ffffff', color: '#64748b', border: '1px solid #cbd5e1', padding: '0.5rem 0.9rem' }}
                  id="btn-hitl-close-flag"
                >
                  {t('officer.closeAiFlag')}
                </button>
              </div>

              {/* Review Comment Input */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Official review findings, assessment rationale, or supervisory remarks..."
                  className="form-control"
                  style={{ fontSize: '0.85rem' }}
                  id="officer-review-remarks"
                />
                <button
                  type="button"
                  onClick={() => handleExecuteReview('Official Supervisory Review')}
                  className="btn-primary-action"
                  style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem', flexDirection: 'row' }}
                  id="btn-submit-review-log"
                >
                  Record Audit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-track-action" onClick={onClose} id="btn-close-dossier">
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
