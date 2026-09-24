import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Lock, User, Eye, EyeOff, CheckCircle2, ArrowRight, X, AlertCircle } from 'lucide-react';

export default function OfficerLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { login, loginAsDemo, demoOfficers } = useAuth();
  const { t } = useLanguage();

  const [username, setUsername] = useState('selvam.nodal');
  const [password, setPassword] = useState('officer@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please provide Official ID and password.');
      return;
    }

    const res = login(username, password);
    if (res.success) {
      onLoginSuccess();
      onClose();
    }
  };

  const handleQuickDemo = (officerId) => {
    const res = loginAsDemo(officerId);
    if (res?.success) {
      onLoginSuccess();
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card wide"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0, maxWidth: '880px', background: '#ffffff', maxHeight: 'calc(100vh - 2.5rem)', overflowY: 'auto' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', minHeight: '480px' }}>
          
          {/* LEFT: Clean Public-Service Illustration & Values (LIGHT Background as required) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '1px solid #bfdbfe'
            }}
          >
            <div>
              {/* Emblem / Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--nhaa-blue)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', lineHeight: 1.1 }}>
                    NHAA
                  </h3>
                  <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--nhaa-blue)' }}>
                    National Helpline Against Atrocities
                  </div>
                </div>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginBottom: '0.65rem', lineHeight: '1.3' }}>
                AI-Assisted Victim Support and Vulnerability Assessment
              </h2>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                Secure administrative case management portal for authorized Nodal Officers, Special PoA Advocates, and Certified Crisis Counsellors.
              </p>

              {/* Three Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  <div style={{ background: '#dbeafe', color: '#1e40af', padding: '0.25rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={15} />
                  </div>
                  <span>Secure End-to-End Case Dossiers</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  <div style={{ background: '#ccfbf1', color: '#0f766e', padding: '0.25rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={15} />
                  </div>
                  <span>Victim-Centred Trauma & SVI Triaging</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  <div style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={15} />
                  </div>
                  <span>Human-Supervised Decision Making</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid #bfdbfe', paddingTop: '0.85rem', marginTop: '1.25rem' }}>
              Department of Social Justice & Empowerment, Government of India
            </div>
          </div>

          {/* RIGHT: Clean White Login Card */}
          <div style={{ padding: '2rem 2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#ffffff', position: 'relative' }}>
            <button
              onClick={onClose}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.4rem' }}
              aria-label="Close Login Modal"
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: '1.1rem' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginBottom: '0.25rem' }}>
                {t('officer.loginTitle')}
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                {t('officer.loginSubtitle')}
              </p>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.55rem 0.8rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '600' }}>{t('officer.officialId')} *</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. selvam.nodal or OFF-1042"
                    className="form-control"
                    style={{ paddingLeft: '2.3rem', paddingBlock: '0.55rem', fontSize: '0.88rem' }}
                    id="login-username"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '600' }}>{t('officer.password')} *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter official credentials"
                    className="form-control"
                    style={{ paddingLeft: '2.3rem', paddingRight: '2.4rem', paddingBlock: '0.55rem', fontSize: '0.88rem' }}
                    id="login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem', fontSize: '0.82rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>{t('officer.rememberMe')}</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('For credential recovery, contact the State Nodal IT Cell at 14566.'); }} style={{ color: 'var(--nhaa-blue)', fontWeight: '600' }}>
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn-primary-action"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', flexDirection: 'row', justifyContent: 'center' }}
                id="btn-officer-signin"
              >
                <span>{t('officer.signIn')}</span>
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Quick Demo Switcher */}
            <div style={{ marginTop: '1.1rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
                {t('officer.quickDemo')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {demoOfficers.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleQuickDemo(o.id)}
                    className="font-btn"
                    style={{ textAlign: 'left', padding: '0.45rem 0.65rem', fontSize: '0.76rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                  >
                    <strong style={{ color: 'var(--nhaa-blue-dark)' }}>{o.name.split(' ')[0]}</strong> ({o.role})
                  </button>
                ))}
              </div>
            </div>

            {/* Confidential Security Notice */}
            <div style={{ marginTop: '0.85rem', fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              {t('officer.confidentialNotice')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
