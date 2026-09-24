import React from 'react';
import { useCases } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import PriorityCaseTable from './PriorityCaseTable';
import ReferralManagement from './ReferralManagement';
import AnalyticsView from './AnalyticsView';
import ReportsView from './ReportsView';
import SettingsView from './SettingsView';
import {
  FolderKanban,
  AlertTriangle,
  Flame,
  ShieldCheck,
  UserCheck,
  Activity,
  Layers
} from 'lucide-react';

export default function OfficerDashboard({
  activeNav,
  onSelectCase,
  onOpenProfileSetup
}) {
  const { cases, referrals, stats } = useCases();
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2rem 1.5rem', flex: 1, width: '100%' }}>
      {/* 1. DASHBOARD VIEW */}
      {activeNav === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Header Title & Notice */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', lineHeight: 1.2 }}>
                {t('officer.dashboardTitle')}
              </h1>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Victim-Centred Case Prioritization, Human-in-the-Loop Supervision & DLSA Coordination
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <strong>Notice:</strong> {t('officer.demoDataNotice')}
            </div>
          </div>

          {/* Top Summary Cards (Sections 26 of prompt) */}
          <div className="summary-cards-grid">
            {/* Total Cases */}
            <div className="summary-card">
              <div className="summary-card-header">
                <span className="summary-card-label">{t('officer.summaryTotal')}</span>
                <FolderKanban size={18} color="var(--nhaa-blue)" />
              </div>
              <div className="summary-card-val">1,284</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>All-India Nodal Registry</div>
            </div>

            {/* Critical */}
            <div className="summary-card critical">
              <div className="summary-card-header">
                <span className="summary-card-label" style={{ color: '#b91c1c' }}>{t('officer.summaryCritical')} (SVI 75-100)</span>
                <Flame size={18} color="#dc2626" />
              </div>
              <div className="summary-card-val">18</div>
              <div style={{ fontSize: '0.72rem', color: '#b91c1c', fontWeight: '600' }}>Immediate Action Queue</div>
            </div>

            {/* High */}
            <div className="summary-card high">
              <div className="summary-card-header">
                <span className="summary-card-label" style={{ color: '#c2410c' }}>{t('officer.summaryHigh')} (SVI 50-74)</span>
                <AlertTriangle size={18} color="#ea580c" />
              </div>
              <div className="summary-card-val">94</div>
              <div style={{ fontSize: '0.72rem', color: '#c2410c' }}>Priority Investigation</div>
            </div>

            {/* Moderate */}
            <div className="summary-card moderate">
              <div className="summary-card-header">
                <span className="summary-card-label" style={{ color: '#b45309' }}>{t('officer.summaryModerate')} (SVI 25-49)</span>
                <Activity size={18} color="#d97706" />
              </div>
              <div className="summary-card-val">321</div>
              <div style={{ fontSize: '0.72rem', color: '#b45309' }}>Active Review Queue</div>
            </div>

            {/* Low */}
            <div className="summary-card low">
              <div className="summary-card-header">
                <span className="summary-card-label" style={{ color: '#15803d' }}>{t('officer.summaryLow')} (SVI 0-24)</span>
                <ShieldCheck size={18} color="#16a34a" />
              </div>
              <div className="summary-card-val">851</div>
              <div style={{ fontSize: '0.72rem', color: '#15803d' }}>Standard Verification</div>
            </div>

            {/* Pending Human Review */}
            <div className="summary-card review" style={{ borderLeft: '4px solid var(--nhaa-blue)' }}>
              <div className="summary-card-header">
                <span className="summary-card-label" style={{ color: 'var(--nhaa-blue)' }}>{t('officer.summaryReview')}</span>
                <UserCheck size={18} color="var(--nhaa-blue)" />
              </div>
              <div className="summary-card-val">42</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--nhaa-blue)', fontWeight: '700' }}>Human-in-the-Loop</div>
            </div>
          </div>

          {/* Priority Case Table */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>
                {t('officer.priorityCases')}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Sorted by SVI triage score & immediate safety flags
              </span>
            </div>

            <PriorityCaseTable onSelectCase={onSelectCase} initialRiskFilter="ALL" />
          </div>
        </div>
      )}

      {/* 2. CASES VIEW */}
      {activeNav === 'cases' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>
              NHAA Grievance Management Registry
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              Full database of registered atrocity grievances under Scheduled Castes and Scheduled Tribes (PoA) Act & PCR Act.
            </p>
          </div>

          <PriorityCaseTable onSelectCase={onSelectCase} initialRiskFilter="ALL" />
        </div>
      )}

      {/* 3. SAHAYA SPECIFIC VIEW */}
      {activeNav === 'sahaya' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: '12px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--sahaya-teal-dark)', marginBottom: '0.35rem' }}>
              SAHAYA AI Vulnerability Assessment Registry
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#115e59', maxWidth: '820px', lineHeight: '1.6' }}>
              Showing only cases where victims provided voluntary consent for multimodal linguistic and acoustic analysis. Authorized nodal officers must independently review each SVI score before making case decisions.
            </p>
          </div>

          <PriorityCaseTable onSelectCase={onSelectCase} initialRiskFilter="CRITICAL" />
        </div>
      )}

      {/* 4. REFERRALS VIEW */}
      {activeNav === 'referrals' && (
        <ReferralManagement onSelectCase={onSelectCase} />
      )}

      {/* 5. ANALYTICS VIEW */}
      {activeNav === 'analytics' && (
        <AnalyticsView />
      )}

      {/* 6. REPORTS VIEW */}
      {activeNav === 'reports' && (
        <ReportsView onSelectCase={onSelectCase} />
      )}

      {/* 7. SETTINGS VIEW */}
      {activeNav === 'settings' && (
        <SettingsView onOpenProfileSetup={onOpenProfileSetup} />
      )}
    </div>
  );
}
