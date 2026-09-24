import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, PhoneCall, Scale, Users, ChevronDown, ChevronUp, BookOpen, Clock, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function InfoSections() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: 'What is the National Helpline Against Atrocities (NHAA)?',
      a: 'NHAA is a 24x7 toll-free helpline (14566) and web platform established by the Department of Social Justice & Empowerment, Government of India, to receive, register, and track grievances related to atrocities committed against members of Scheduled Castes and Scheduled Tribes under the PoA Act, 1989 and PCR Act, 1955.'
    },
    {
      q: 'What role does SAHAYA play in the NHAA platform?',
      a: 'SAHAYA is an AI-assisted vulnerability assessment module integrated directly inside NHAA. With victim consent, it analyzes narrative text and supporting voice signals to detect indicators of fear, threat, intimidation, and acute trauma. This produces an administrative Stress Vulnerability Index (SVI) that assists nodal officers in prioritizing immediate human intervention and relief.'
    },
    {
      q: 'Does SAHAYA make legal decisions or provide medical diagnoses?',
      a: 'No. SAHAYA strictly provides administrative triage indicators and recommendations for authorized human officers. It is never a medical or psychological diagnosis system, does not replace legal assessment by DLSA counsel, and never automatically dismisses or determines complaints.'
    },
    {
      q: 'Can a victim file a grievance without using SAHAYA AI assessment?',
      a: 'Yes, absolutely. AI assessment is entirely voluntary. Every victim has full autonomy to choose "Continue Without AI Assessment". All grievances receive statutory administrative processing regardless of whether AI assessment is enabled.'
    },
    {
      q: 'How does emergency rescue escalation work?',
      a: 'Through the "Register a Rescue" portal, individuals facing imminent threats can log immediate rescue requests. For prototype demonstration purposes, this triggers an urgent simulated escalation workflow to District Nodal Officers. For life-threatening emergencies, citizens must also dial 112 directly.'
    }
  ];

  return (
    <div className="info-sections-wrap">
      {/* Metrics Counter Strip (Explicitly labeled Demonstration Data) */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-light)', padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--nhaa-blue)', background: 'var(--nhaa-blue-subtle)', padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase' }}>
              System Demonstration Metrics
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginTop: '0.4rem' }}>
              Statutory Platform Performance Overview
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              (Fictional demonstration data for administrative workflow evaluation)
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>1,284</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Total Registered Cases</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>All-India Nodal Intake</div>
            </div>

            <div style={{ background: '#f0fdfa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #99f6e4', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--sahaya-teal)' }}>892</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--sahaya-teal-dark)' }}>SAHAYA Assessed Cases</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Consent-enabled intake</div>
            </div>

            <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fecaca', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#dc2626' }}>18</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#b91c1c' }}>Critical Risk Cases</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Urgent Human Review Queue</div>
            </div>

            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1d4ed8' }}>100%</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#1e40af' }}>Human Officer Oversight</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Zero automated denials</div>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory Mandate & Key Offerings */}
      <section style={{ padding: '3.5rem 2rem', background: '#f8fafc', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginBottom: '0.5rem' }}>
              Statutory Redressal & Victim Support
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto' }}>
              Empowering victims and vulnerable communities through accessible channels, legal safeguards, and rapid administrative coordination.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ background: '#eff6ff', color: 'var(--nhaa-blue)', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <PhoneCall size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.6rem' }}>
                Multi-Channel Accessibility
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Citizens can access the helpline via 24x7 toll-free IVR (14566), web portal, mobile app, and WhatsApp. Accessible in multiple Indian languages.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ background: '#f0fdfa', color: 'var(--sahaya-teal)', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Scale size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.6rem' }}>
                Statutory Relief & Legal Aid
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Seamless integration with District Legal Services Authorities (DLSA) for free legal representation, FIR filing assistance, and DBT relief disbursement tracking.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ background: '#fef3c7', color: '#b45309', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.6rem' }}>
                Trauma & Psychosocial Care
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                SAHAYA indicators guide timely referrals to certified counsellors, safe witness accommodations, and trauma stabilization resources for affected families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section style={{ padding: '3.5rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', marginBottom: '0.5rem' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Key information about grievance submission, SAHAYA AI assistance, and victim safeguards.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
                  background: activeFaq === idx ? '#f8fafc' : '#ffffff',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.15rem 1.25rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.96rem',
                    fontWeight: '700',
                    color: 'var(--nhaa-blue-dark)'
                  }}
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp size={18} color="var(--nhaa-blue)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </button>

                {activeFaq === idx && (
                  <div style={{ padding: '0 1.25rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.65', borderTop: '1px solid #f1f5f9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
