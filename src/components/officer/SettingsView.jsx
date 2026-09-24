import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useCases } from '../../context/CaseContext';
import {
  User,
  Lock,
  Globe,
  Palette,
  Bell,
  Shield,
  Eye,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Save,
  Clock,
  Key,
  Laptop
} from 'lucide-react';

export default function SettingsView({ onOpenProfileSetup }) {
  const { currentUser } = useAuth();
  const { officerLang, setOfficerLang, languages, languageNames } = useLanguage();
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    density,
    setDensity
  } = useTheme();
  const { auditLogs } = useCases();

  const [activeSection, setActiveSection] = useState('profile');

  // Notifications toggles
  const [notifPrefs, setNotifPrefs] = useState({
    critical: true,
    high: true,
    assignment: true,
    referrals: true,
    followup: true,
    system: false
  });

  // AI Preferences
  const [aiEnabled, setAiEnabled] = useState(true);
  const [textMode, setTextMode] = useState(true);
  const [voiceMode, setVoiceMode] = useState(true);
  const [multilingualMode, setMultilingualMode] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const navItems = [
    { id: 'profile', label: '1. Profile', icon: <User size={16} /> },
    { id: 'account', label: '2. Account & Security', icon: <Lock size={16} /> },
    { id: 'language', label: '3. Interface Language', icon: <Globe size={16} /> },
    { id: 'appearance', label: '4. Appearance & Theme', icon: <Palette size={16} /> },
    { id: 'notifications', label: '5. Notifications', icon: <Bell size={16} /> },
    { id: 'privacy', label: '6. Privacy & Audit Logs', icon: <Shield size={16} /> },
    { id: 'accessibility', label: '7. Accessibility', icon: <Eye size={16} /> },
    { id: 'ai', label: '8. AI Preferences (SAHAYA)', icon: <Sparkles size={16} /> },
    { id: 'help', label: '9. Help & SOP Guidelines', icon: <HelpCircle size={16} /> }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', background: '#ffffff', borderRadius: '14px', border: '1px solid var(--border-light)', overflow: 'hidden', minHeight: '620px', boxShadow: 'var(--card-shadow)' }}>
      {/* LEFT: Settings Side Navigation */}
      <div style={{ background: '#f8fafc', borderRight: '1px solid var(--border-light)', padding: '1.5rem 1rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginBottom: '1.25rem', paddingLeft: '0.5rem' }}>
          Officer Settings
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: activeSection === item.id ? 'var(--nhaa-blue-subtle)' : 'transparent',
                color: activeSection === item.id ? 'var(--nhaa-blue)' : 'var(--text-secondary)',
                fontWeight: activeSection === item.id ? '700' : '500',
                fontSize: '0.85rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                transition: 'all 0.15s ease'
              }}
              id={`settings-tab-${item.id}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Active Settings Content */}
      <div style={{ padding: '2rem' }}>
        {savedSuccess && (
          <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '0.6rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <CheckCircle2 size={16} />
            <span>Settings saved successfully. Changes are persisted.</span>
          </div>
        )}

        {/* 1. PROFILE */}
        {activeSection === 'profile' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>Officer Profile</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Official credentials and territorial jurisdiction</p>
              </div>
              <button
                className="btn-primary-action"
                style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', flexDirection: 'row' }}
                onClick={onOpenProfileSetup}
                id="btn-edit-profile"
              >
                Edit Profile
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: currentUser?.avatarColor || 'var(--nhaa-blue)', color: '#ffffff', fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {currentUser?.avatar || 'OF'}
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)' }}>{currentUser?.name}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ID: <strong>{currentUser?.id}</strong> | Role: <strong>{currentUser?.role}</strong></div>
                <div style={{ fontSize: '0.8rem', color: 'var(--nhaa-blue)', fontWeight: '600' }}>{currentUser?.department}</div>
              </div>
            </div>

            <div className="form-grid" style={{ maxWidth: '680px' }}>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'block' }}>State Jurisdiction</span>
                <strong>{currentUser?.state}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'block' }}>District Jurisdiction</span>
                <strong>{currentUser?.district}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'block' }}>Official Email</span>
                <strong>{currentUser?.email}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'block' }}>Phone / Mobile</span>
                <strong>{currentUser?.phone}</strong>
              </div>
            </div>
          </div>
        )}

        {/* 2. ACCOUNT */}
        {activeSection === 'account' && (
          <div>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>Account & Authentication</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Security credentials and active sessions</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '640px' }}>
              <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Username / Official ID</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{currentUser?.username} ({currentUser?.id})</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Two-Factor Authentication (2FA)</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Required for accessing High & Critical risk dossiers</div>
                </div>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.76rem', fontWeight: '700' }}>
                  ACTIVE (NIC OTP)
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Active Sessions</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Current Browser Session: Windows 11 / Edge (Active now)</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Last authenticated: Today, 10:14 AM IST</div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button className="font-btn" onClick={() => alert('Password reset link sent to registered official NIC email.')} style={{ padding: '0.55rem 1.1rem' }}>
                  Change Password
                </button>
                <button className="font-btn" onClick={() => alert('Other remote sessions terminated.')} style={{ padding: '0.55rem 1.1rem' }}>
                  Sign Out Other Sessions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. LANGUAGE */}
        {activeSection === 'language' && (
          <div>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>Interface Language (Independent)</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Changing officer language updates dashboard UI strings without changing victim conversation language.
              </p>
            </div>

            <div style={{ maxWidth: '540px' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.85rem', marginBottom: '1.5rem', fontSize: '0.84rem', color: '#1e40af' }}>
                <strong>Key Architectural Guarantee:</strong> If a victim submits a grievance narrative in Tamil, and the Officer prefers English, the dashboard and controls display in English while preserving original Tamil testimony.
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>Select Officer Interface Language:</label>
                <select
                  value={officerLang}
                  onChange={(e) => { setOfficerLang(e.target.value); handleSaveSettings(); }}
                  className="form-control"
                  style={{ fontSize: '0.95rem', padding: '0.7rem' }}
                  id="settings-officer-lang"
                >
                  {languages.map((lng) => (
                    <option key={lng} value={lng}>
                      {languageNames[lng]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 4. APPEARANCE */}
        {activeSection === 'appearance' && (
          <div>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>Appearance & Theme</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                DEFAULT THEME IS LIGHT. Clean, trustworthy government palette.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '580px' }}>
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '0.5rem' }}>Theme Mode:</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setTheme('light')}
                    className="font-btn"
                    style={{
                      flex: 1,
                      padding: '0.85rem',
                      background: theme === 'light' ? '#eff6ff' : '#ffffff',
                      border: theme === 'light' ? '2px solid #1e40af' : '1px solid var(--border-light)',
                      color: theme === 'light' ? '#1e40af' : 'var(--text-primary)',
                      fontWeight: '700'
                    }}
                  >
                    ● Light (Default)
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className="font-btn"
                    style={{
                      flex: 1,
                      padding: '0.85rem',
                      background: theme === 'dark' ? '#1e293b' : '#ffffff',
                      border: theme === 'dark' ? '2px solid #60a5fa' : '1px solid var(--border-light)',
                      color: theme === 'dark' ? '#ffffff' : 'var(--text-primary)',
                      fontWeight: '700'
                    }}
                  >
                    ○ Dark (Optional)
                  </button>

                  <button
                    onClick={() => setTheme('system')}
                    className="font-btn"
                    style={{
                      flex: 1,
                      padding: '0.85rem',
                      background: theme === 'system' ? '#f1f5f9' : '#ffffff',
                      border: theme === 'system' ? '2px solid #334155' : '1px solid var(--border-light)',
                      fontWeight: '700'
                    }}
                  >
                    ○ System
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '0.5rem' }}>Layout Density:</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setDensity('comfortable')}
                    className="font-btn"
                    style={{ flex: 1, padding: '0.7rem', background: density === 'comfortable' ? '#eff6ff' : '#ffffff', border: density === 'comfortable' ? '2px solid #1e40af' : '1px solid var(--border-light)' }}
                  >
                    Comfortable (Standard)
                  </button>
                  <button
                    onClick={() => setDensity('compact')}
                    className="font-btn"
                    style={{ flex: 1, padding: '0.7rem', background: density === 'compact' ? '#eff6ff' : '#ffffff', border: density === 'compact' ? '2px solid #1e40af' : '1px solid var(--border-light)' }}
                  >
                    Compact (High Data Density)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. NOTIFICATIONS */}
        {activeSection === 'notifications' && (
          <div>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>Notification Toggles</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Configure high-urgency alerts and referral reminders</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '600px' }}>
              {[
                { key: 'critical', title: 'Critical Case Alerts (SVI 75-100)', desc: 'Immediate notification when an acute safety threat or SVI critical flag is registered' },
                { key: 'high', title: 'High-Risk Case Alerts (SVI 50-74)', desc: 'Alerts for elevated trauma, boycott, or intimidation cases' },
                { key: 'assignment', title: 'New Case Assignment', desc: 'Notify when a case is assigned to your officer desk' },
                { key: 'referrals', title: 'Referral Updates', desc: 'Updates from assigned counsellors, DLSA advocates, and medical superintendents' },
                { key: 'followup', title: 'Follow-up Reminders', desc: 'Reminders for 14-day statutory inquiry deadlines under PoA rules' },
                { key: 'system', title: 'System & Maintenance Notifications', desc: 'Administrative and operational maintenance messages' }
              ].map(n => (
                <div key={n.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{n.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{n.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifPrefs[n.key]}
                    onChange={(e) => setNotifPrefs(prev => ({ ...prev, [n.key]: e.target.checked }))}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                </div>
              ))}

              <button className="btn-primary-action" style={{ alignSelf: 'flex-start', padding: '0.65rem 1.4rem', marginTop: '0.5rem' }} onClick={handleSaveSettings}>
                Save Notification Preferences
              </button>
            </div>
          </div>
        )}

        {/* 6. PRIVACY & AUDIT LOGS */}
        {activeSection === 'privacy' && (
          <div>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>Privacy, Security & System Audit Trail</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Immutable log of officer reviews, case assignments, and AI assessments</p>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '1rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.94rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--nhaa-blue-dark)' }}>Recent System Audit Logs</h4>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                <table className="custom-table" style={{ fontSize: '0.8rem' }}>
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>User / Entity</th>
                      <th>Action</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td style={{ whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                        <td style={{ fontWeight: '700' }}>{log.user}</td>
                        <td style={{ color: 'var(--nhaa-blue)' }}>{log.action}</td>
                        <td>{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <strong>Data Minimization Policy:</strong> Sensitive victim testimony is strictly protected with role-based access control. Public endpoints never expose internal linguistic or acoustic scoring vectors.
            </div>
          </div>
        )}

        {/* 7. ACCESSIBILITY */}
        {activeSection === 'accessibility' && (
          <div>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>Accessibility Settings</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Compliance with GIGW (Guidelines for Indian Government Websites)</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '580px' }}>
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '0.5rem' }}>Font Scaling:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setFontSize('normal')} className={`font-btn ${fontSize === 'normal' ? 'active' : ''}`} style={{ flex: 1, padding: '0.6rem' }}>
                    Small / Standard (100%)
                  </button>
                  <button onClick={() => setFontSize('large')} className={`font-btn ${fontSize === 'large' ? 'active' : ''}`} style={{ flex: 1, padding: '0.6rem' }}>
                    Medium (110%)
                  </button>
                  <button onClick={() => setFontSize('larger')} className={`font-btn ${fontSize === 'larger' ? 'active' : ''}`} style={{ flex: 1, padding: '0.6rem' }}>
                    Large (120%)
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>High Contrast Palette</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Enhances text borders and contrast for low-vision readability</div>
                </div>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>Reduced Motion</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Disables transitions and canvas waveform animations</div>
                </div>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 8. AI PREFERENCES */}
        {activeSection === 'ai' && (
          <div>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>AI Preferences (SAHAYA Module)</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Administrative configuration of feature fusion and SVI thresholds</p>
            </div>

            <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: '800', color: 'var(--sahaya-teal-dark)', fontSize: '0.95rem' }}>
                    SAHAYA AI Assessment Status
                  </span>
                  <span style={{ background: aiEnabled ? '#dcfce7' : '#fee2e2', color: aiEnabled ? '#166534' : '#dc2626', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.76rem', fontWeight: '700' }}>
                    {aiEnabled ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#115e59' }}>
                  When enabled, victims can voluntarily opt into AI-assisted distress & trauma assessment during grievance intake.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.6rem' }}>Assessment Modes</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem' }}>
                    <input type="checkbox" checked={textMode} onChange={(e) => setTextMode(e.target.checked)} />
                    <span>Text NLP Analysis (Fear, Threat, Isolation, Safety Cues)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem' }}>
                    <input type="checkbox" checked={voiceMode} onChange={(e) => setVoiceMode(e.target.checked)} />
                    <span>Voice / Acoustic Analysis (Speech Rate, Pauses, Pitch Variation)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem' }}>
                    <input type="checkbox" checked={multilingualMode} onChange={(e) => setMultilingualMode(e.target.checked)} />
                    <span>Multilingual Cross-Linguistic Analysis (Tamil, Hindi, Telugu, Kannada, Malayalam)</span>
                  </label>
                </div>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#92400e', marginBottom: '0.4rem' }}>
                  Administrative SVI Threshold Calibration
                </div>
                <div style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: '1.5' }}>
                  {t('sahaya.sviThresholdNotice')}
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#92400e' }}>
                  • Low: 0–24 | Moderate: 25–49 | High: 50–74 | Critical: 75–100
                </div>
              </div>

              <button className="btn-sahaya-primary" style={{ alignSelf: 'flex-start', padding: '0.65rem 1.4rem' }} onClick={handleSaveSettings}>
                Save AI Configuration
              </button>
            </div>
          </div>
        )}

        {/* 9. HELP & SUPPORT */}
        {activeSection === 'help' && (
          <div>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>Help & SOP Guidelines</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Operational manuals for PoA / PCR statutory nodal officers</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '640px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.35rem' }}>
                  Standard Operating Procedure (SOP) for Critical Cases (SVI 75+)
                </h4>
                <p>
                  1. Designated Nodal Officer must review dossier within 2 hours of registration.<br />
                  2. Evaluate immediate physical safety and coordinate with District SP liaison cell.<br />
                  3. If physical danger exists, refer for Witness Protection Accommodation.<br />
                  4. Create DLSA advocacy referral for legal representation in Special PoA Court.<br />
                  5. Record all actions in the Case Dossier audit trail.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.35rem' }}>
                  Technical & Platform Support Desk
                </h4>
                <p>
                  Central Operations & Technology Cell, Department of Social Justice & Empowerment.<br />
                  Toll-Free Helpline: <strong>14566</strong> | Email: <strong>support.nhaa@dosje.gov.in</strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
