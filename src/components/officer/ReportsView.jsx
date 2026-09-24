import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { FileSpreadsheet, Download, Printer, Filter, Calendar, FileText, CheckCircle2, Shield } from 'lucide-react';

export default function ReportsView({ onSelectCase }) {
  const { cases, referrals } = useCases();

  const [reportState, setReportState] = useState('ALL');
  const [reportRisk, setReportRisk] = useState('ALL');
  const [reportTimeframe, setReportTimeframe] = useState('month');
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Filter cases for report
  const reportCases = cases.filter(c => {
    if (reportRisk !== 'ALL' && c.sahayaAssessment?.riskCategory !== reportRisk) return false;
    if (reportState !== 'ALL' && c.victim.state !== reportState) return false;
    return true;
  });

  const handleExportCSV = () => {
    // Generate clean CSV representation
    const headers = ['Case ID', 'Date', 'Channel', 'State', 'District', 'Category', 'SVI', 'Risk Tier', 'Assigned Officer', 'Status'];
    const rows = reportCases.map(c => [
      c.id,
      c.date,
      c.channel,
      c.victim.state,
      c.victim.district,
      `"${c.grievance.category}"`,
      c.sahayaAssessment?.svi ?? 'N/A',
      c.sahayaAssessment?.riskCategory ?? 'LOW',
      c.assignedOfficer,
      c.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NHAA_Statutory_Report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>
            Statutory Reports & Nodal Dossiers
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Generate executive compliance summaries for the Ministry of Social Justice & Empowerment, State Nodal Officers, and DLSA Cells.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            className="font-btn"
            style={{ padding: '0.5rem 1rem', background: '#ffffff', color: 'var(--nhaa-blue)', border: '1px solid var(--nhaa-blue-border)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}
            onClick={() => setShowPrintModal(true)}
            id="btn-print-preview"
          >
            <Printer size={16} />
            <span>Printable Summary</span>
          </button>

          <button
            className="btn-primary-action"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem', flexDirection: 'row' }}
            onClick={handleExportCSV}
            id="btn-export-csv"
          >
            <Download size={16} />
            <span>Export CSV Dataset</span>
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <div className="data-table-card" style={{ padding: '1.25rem' }}>
        <h4 style={{ fontSize: '0.94rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Filter size={16} />
          Report Parameters & Scope
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label style={{ fontSize: '0.82rem' }}>State Jurisdiction</label>
            <select value={reportState} onChange={(e) => setReportState(e.target.value)} className="form-control" id="rep-state-select">
              <option value="ALL">All States / UTs</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '0.82rem' }}>SVI Risk Tier</label>
            <select value={reportRisk} onChange={(e) => setReportRisk(e.target.value)} className="form-control" id="rep-risk-select">
              <option value="ALL">All Tiers (Low to Critical)</option>
              <option value="CRITICAL">Critical Only (SVI 75+)</option>
              <option value="HIGH">High Risk (SVI 50-74)</option>
              <option value="MODERATE">Moderate Risk (SVI 25-49)</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ fontSize: '0.82rem' }}>Time Period</label>
            <select value={reportTimeframe} onChange={(e) => setReportTimeframe(e.target.value)} className="form-control" id="rep-time-select">
              <option value="month">Current Month (September 2026)</option>
              <option value="quarter">Q3 2026 (Jul - Sep)</option>
              <option value="year">Annual Statutory Dossier 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generated Report Summary Table */}
      <div className="data-table-card">
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
          <span style={{ fontWeight: '700', fontSize: '0.92rem' }}>
            Matching Report Cases ({reportCases.length} records)
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Generated for: Department of Social Justice & Empowerment
          </span>
        </div>

        <div className="table-responsive">
          <table className="custom-table" aria-label="Report Data Table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Lodged Date</th>
                <th>State / District</th>
                <th>Statutory Grievance Category</th>
                <th>SVI</th>
                <th>Risk Tier</th>
                <th>Assigned Officer</th>
                <th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              {reportCases.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: '700', color: 'var(--nhaa-blue)' }}>{c.id}</td>
                  <td style={{ fontSize: '0.82rem' }}>{c.date}</td>
                  <td style={{ fontSize: '0.84rem' }}>{c.victim.district}, {c.victim.state}</td>
                  <td style={{ fontSize: '0.84rem', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.grievance.category}
                  </td>
                  <td style={{ fontWeight: '800', color: c.sahayaAssessment?.riskColor }}>
                    {c.sahayaAssessment?.svi ?? '—'}
                  </td>
                  <td>
                    <span className={`risk-badge ${c.sahayaAssessment?.riskCategory?.toLowerCase() || 'low'}`}>
                      {c.sahayaAssessment?.riskCategory || 'LOW'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.84rem' }}>{c.assignedOfficer}</td>
                  <td style={{ fontSize: '0.82rem' }}>
                    {c.humanReview?.status === 'COMPLETED' ? 'Human Review Executed' : 'Awaiting Nodal Review'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Preview Modal */}
      {showPrintModal && (
        <div className="modal-backdrop" onClick={() => setShowPrintModal(false)}>
          <div className="modal-card large" onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', color: '#000000' }}>
            <div className="modal-header" style={{ borderBottom: '2px solid #000' }}>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Government of India — Ministry of Social Justice & Empowerment
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '0.2rem' }}>
                  National Helpline Against Atrocities (NHAA) + SAHAYA
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#444' }}>
                  Statutory Grievance & Vulnerability Summary Dossier — September 2026
                </div>
              </div>
            </div>

            <div className="modal-body" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', border: '1px solid #ccc', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px' }}>
                <div><strong>Total Grievances:</strong> {reportCases.length}</div>
                <div><strong>Critical SVI Cases:</strong> {reportCases.filter(c => c.sahayaAssessment?.riskCategory === 'CRITICAL').length}</div>
                <div><strong>Support Referrals:</strong> {referrals.length}</div>
              </div>

              <h4 style={{ fontWeight: '700', marginBottom: '0.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.25rem' }}>
                Active High-Priority Cases Under PoA / PCR Act:
              </h4>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                <thead>
                  <tr style={{ background: '#eee', textAlign: 'left' }}>
                    <th style={{ padding: '6px', border: '1px solid #ccc' }}>Case ID</th>
                    <th style={{ padding: '6px', border: '1px solid #ccc' }}>Jurisdiction</th>
                    <th style={{ padding: '6px', border: '1px solid #ccc' }}>Category</th>
                    <th style={{ padding: '6px', border: '1px solid #ccc' }}>SVI Score</th>
                    <th style={{ padding: '6px', border: '1px solid #ccc' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportCases.slice(0, 8).map(c => (
                    <tr key={c.id}>
                      <td style={{ padding: '6px', border: '1px solid #ccc', fontWeight: '700' }}>{c.id}</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{c.victim.district}, {c.victim.state}</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{c.grievance.category}</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{c.sahayaAssessment?.svi ?? '—'}</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ borderTop: '1px solid #ccc', paddingTop: '1rem', fontSize: '0.78rem', color: '#555', textAlign: 'center' }}>
                *This document is generated for administrative review under statutory rules. Demonstration thresholds are non-diagnostic.
              </div>
            </div>

            <div className="modal-footer" style={{ borderTop: '1px solid #ccc' }}>
              <button className="btn-track-action" onClick={() => setShowPrintModal(false)}>
                Close Preview
              </button>
              <button className="btn-primary-action" style={{ padding: '0.5rem 1.4rem' }} onClick={() => window.print()}>
                <Printer size={16} />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
