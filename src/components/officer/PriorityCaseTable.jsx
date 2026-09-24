import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Filter, Eye, AlertTriangle, ShieldCheck, ArrowUpDown } from 'lucide-react';

export default function PriorityCaseTable({ onSelectCase, initialRiskFilter = 'ALL' }) {
  const { cases } = useCases();
  const { t } = useLanguage();

  const [riskFilter, setRiskFilter] = useState(initialRiskFilter);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cases
  const filteredCases = cases.filter(c => {
    // Risk filter
    const cRisk = c.sahayaAssessment?.riskCategory || 'LOW';
    if (riskFilter !== 'ALL' && cRisk !== riskFilter) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'REVIEW' && c.humanReview?.status !== 'PENDING') return false;
      if (statusFilter === 'ASSIGNED' && c.assignedOfficer === 'Unassigned') return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchName = c.victim?.name?.toLowerCase().includes(q);
      const matchDist = c.victim?.district?.toLowerCase().includes(q);
      const matchCat = c.grievance?.category?.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchDist && !matchCat) return false;
    }

    return true;
  });

  return (
    <div className="data-table-card">
      {/* Table Filter & Search Bar */}
      <div className="table-filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '260px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Case ID, Victim, District..."
              className="form-control"
              style={{ paddingLeft: '2rem', height: '36px', fontSize: '0.84rem' }}
              id="table-search-input"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={15} color="var(--text-muted)" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="font-btn"
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.82rem' }}
              id="table-risk-filter"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="CRITICAL">Critical (SVI 75-100)</option>
              <option value="HIGH">High (SVI 50-74)</option>
              <option value="MODERATE">Moderate (SVI 25-49)</option>
              <option value="LOW">Low (SVI 0-24)</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="font-btn"
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.82rem' }}
              id="table-status-filter"
            >
              <option value="ALL">All Statuses</option>
              <option value="REVIEW">Pending Human Review</option>
              <option value="ASSIGNED">Assigned Officer</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredCases.length}</strong> of {cases.length} cases
        </div>
      </div>

      {/* Responsive Case Table */}
      <div className="table-responsive">
        <table className="custom-table" aria-label="Priority Cases Table">
          <thead>
            <tr>
              <th>{t('officer.colCaseId')}</th>
              <th>{t('officer.colDate')}</th>
              <th>{t('officer.colChannel')}</th>
              <th>{t('officer.colLang')}</th>
              <th>{t('officer.colSvi')}</th>
              <th>{t('officer.colRisk')}</th>
              <th>{t('officer.colIndicators')}</th>
              <th>{t('officer.colOfficer')}</th>
              <th>{t('officer.colStatus')}</th>
              <th style={{ textAlign: 'right' }}>{t('officer.colAction')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No cases matching the current filters.
                </td>
              </tr>
            ) : (
              filteredCases.map((c) => {
                const svi = c.sahayaAssessment?.svi ?? 'N/A';
                const risk = c.sahayaAssessment?.riskCategory || 'LOW';
                const isReviewRequired = c.humanReview?.status === 'PENDING';

                // Extract Key Indicators summary
                const keyInds = c.sahayaAssessment?.explainability?.[0]
                  ? c.sahayaAssessment.explainability[0].replace('statements identified in victim narrative', '').trim()
                  : c.grievance.category;

                return (
                  <tr key={c.id} style={{ background: isReviewRequired && risk === 'CRITICAL' ? '#fffafb' : undefined }}>
                    <td style={{ fontWeight: '700', color: 'var(--nhaa-blue)' }}>
                      {c.id}
                      {c.sahayaAssessment?.safetyFlags?.immediateSafety && (
                        <span title="Urgent Safety Concern Flagged" style={{ marginLeft: '4px', verticalAlign: '-2px' }}>
                          ⚠️
                        </span>
                      )}
                    </td>

                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {c.date}
                    </td>

                    <td style={{ fontSize: '0.84rem' }}>
                      {c.channel}
                    </td>

                    <td style={{ fontSize: '0.84rem', textTransform: 'capitalize' }}>
                      {c.victim.preferredLang || 'en'}
                    </td>

                    <td style={{ fontWeight: '800', fontSize: '0.96rem' }}>
                      {svi !== 'N/A' ? (
                        <span style={{ color: c.sahayaAssessment?.riskColor }}>{svi}</span>
                      ) : (
                        <span style={{ color: 'var(--text-light)', fontWeight: 'normal' }}>—</span>
                      )}
                    </td>

                    <td>
                      <span className={`risk-badge ${risk.toLowerCase()}`}>
                        {risk}
                      </span>
                    </td>

                    <td style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {keyInds}
                    </td>

                    <td style={{ fontSize: '0.84rem', fontWeight: c.assignedOfficer === 'Unassigned' ? '600' : 'normal', color: c.assignedOfficer === 'Unassigned' ? '#b91c1c' : 'var(--text-primary)' }}>
                      {c.assignedOfficer}
                    </td>

                    <td>
                      {isReviewRequired ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#fee2e2', color: '#b91c1c', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.76rem', fontWeight: '700' }}>
                          <AlertTriangle size={12} />
                          Review Required
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.76rem', fontWeight: '600' }}>
                          <ShieldCheck size={12} />
                          {c.status}
                        </span>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => onSelectCase(c.id)}
                        className="font-btn"
                        style={{ background: '#ffffff', color: 'var(--nhaa-blue)', border: '1px solid var(--nhaa-blue-border)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem', fontWeight: '700' }}
                        id={`btn-view-${c.id}`}
                      >
                        <Eye size={14} />
                        <span>{t('officer.viewDetails')}</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
