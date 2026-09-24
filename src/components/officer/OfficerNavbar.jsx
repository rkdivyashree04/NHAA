import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useCases } from '../../context/CaseContext';
import {
  Shield,
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  Share2,
  BarChart3,
  FileSpreadsheet,
  Bell,
  Globe,
  Sun,
  Moon,
  Laptop,
  User,
  Settings,
  LogOut,
  ChevronDown,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function OfficerNavbar({
  activeNav,
  setActiveNav,
  onOpenCase,
  onOpenPublicPortal
}) {
  const { currentUser, logout } = useAuth();
  const { officerLang, setOfficerLang, languages, languageNames, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useCases();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const handleSelectCaseFromNotif = (caseId, notifId) => {
    markNotificationRead(notifId);
    setShowNotifMenu(false);
    onOpenCase(caseId);
  };

  return (
    <header className="officer-nav-bar">
      {/* Brand & Platform Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div className="officer-brand">
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--nhaa-blue)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: '800', lineHeight: 1.1, color: 'var(--nhaa-blue-dark)' }}>
              NHAA
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Victim Support & Case Management
            </div>
          </div>
        </div>

        {/* Primary Officer Navigation Tabs */}
        <nav className="officer-menu-links" aria-label="Officer Navigation">
          <button
            className={`officer-menu-link ${activeNav === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveNav('dashboard')}
            id="nav-officer-dashboard"
          >
            <LayoutDashboard size={16} />
            <span>{t('nav.dashboard')}</span>
          </button>

          <button
            className={`officer-menu-link ${activeNav === 'cases' ? 'active' : ''}`}
            onClick={() => setActiveNav('cases')}
            id="nav-officer-cases"
          >
            <FolderKanban size={16} />
            <span>{t('nav.cases')}</span>
          </button>

          <button
            className={`officer-menu-link ${activeNav === 'sahaya' ? 'active' : ''}`}
            onClick={() => setActiveNav('sahaya')}
            id="nav-officer-sahaya"
            style={{ color: activeNav === 'sahaya' ? 'var(--sahaya-teal-dark)' : undefined }}
          >
            <Sparkles size={16} color="var(--sahaya-teal)" />
            <span>SAHAYA</span>
          </button>

          <button
            className={`officer-menu-link ${activeNav === 'referrals' ? 'active' : ''}`}
            onClick={() => setActiveNav('referrals')}
            id="nav-officer-referrals"
          >
            <Share2 size={16} />
            <span>{t('nav.referrals')}</span>
          </button>

          <button
            className={`officer-menu-link ${activeNav === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveNav('analytics')}
            id="nav-officer-analytics"
          >
            <BarChart3 size={16} />
            <span>{t('nav.analytics')}</span>
          </button>

          <button
            className={`officer-menu-link ${activeNav === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveNav('reports')}
            id="nav-officer-reports"
          >
            <FileSpreadsheet size={16} />
            <span>{t('nav.reports')}</span>
          </button>
        </nav>
      </div>

      {/* Right Controls */}
      <div className="officer-header-right">
        {/* Switch to Public NHAA Portal Link */}
        <button
          onClick={onOpenPublicPortal}
          className="font-btn"
          style={{ background: '#f8fafc', color: 'var(--nhaa-blue)', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem' }}
          title="Open Public NHAA Homepage"
        >
          <ExternalLink size={13} />
          <span>Public Portal</span>
        </button>

        {/* Independent Officer Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Globe size={15} color="var(--text-muted)" />
          <select
            value={officerLang}
            onChange={(e) => setOfficerLang(e.target.value)}
            className="font-btn"
            style={{ cursor: 'pointer', padding: '0.3rem 0.5rem', fontWeight: '600' }}
            title="Interface Language (Officer Only)"
            id="officer-language-select"
          >
            {languages.map((lng) => (
              <option key={lng} value={lng}>
                {languageNames[lng].split(' ')[0]}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={cycleTheme}
          className="font-btn"
          style={{ padding: '0.35rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          title={`Theme: ${theme.toUpperCase()} (Click to toggle)`}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Sun size={15} color="#d97706" /> : theme === 'dark' ? <Moon size={15} color="#3b82f6" /> : <Laptop size={15} />}
          <span style={{ fontSize: '0.74rem' }}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
        </button>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            style={{
              position: 'relative',
              background: showNotifMenu ? '#e2e8f0' : '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              padding: '0.45rem',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Notifications"
            id="officer-notifications-btn"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  borderRadius: '999px',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifMenu && (
            <div
              style={{
                position: 'absolute',
                top: '42px',
                right: '0',
                width: '320px',
                background: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.15)',
                border: '1px solid var(--border-light)',
                zIndex: 1000,
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                <span style={{ fontWeight: '700', fontSize: '0.88rem' }}>Alerts & Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    style={{ background: 'none', border: 'none', color: 'var(--nhaa-blue)', fontSize: '0.74rem', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => n.caseId && handleSelectCaseFromNotif(n.caseId, n.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid #f1f5f9',
                        cursor: n.caseId ? 'pointer' : 'default',
                        background: n.read ? '#ffffff' : '#f0f7ff',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: n.type === 'critical' ? '#dc2626' : n.type === 'high' ? '#ea580c' : 'var(--text-primary)' }}>
                          {n.title}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.time}</span>
                      </div>
                      <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: '1.35' }}>
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              background: '#f1f5f9',
              border: '1px solid var(--border-light)',
              borderRadius: '24px',
              padding: '0.25rem 0.65rem 0.25rem 0.35rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
            id="officer-profile-menu-btn"
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: currentUser?.avatarColor || 'var(--nhaa-blue)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {currentUser?.avatar || 'OF'}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {currentUser?.name?.split(' ')[0] || 'Officer'}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                {currentUser?.role || 'Nodal Officer'}
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: '44px',
                right: '0',
                width: '220px',
                background: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.15)',
                border: '1px solid var(--border-light)',
                zIndex: 1000,
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-light)', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {currentUser?.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {currentUser?.email}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--nhaa-blue)', fontWeight: '600', marginTop: '0.2rem' }}>
                  {currentUser?.department}
                </div>
              </div>

              <div style={{ padding: '0.35rem 0' }}>
                <button
                  onClick={() => { setShowProfileMenu(false); setActiveNav('settings'); }}
                  style={{ width: '100%', padding: '0.55rem 1rem', textAlign: 'left', background: 'none', border: 'none', fontSize: '0.84rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}
                >
                  <User size={15} />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => { setShowProfileMenu(false); setActiveNav('settings'); }}
                  style={{ width: '100%', padding: '0.55rem 1rem', textAlign: 'left', background: 'none', border: 'none', fontSize: '0.84rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}
                >
                  <Settings size={15} />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={() => { setShowProfileMenu(false); setActiveNav('settings'); }}
                  style={{ width: '100%', padding: '0.55rem 1rem', textAlign: 'left', background: 'none', border: 'none', fontSize: '0.84rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}
                >
                  <Shield size={15} />
                  <span>Privacy & Security</span>
                </button>

                <div style={{ height: '1px', background: 'var(--border-light)', margin: '0.35rem 0' }} />

                <button
                  onClick={() => { setShowProfileMenu(false); logout(); }}
                  style={{ width: '100%', padding: '0.55rem 1rem', textAlign: 'left', background: 'none', border: 'none', fontSize: '0.84rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626' }}
                  id="officer-logout-btn"
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
