import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Phone, Search, Globe, UserCheck, Shield, Eye } from 'lucide-react';

export default function GovernmentHeader({ onOpenLogin, onOpenGrievance, onOpenRescue, onOpenTrack, onOpenSahaya }) {
  const { t, victimLang, setVictimLang, languages, languageNames } = useLanguage();
  const { fontSize, setFontSize, highContrast, setHighContrast } = useTheme();
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <header className="gov-header-wrapper">
      {/* Official Tricolour Accent Line */}
      <div className="gov-tricolour-bar" />

      {/* Accessibility & Quick Utility Bar */}
      <div className="accessibility-bar">
        <div className="accessibility-links">
          <span>{t('app.government')}</span> | <span>{t('app.ministry')}</span>
        </div>

        <div className="accessibility-actions">
          {/* Font Size Accessibility Controls */}
          <div className="font-size-btns" title="Font Size Controls">
            <span style={{ fontSize: '0.75rem', marginRight: '4px' }}>Text:</span>
            <button
              className={`font-btn ${fontSize === 'normal' ? 'active' : ''}`}
              onClick={() => setFontSize('normal')}
              aria-label="Normal Font Size"
            >
              A
            </button>
            <button
              className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
              onClick={() => setFontSize('large')}
              aria-label="Large Font Size"
            >
              A+
            </button>
            <button
              className={`font-btn ${fontSize === 'larger' ? 'active' : ''}`}
              onClick={() => setFontSize('larger')}
              aria-label="Largest Font Size"
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            className="font-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '3px' }}
            onClick={() => setHighContrast(!highContrast)}
            title="Toggle High Contrast"
          >
            <Eye size={12} /> {highContrast ? 'Standard' : 'Contrast'}
          </button>

          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={13} style={{ color: 'var(--text-muted)' }} />
            <select
              value={victimLang}
              onChange={(e) => setVictimLang(e.target.value)}
              className="font-btn"
              style={{ cursor: 'pointer', padding: '0.15rem 0.4rem' }}
              aria-label="Select Language"
            >
              {languages.map((lng) => (
                <option key={lng} value={lng}>
                  {languageNames[lng]}
                </option>
              ))}
            </select>
          </div>

          {/* Officer Portal Link / User Status */}
          {isAuthenticated ? (
            <button
              onClick={onOpenLogin}
              className="font-btn"
              style={{ background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' }}
            >
              <UserCheck size={12} style={{ marginRight: '3px', verticalAlign: '-1px' }} />
              Officer Desk: {currentUser?.name?.split(' ')[0]}
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="font-btn"
              style={{ background: '#ffffff', color: '#1e40af', border: '1px solid #bfdbfe' }}
            >
              {t('nav.officerLogin')}
            </button>
          )}
        </div>
      </div>

      {/* Main Government Branding Header */}
      <div className="gov-main-header">
        <div className="gov-branding-group">
          {/* Emblem Badge */}
          <div className="gov-emblem" aria-hidden="true">
            <div className="gov-emblem-circle">
              <Shield size={20} color="#0f2d59" />
              <span>सत्यमेव जयते</span>
            </div>
          </div>

          <div className="gov-titles">
            <span className="gov-title-sup">{t('app.government')}</span>
            <span className="gov-title-dept">{t('app.ministry')}</span>
            <span className="gov-title-sub">{t('app.department')}</span>
          </div>
        </div>

        {/* 24x7 Toll Free Helpline Display */}
        <div className="gov-header-actions">
          <div className="helpline-badge">
            <Phone size={22} color="var(--nhaa-blue)" />
            <div>
              <div className="helpline-number">14566</div>
              <div className="helpline-sub">24x7 National Helpline Against Atrocities</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
