import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Sparkles, AlertCircle, FileText, Search, UserCheck } from 'lucide-react';

export default function PublicNavbar({
  activeTab,
  setActiveTab,
  onOpenGrievance,
  onOpenRescue,
  onOpenTrack,
  onOpenSahaya,
  onOpenLogin
}) {
  const { t } = useLanguage();

  return (
    <nav className="public-navbar" aria-label="Main Navigation">
      <ul className="nav-links">
        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            role="button"
            tabIndex={0}
          >
            {t('nav.home')}
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === 'department' ? 'active' : ''}`}
            onClick={() => setActiveTab('department')}
            role="button"
            tabIndex={0}
          >
            {t('nav.department')}
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === 'associated' ? 'active' : ''}`}
            onClick={() => setActiveTab('associated')}
            role="button"
            tabIndex={0}
          >
            {t('nav.associatedOrganisations')}
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === 'offerings' ? 'active' : ''}`}
            onClick={() => setActiveTab('offerings')}
            role="button"
            tabIndex={0}
          >
            {t('nav.offerings')}
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
            role="button"
            tabIndex={0}
          >
            {t('nav.documents')}
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
            role="button"
            tabIndex={0}
          >
            {t('nav.eventsGallery')}
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`nav-link ${activeTab === 'connect' ? 'active' : ''}`}
            onClick={() => setActiveTab('connect')}
            role="button"
            tabIndex={0}
          >
            {t('nav.connect')}
          </span>
        </li>
        <li className="nav-item">
          <span
            className="nav-link sahaya-link"
            onClick={onOpenSahaya}
            role="button"
            tabIndex={0}
            title="AI-Assisted Victim Support & Vulnerability Assessment"
          >
            <Sparkles size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            {t('nav.sahayaSupport')}
          </span>
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0' }}>
        <button
          onClick={onOpenRescue}
          style={{
            background: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '0.35rem 0.8rem',
            fontSize: '0.82rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
          title="Immediate Emergency Assistance Intake"
        >
          <AlertCircle size={14} />
          {t('nav.registerRescue')}
        </button>

        <button onClick={onOpenLogin} className="nav-officer-btn">
          <UserCheck size={14} />
          {t('nav.officerLogin')}
        </button>
      </div>
    </nav>
  );
}
