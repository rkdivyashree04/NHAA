import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import { Share2, Filter, Search, HeartHandshake, Scale, Shield, Activity, Plus, CheckCircle2, Clock } from 'lucide-react';

export default function ReferralManagement({ onSelectCase }) {
  const { referrals, updateReferralStatus, createReferral, cases } = useCases();
  const { t } = useLanguage();

  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  // New referral form state
  const [targetCaseId, setTargetCaseId] = useState(cases[0]?.id || 'NHAA-2026-1042');
  const [newType, setNewType] = useState('Counselling');
  const [newSpecialist, setNewSpecialist] = useState('Smt. Ananya Sharma (Trauma Cell)');
  const [newPriority, setNewPriority] = useState('HIGH');
  const [newNotes, setNewNotes] = useState('');

  const filteredReferrals = referrals.filter(r => {
    if (typeFilter !== 'ALL' && r.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!r.id.toLowerCase().includes(q) && !r.caseId.toLowerCase().includes(q) && !r.assignedSpecialist.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createReferral({
      caseId: targetCaseId,
      type: newType,
      assignedSpecialist: newSpecialist,
      priority: newPriority,
      notes: newNotes
    });
    setShowNewModal(false);
    setNewNotes('');
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'Counselling': return <HeartHandshake size={16} color="#0d9488" />;
      case 'Legal Aid': return <Scale size={16} color="#1d4ed8" />;
      case 'Safety': return <Shield size={16} color="#ea580c" />;
      case 'Medical': return <Activity size={16} color="#dc2626" />;
      default: return <Share2 size={16} color="#64748b" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header & Quick Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>
            {t('referrals.title')}
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Inter-agency victim support coordination, psychosocial trauma care, DLSA legal aid & witness protection.
          </p>
        </div>

        <button
          className="btn-sahaya-primary"
          style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}
          onClick={() => setShowNewModal(true)}
          id="btn-create-referral-header"
        >
          <Plus size={16} />
          <span>New Support Referral</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="data-table-card">
        <div className="table-filter-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '260px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Referral ID, Case ID, Specialist..."
                className="form-control"
                style={{ paddingLeft: '2rem', height: '36px', fontSize: '0.84rem' }}
                id="referral-search-input"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={15} color="var(--text-muted)" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="font-btn"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.82rem' }}
                id="ref-filter-type"
              >
                <option value="ALL">All Services</option>
                <option value="Counselling">Counselling</option>
                <option value="Legal Aid">Legal Aid</option>
                <option value="Medical">Medical Care</option>
                <option value="Safety">Safety & Witness Protection</option>
                <option value="Rehabilitation">Rehabilitation Grant</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="font-btn"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.82rem' }}
                id="ref-filter-status"
              >
                <option value="ALL">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Follow-up Required">Follow-up Required</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Total Referrals: <strong>{filteredReferrals.length}</strong>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="table-responsive">
          <table className="custom-table" aria-label="Support Referrals Table">
            <thead>
              <tr>
                <th>Referral ID</th>
                <th>Case ID</th>
                <th>Service Type</th>
                <th>Assigned Specialist</th>
                <th>Initiated Date</th>
                <th>Priority</th>
                <th>Current Status</th>
                <th>Update Status</th>
                <th style={{ textAlign: 'right' }}>Case Dossier</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No referrals match the current filters.
                  </td>
                </tr>
              ) : (
                filteredReferrals.map((ref) => (
                  <tr key={ref.id}>
                    <td style={{ fontWeight: '700', color: 'var(--nhaa-blue-dark)' }}>
                      {ref.id}
                    </td>

                    <td>
                      <button
                        onClick={() => onSelectCase(ref.caseId)}
                        style={{ background: 'none', border: 'none', color: 'var(--nhaa-blue)', fontWeight: '700', cursor: 'pointer', padding: 0 }}
                      >
                        {ref.caseId}
                      </button>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '600' }}>
                        {getIconForType(ref.type)}
                        <span>{ref.type}</span>
                      </div>
                    </td>

                    <td style={{ fontSize: '0.84rem' }}>
                      {ref.assignedSpecialist}
                    </td>

                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {ref.createdDate}
                    </td>

                    <td>
                      <span className={`risk-badge ${ref.priority?.toLowerCase() || 'high'}`} style={{ fontSize: '0.72rem' }}>
                        {ref.priority}
                      </span>
                    </td>

                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        fontSize: '0.76rem',
                        fontWeight: '700',
                        background: ref.status === 'Completed' ? '#dcfce7' : ref.status === 'Accepted' ? '#dbeafe' : ref.status === 'In Progress' ? '#fef3c7' : '#f1f5f9',
                        color: ref.status === 'Completed' ? '#166534' : ref.status === 'Accepted' ? '#1e40af' : ref.status === 'In Progress' ? '#92400e' : '#475569'
                      }}>
                        {ref.status}
                      </span>
                    </td>

                    <td>
                      <select
                        value={ref.status}
                        onChange={(e) => updateReferralStatus(ref.id, e.target.value, `Status updated by Officer`)}
                        className="font-btn"
                        style={{ fontSize: '0.78rem', padding: '0.25rem 0.45rem' }}
                        id={`update-status-${ref.id}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Follow-up Required">Follow-up Required</option>
                      </select>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => onSelectCase(ref.caseId)}
                        className="font-btn"
                        style={{ fontSize: '0.78rem' }}
                      >
                        View Case
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to Create New Referral */}
      {showNewModal && (
        <div className="modal-backdrop" onClick={() => setShowNewModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h3>Create New Support Referral</h3>
                <p>Link victim with specialized legal, trauma, or safety services.</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowNewModal(false)} aria-label="Close dialog">
                X
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Target Case ID *</label>
                    <select
                      value={targetCaseId}
                      onChange={(e) => setTargetCaseId(e.target.value)}
                      className="form-control"
                      id="new-ref-case-select"
                    >
                      {cases.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.id} — {c.victim.name} ({c.grievance.category.substring(0, 20)}...)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Referral Service Type *</label>
                    <select value={newType} onChange={(e) => setNewType(e.target.value)} className="form-control" id="new-ref-type">
                      <option value="Counselling">Trauma & Psychosocial Counselling</option>
                      <option value="Legal Aid">Special PoA Legal Aid (DLSA)</option>
                      <option value="Medical">Medical Examination & Care</option>
                      <option value="Safety">Witness & Physical Protection Review</option>
                      <option value="Rehabilitation">Statutory Relief & Rehabilitation Grant</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Assigned Specialist / Department *</label>
                    <select value={newSpecialist} onChange={(e) => setNewSpecialist(e.target.value)} className="form-control" id="new-ref-specialist">
                      <option value="Smt. Ananya Sharma (Trauma Cell)">Smt. Ananya Sharma (Trauma Cell)</option>
                      <option value="Adv. Prakash Rao (DLSA Legal Aid)">Adv. Prakash Rao (DLSA Legal Aid)</option>
                      <option value="District Medical Officer">District Medical Officer</option>
                      <option value="Nodal Police Protection Officer">Nodal Police Protection Officer</option>
                      <option value="District Welfare Officer">District Welfare Officer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Priority</label>
                    <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} className="form-control" id="new-ref-priority">
                      <option value="CRITICAL">Critical</option>
                      <option value="HIGH">High</option>
                      <option value="MEDIUM">Medium</option>
                    </select>
                  </div>

                  <div className="form-group form-full">
                    <label>Special Instructions & Protective Directives</label>
                    <input
                      type="text"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      placeholder="e.g. Schedule immediate trauma intake call, coordinate with DLSA panel advocate"
                      className="form-control"
                      id="new-ref-notes"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-track-action" onClick={() => setShowNewModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-sahaya-primary" style={{ padding: '0.6rem 1.4rem' }} id="btn-save-new-referral">
                  Create Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
