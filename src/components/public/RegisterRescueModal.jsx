import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCases } from '../../context/CaseContext';
import { X, AlertTriangle, Phone, ShieldAlert, CheckCircle2, Siren } from 'lucide-react';

export default function RegisterRescueModal({ isOpen, onClose }) {
  const { t, victimLang } = useLanguage();
  const { addRescue } = useCases();

  const [submittedCase, setSubmittedCase] = useState(null);
  const [formData, setFormData] = useState({
    location: 'Near Old Bus Stand, Ariyalur Main Road, Ariyalur District',
    nature: 'Imminent Physical Threat / Surrounded by Aggressors',
    contact: '+91 94421 55667',
    description: 'We are currently trapped inside our home. A hostile group has gathered outside issuing threats of violence and destruction. We need urgent protective rescue.',
    preferredLang: victimLang || 'ta'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = addRescue(formData);
    setSubmittedCase(created);
  };

  const handleHumanAssistance = () => {
    const created = addRescue({
      ...formData,
      nature: 'Emergency: Immediate Human Assistance Requested'
    });
    setSubmittedCase(created);
  };

  const resetAndClose = () => {
    setSubmittedCase(null);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header with Emergency Red/Amber Accents */}
        <div className="modal-header" style={{ background: '#fef2f2', borderBottom: '1px solid #fecaca' }}>
          <div className="modal-title-group">
            <h3 style={{ color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Siren size={22} color="#dc2626" />
              {t('rescue.title')}
            </h3>
            <p style={{ color: '#991b1b' }}>{t('rescue.subtitle')}</p>
          </div>
          <button className="modal-close-btn" onClick={resetAndClose} aria-label="Close rescue dialog">
            <X size={20} />
          </button>
        </div>

        {!submittedCase ? (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Immediate Message Banner */}
              <div style={{ background: '#dc2626', color: '#ffffff', padding: '0.9rem 1.25rem', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700', fontSize: '1.05rem' }}>
                <AlertTriangle size={24} />
                <span>"{t('rescue.immediateMessage')}"</span>
              </div>

              {/* Statutory Demonstration Notice */}
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#92400e' }}>
                <strong>Statutory Notice:</strong> {t('rescue.statutoryNotice')}
              </div>

              <div className="form-grid">
                <div className="form-group form-full">
                  <label>{t('rescue.location')} *</label>
                  <input
                    type="text"
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Provide specific village, address, landmark, or GPS coordinates"
                    className="form-control"
                    id="rescue-location"
                  />
                </div>

                <div className="form-group">
                  <label>{t('rescue.nature')} *</label>
                  <select name="nature" value={formData.nature} onChange={handleChange} className="form-control" id="rescue-nature">
                    <option value="Imminent Physical Threat / Surrounded by Aggressors">Imminent Physical Threat / Aggressors</option>
                    <option value="Unlawful Confinement / Blocked from Leaving">Unlawful Confinement / Blocked</option>
                    <option value="Mob Violence / Arson Threat">Mob Violence / Arson Threat</option>
                    <option value="Violent Eviction in Progress">Violent Eviction in Progress</option>
                    <option value="Immediate Medical & Protection Need">Immediate Medical & Protection Need</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('rescue.contact')} *</label>
                  <input
                    type="tel"
                    required
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Safe mobile number where officer can reach you"
                    className="form-control"
                    id="rescue-contact"
                  />
                </div>

                <div className="form-group form-full">
                  <label>{t('rescue.description')} *</label>
                  <textarea
                    rows={3}
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe immediate danger, number of aggressors, weapons (if visible), and children/elderly present..."
                    className="form-control"
                    id="rescue-description"
                  />
                </div>

                <div className="form-group">
                  <label>{t('rescue.preferredLang')}</label>
                  <select name="preferredLang" value={formData.preferredLang} onChange={handleChange} className="form-control" id="rescue-preferredLang">
                    <option value="ta">Tamil (தமிழ்)</option>
                    <option value="en">English</option>
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="te">Telugu (తెలుగు)</option>
                    <option value="kn">Kannada (ಕನ್ನಡ)</option>
                    <option value="ml">Malayalam (മലയാളം)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="btn-rescue-action"
                style={{ padding: '0.7rem 1.25rem', flexDirection: 'row', fontSize: '0.9rem' }}
                onClick={handleHumanAssistance}
                id="btn-rescue-human"
              >
                <Phone size={18} />
                <span>{t('rescue.humanBtn')}</span>
              </button>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" className="btn-track-action" onClick={resetAndClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-action"
                  style={{ background: '#dc2626', padding: '0.7rem 1.4rem', flexDirection: 'row' }}
                  id="btn-rescue-submit"
                >
                  <AlertTriangle size={18} />
                  <span>{t('rescue.submitBtn')}</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="modal-body" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <div style={{ background: '#fef2f2', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#dc2626' }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#b91c1c', marginBottom: '0.4rem' }}>
              Rescue Request Dispatched to Emergency Queue
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Case logged with simulated urgent escalation to the District Magistrate & Nodal Police Superintendent.
            </p>

            <div style={{ background: '#f8fafc', border: '2px dashed #fca5a5', borderRadius: '10px', padding: '1.25rem', maxWidth: '380px', margin: '0 auto 1.75rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Emergency Tracking ID</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#dc2626' }}>{submittedCase.id}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Status: <strong>Emergency Dispatch Queued</strong>
              </div>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.85rem', maxWidth: '440px', margin: '0 auto 1.5rem', fontSize: '0.82rem', color: '#1e40af' }}>
              Dial <strong>112 / 100</strong> immediately if you are under active assault or life-threatening attack.
            </div>

            <button className="btn-primary-action" style={{ margin: '0 auto', padding: '0.75rem 2rem' }} onClick={resetAndClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
