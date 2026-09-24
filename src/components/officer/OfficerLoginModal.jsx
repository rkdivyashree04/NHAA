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
        style={{ padding: 0, overflow: 'hidden', maxWidth: '880px', background: '#ffffff' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', minHeight: '520px' }}>
          
          {/* LEFT: Clean Public-Service Illustration & Values (LIGHT Background as required) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)',
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '1px solid #bfdbfe'
            }}
          >
            <div>
              {/* Emblem / Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'var(--nhaa-blue)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', lineHeight: 1.1 }}>
                    NHAA
                  </h3>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--nhaa-blue)' }}>
                    National Helpline Against Atrocities
                  </div>
                </div>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginBottom: '0.75rem', lineHeight: '1.35' }}>
                AI-Assisted Victim Support and Vulnerability Assessment
              </h2>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
                Secure administrative case management portal for authorized Nodal Officers, Special PoA Advocates, and Certified Crisis Counsellors.
              </p>

              {/* Three Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  <div style={{ background: '#dbeafe', color: '#1e40af', padding: '0.3rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <span>Secure End-to-End Case Dossiers</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  <div style={{ background: '#ccfbf1', color: '#0f766e', padding: '0.3rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <span>Victim-Centred Trauma & SVI Triaging</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  <div style={{ background: '#dcfce7', color: '#166534', padding: '0.3rem', borderRadius: '50%' }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <span>Human-Supervised Decision Making</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid #bfdbfe', paddingTop: '1rem' }}>
              Department of Social Justice & Empowerment, Government of India
            </div>
          </div>

          {/* RIGHT: Clean White Login Card */}
          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#ffffff', position: 'relative' }}>
            <button
              onClick={onClose}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.4rem' }}
              aria-label="Close Login Modal"
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginBottom: '0.3rem' }}>
                {t('officer.loginTitle')}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                {t('officer.loginSubtitle')}
              </p>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.65rem 0.9rem', borderRadius: '6px', fontSize: '0.84rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>{t('officer.officialId')} *</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. selvam.nodal or OFF-1042"
                    className="form-control"
                    style={{ paddingLeft: '2.4rem' }}
                    id="login-username"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>{t('officer.password')} *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter official credentials"
                    className="form-control"
                    style={{ paddingLeft: '2.4rem', paddingRight: '2.4rem' }}
                    id="login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.84rem' }}>
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
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', flexDirection: 'row', justifyContent: 'center' }}
                id="btn-officer-signin"
              >
                <span>{t('officer.signIn')}</span>
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Quick Demo Switcher */}
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {t('officer.quickDemo')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {demoOfficers.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleQuickDemo(o.id)}
                    className="font-btn"
                    style={{ textAlign: 'left', padding: '0.4rem 0.6rem', fontSize: '0.76rem', background: '#f8fafc' }}
                  >
                    <strong>{o.name.split(' ')[0]}</strong> ({o.role})
                  </button>
                ))}
              </div>
            </div>

            {/* Confidential Security Notice */}
            <div style={{ marginTop: '1.25rem', fontSize: '0.74rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              {t('officer.confidentialNotice')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
