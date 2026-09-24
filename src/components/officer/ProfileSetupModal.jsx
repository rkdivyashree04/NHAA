import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { User, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProfileSetupModal({ isOpen, onClose }) {
  const { currentUser, updateProfile } = useAuth();
  const { officerLang, setOfficerLang, languages, languageNames } = useLanguage();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Dr. R. Selvam, IAS',
    id: currentUser?.id || 'OFF-1042',
    role: currentUser?.role || 'NHAA Officer',
    department: currentUser?.department || 'Directorate of Social Justice & Empowerment',
    state: currentUser?.state || 'Tamil Nadu',
    district: currentUser?.district || 'Chennai',
    phone: currentUser?.phone || '+91 94440 12345',
    email: currentUser?.email || 'selvam.r@dosje.gov.in',
    preferredLang: officerLang || 'en'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setOfficerLang(formData.preferredLang);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--nhaa-blue-dark)' }}>
              <Shield size={20} color="var(--nhaa-blue)" />
              WELCOME TO NHAA — Officer Profile Setup
            </h3>
            <p>Configure your administrative jurisdiction, credentials, and notification parameters.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  id="profile-name"
                />
              </div>

              <div className="form-group">
                <label>Official ID (Assigned) *</label>
                <input
                  type="text"
                  disabled
                  value={formData.id}
                  className="form-control"
                  style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
                  id="profile-id"
                />
              </div>

              <div className="form-group">
                <label>Administrative Role *</label>
                <select name="role" value={formData.role} onChange={handleChange} className="form-control" id="profile-role">
                  <option value="NHAA Officer">NHAA Officer</option>
                  <option value="Case Manager">Case Manager</option>
                  <option value="Counsellor">Counsellor</option>
                  <option value="Legal Support">Legal Support</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div className="form-group">
                <label>Department / Cell *</label>
                <input
                  type="text"
                  required
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-control"
                  id="profile-department"
                />
              </div>

              <div className="form-group">
                <label>State / UT *</label>
                <select name="state" value={formData.state} onChange={handleChange} className="form-control" id="profile-state">
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi (NCT)">Delhi (NCT)</option>
                </select>
              </div>

              <div className="form-group">
                <label>District Jurisdiction *</label>
                <input
                  type="text"
                  required
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="form-control"
                  id="profile-district"
                />
              </div>

              <div className="form-group">
                <label>Official Phone Number *</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  id="profile-phone"
                />
              </div>

              <div className="form-group">
                <label>Official NIC / Gov Email *</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  id="profile-email"
                />
              </div>

              <div className="form-group form-full">
                <label>Preferred Interface Language (Independent of Victim Conversation Language) *</label>
                <select
                  name="preferredLang"
                  value={formData.preferredLang}
                  onChange={handleChange}
                  className="form-control"
                  id="profile-lang"
                >
                  {languages.map((lng) => (
                    <option key={lng} value={lng}>
                      {languageNames[lng]}
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Officer interface language updates dashboard text without altering victim case statements.
                </span>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-primary-action" style={{ flexDirection: 'row', padding: '0.75rem 1.8rem' }} id="btn-save-profile">
              <CheckCircle2 size={18} />
              <span>Save & Continue to Dashboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
