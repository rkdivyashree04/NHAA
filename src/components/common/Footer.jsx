import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenGrievance, onOpenRescue, onOpenTrack, onOpenSahaya }) {
  const { t } = useLanguage();

  return (
    <footer style={{ background: '#0f2d59', color: '#e2e8f0', marginTop: 'auto', borderTop: '4px solid #1e40af' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 2rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          {/* Col 1: About NHAA */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Shield size={24} color="#60a5fa" />
              <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '800' }}>NHAA + SAHAYA</h4>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              National Helpline Against Atrocities (NHAA) operates under the statutory mandate of the Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, 1989 and Protection of Civil Rights Act, 1955.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: '600' }}>Toll-Free Helpline:</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#60a5fa' }}>14566 (24x7)</div>
            </div>
          </div>

          {/* Col 2: Core Platform Services */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', borderBottom: '2px solid #1e40af', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Services & Portals
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li>
                <button onClick={onOpenGrievance} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}>
                  → {t('nav.registerGrievance')}
                </button>
              </li>
              <li>
                <button onClick={onOpenRescue} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit', fontWeight: '600' }}>
                  → {t('nav.registerRescue')} (Emergency)
                </button>
              </li>
              <li>
                <button onClick={onOpenTrack} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}>
                  → {t('nav.trackGrievance')}
                </button>
              </li>
              <li>
                <button onClick={onOpenSahaya} style={{ background: 'none', border: 'none', color: '#99f6e4', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit', fontWeight: '600' }}>
                  → {t('nav.sahayaSupport')} (AI-Assisted)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory References */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', borderBottom: '2px solid #1e40af', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Statutory Framework
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem', color: '#94a3b8' }}>
              <li>• SC & ST (Prevention of Atrocities) Act, 1989</li>
              <li>• PoA Amendment Rules, 2016 (Relief Norms)</li>
              <li>• Protection of Civil Rights Act, 1955</li>
              <li>• District Nodal Officers & Special Courts</li>
              <li>• DLSA Free Legal Aid Mandate</li>
            </ul>
          </div>

          {/* Col 4: Public Contact & Safeguards */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', borderBottom: '2px solid #1e40af', paddingBottom: '0.4rem', display: 'inline-block' }}>
              Official Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="#60a5fa" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Department of Social Justice & Empowerment, Shastri Bhawan, New Delhi - 110001</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#60a5fa" />
                <span>IVR / SMS / WhatsApp: 14566</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#60a5fa" />
                <span>support.nhaa@dosje.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Administrative Disclaimer & Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
          <div>
            © 2026 Department of Social Justice & Empowerment, Ministry of Social Justice & Empowerment, Government of India.
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>Privacy Policy</span> | <span>Terms of Service</span> | <span>Audit & Compliance</span> | <span>Hyperlinking Policy</span>
          </div>
        </div>

        <div style={{ marginTop: '0.75rem', fontSize: '0.76rem', color: '#64748b', textAlign: 'center' }}>
          {t('app.demoNotice')} — Official Reference Architecture for Public Grievance Redressal
        </div>
      </div>
    </footer>
  );
}
