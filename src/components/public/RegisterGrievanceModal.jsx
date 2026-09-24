import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCases } from '../../context/CaseContext';
import { X, Sparkles, FileText, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export default function RegisterGrievanceModal({ isOpen, onClose, onStartSahayaWithData }) {
  const { t, victimLang } = useLanguage();
  const { addGrievance } = useCases();

  // Step 1: Grievance Form, Step 2: AI Option Choice, Step 3: Direct Registration Success
  const [step, setStep] = useState(1);
  const [createdCase, setCreatedCase] = useState(null);

  const [formData, setFormData] = useState({
    name: 'M. Muthukumar',
    age: '34',
    gender: 'Male',
    contact: '+91 94432 98765',
    state: 'Tamil Nadu',
    district: 'Salem',
    location: 'Valapady Panchayat',
    category: 'Physical Violence & Intimidation under PoA Act',
    incidentDate: '2026-09-22',
    description: 'அவர்கள் என்னையும் என் குடும்பத்தினரையும் அச்சுறுத்தியுள்ளனர். இந்த புகாரைத் தொடர்ந்தால் என்ன நடக்கும் என்று எனக்கு பயமாக இருக்கிறது. எங்கள் வீட்டை எரித்துவிடுவதாக எச்சரித்துள்ளனர். (They threatened my family and warned they will burn our house.)',
    supportingInfo: 'Previous representation submitted to District Collectorate; local village witnesses available.',
    preferredLang: victimLang || 'ta',
    preferredComm: 'Phone Call',
    channel: 'Web Portal'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueForm = (e) => {
    e.preventDefault();
    setStep(2); // Ask about SAHAYA AI Assessment
  };

  const handleContinueWithoutAI = () => {
    const newCase = addGrievance({
      victimData: {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        contact: formData.contact,
        state: formData.state,
        district: formData.district,
        location: formData.location,
        preferredLang: formData.preferredLang,
        preferredComm: formData.preferredComm
      },
      grievanceData: {
        category: formData.category,
        incidentDate: formData.incidentDate,
        description: formData.description,
        supportingInfo: formData.supportingInfo,
        channel: 'Web Portal'
      },
      sahayaData: null
    });

    setCreatedCase(newCase);
    setStep(3); // Success Screen
  };

  const handleStartSahaya = () => {
    onClose();
    onStartSahayaWithData({
      victimData: {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        contact: formData.contact,
        state: formData.state,
        district: formData.district,
        location: formData.location,
        preferredLang: formData.preferredLang,
        preferredComm: formData.preferredComm
      },
      grievanceData: {
        category: formData.category,
        incidentDate: formData.incidentDate,
        description: formData.description,
        supportingInfo: formData.supportingInfo,
        channel: 'Web Portal'
      }
    });
  };

  const resetAndClose = () => {
    setStep(1);
    setCreatedCase(null);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-card large" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h3>{t('grievance.title')}</h3>
            <p>{t('grievance.subtitle')}</p>
          </div>
          <button className="modal-close-btn" onClick={resetAndClose} aria-label="Close form">
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: Full Grievance Form */}
        {step === 1 && (
          <form onSubmit={handleContinueForm}>
            <div className="modal-body">
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.84rem', color: '#1e40af' }}>
                <strong>Statutory Safeguard:</strong> All information submitted is safeguarded under the SC & ST (PoA) Act Rules and accessed strictly by designated nodal personnel.
              </div>

              <div className="form-grid">
                {/* Victim Particulars */}
                <div className="form-group">
                  <label>{t('grievance.name')} *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    id="grievance-name"
                  />
                </div>

                <div className="form-group">
                  <label>{t('grievance.age')}</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-control"
                    id="grievance-age"
                  />
                </div>

                <div className="form-group">
                  <label>{t('grievance.gender')}</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="form-control" id="grievance-gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('grievance.contact')} *</label>
                  <input
                    type="tel"
                    required
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="form-control"
                    id="grievance-contact"
                  />
                </div>

                {/* Location Details */}
                <div className="form-group">
                  <label>{t('grievance.state')} *</label>
                  <select name="state" value={formData.state} onChange={handleChange} className="form-control" id="grievance-state">
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi (NCT)">Delhi (NCT)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('grievance.district')} *</label>
                  <input
                    type="text"
                    required
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="form-control"
                    id="grievance-district"
                  />
                </div>

                <div className="form-group form-full">
                  <label>{t('grievance.location')} *</label>
                  <input
                    type="text"
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Specific village, ward, street or landmark"
                    className="form-control"
                    id="grievance-location"
                  />
                </div>

                {/* Grievance Category & Incident Date */}
                <div className="form-group">
                  <label>{t('grievance.category')} *</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="form-control" id="grievance-category">
                    <option value="Physical Violence & Intimidation under PoA Act">Physical Violence & Intimidation under PoA Act</option>
                    <option value="Social & Economic Boycott">Social & Economic Boycott</option>
                    <option value="Land Alienation / Dispossession">Land Alienation / Dispossession</option>
                    <option value="Denial of Public Water / Amenities">Denial of Public Water / Amenities</option>
                    <option value="Verbal Abuse / Caste Slur in Public View">Verbal Abuse / Caste Slur in Public View</option>
                    <option value="Sexual Harassment / Gender Violence">Sexual Harassment / Gender Violence</option>
                    <option value="Cyber Harassment / Hate Content">Cyber Harassment / Hate Content</option>
                    <option value="Relief & DBT Grant Follow-up">Relief & DBT Grant Follow-up</option>
                    <option value="Other Statutory Grievance">Other Statutory Grievance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('grievance.incidentDate')} *</label>
                  <input
                    type="date"
                    required
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    className="form-control"
                    id="grievance-incidentDate"
                  />
                </div>

                {/* Incident Description */}
                <div className="form-group form-full">
                  <label>{t('grievance.incidentDesc')} *</label>
                  <textarea
                    rows={4}
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide complete facts of the incident, perpetrators (if known), and threats faced..."
                    className="form-control"
                    id="grievance-description"
                  />
                </div>

                <div className="form-group form-full">
                  <label>{t('grievance.supportingInfo')}</label>
                  <input
                    type="text"
                    name="supportingInfo"
                    value={formData.supportingInfo}
                    onChange={handleChange}
                    placeholder="Witness names, FIR / CSR number (if any), previous complaints"
                    className="form-control"
                    id="grievance-supportingInfo"
                  />
                </div>

                {/* Language & Communication Preference */}
                <div className="form-group">
                  <label>{t('grievance.preferredLang')}</label>
                  <select name="preferredLang" value={formData.preferredLang} onChange={handleChange} className="form-control" id="grievance-preferredLang">
                    <option value="ta">Tamil (தமிழ்)</option>
                    <option value="en">English</option>
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="te">Telugu (తెలుగు)</option>
                    <option value="kn">Kannada (ಕನ್ನಡ)</option>
                    <option value="ml">Malayalam (മലയാളം)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('grievance.preferredComm')}</label>
                  <select name="preferredComm" value={formData.preferredComm} onChange={handleChange} className="form-control" id="grievance-preferredComm">
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-track-action" onClick={resetAndClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary-action" style={{ padding: '0.75rem 1.6rem', flexDirection: 'row' }} id="btn-grievance-continue">
                <span>{t('grievance.continueBtn')}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Ask About AI-Assisted Assessment */}
        {step === 2 && (
          <div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ background: 'var(--sahaya-teal-subtle)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--sahaya-teal)' }}>
                <Sparkles size={32} />
              </div>

              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginBottom: '0.75rem' }}>
                {t('grievance.askAiTitle')}
              </h3>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                {t('grievance.askAiDesc')}
              </p>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', maxWidth: '580px', margin: '0 auto 2.5rem', textAlign: 'left', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <div style={{ fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldAlert size={16} color="var(--sahaya-teal)" />
                  Key Transparency Guarantees:
                </div>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <li>AI assessment is completely voluntary and optional.</li>
                  <li>Does not replace human review; all cases are assessed by human officers.</li>
                  <li>Not a medical or clinical diagnosis.</li>
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-sahaya-primary"
                  style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
                  onClick={handleStartSahaya}
                  id="btn-opt-in-sahaya"
                >
                  <Sparkles size={20} />
                  <span>{t('grievance.startSahaya')}</span>
                </button>

                <button
                  className="btn-track-action"
                  style={{ padding: '0.9rem 1.6rem', fontSize: '0.95rem' }}
                  onClick={handleContinueWithoutAI}
                  id="btn-opt-out-sahaya"
                >
                  <span>{t('grievance.skipSahaya')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Grievance Registered Success (Without AI) */}
        {step === 3 && createdCase && (
          <div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ background: '#f0fdf4', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#16a34a' }}>
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#166534', marginBottom: '0.5rem' }}>
                {t('grievance.successTitle')}
              </h3>

              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                {t('grievance.keepCaseId')}
              </p>

              <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '1.5rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t('grievance.caseId')}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', letterSpacing: '1px', marginTop: '0.2rem' }}>
                  {createdCase.id}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                  Reference: <strong>{createdCase.referenceNumber}</strong>
                </div>
              </div>

              <button className="btn-primary-action" style={{ margin: '0 auto', padding: '0.8rem 2rem' }} onClick={resetAndClose}>
                {t('grievance.close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
