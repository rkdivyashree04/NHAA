import React from 'react';
import { useCases } from '../../context/CaseContext';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { BarChart3, TrendingUp, Users, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

export default function AnalyticsView() {
  const { cases, referrals, stats } = useCases();

  // 1. Cases by Risk Category (Doughnut)
  const riskData = {
    labels: ['Critical (SVI 75-100)', 'High (SVI 50-74)', 'Moderate (SVI 25-49)', 'Low (SVI 0-24)'],
    datasets: [
      {
        data: [18, 94, 321, 851], // Realistic aggregate stats matching demo data
        backgroundColor: ['#dc2626', '#ea580c', '#d97706', '#16a34a'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  // 2. Cases by Channel (Bar)
  const channelData = {
    labels: ['14566 IVR Helpline', 'Web Portal', 'Chatbot Assistant', 'Mobile App', 'Emergency Rescue'],
    datasets: [
      {
        label: 'Intake Volume (Cases)',
        data: [612, 345, 182, 115, 30],
        backgroundColor: '#1e40af',
        borderRadius: 6
      }
    ]
  };

  // 3. Cases by Language (Bar)
  const languageData = {
    labels: ['Tamil', 'Hindi', 'English', 'Telugu', 'Kannada', 'Malayalam'],
    datasets: [
      {
        label: 'Cases Lodged',
        data: [420, 390, 210, 125, 84, 55],
        backgroundColor: '#0d9488',
        borderRadius: 6
      }
    ]
  };

  // 4. Response Time & Human Review Trend (Line)
  const responseTimeData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep 2026'],
    datasets: [
      {
        label: 'Critical Case First Contact (mins)',
        data: [28, 22, 19, 14, 11],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Avg Human Review Completed (hours)',
        data: [18, 14, 11, 7, 4.2],
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.05)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)' }}>
            Statutory Analytics & Grievance Redressal Intelligence
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Aggregated, de-identified operational metrics for national, state, and district administrative review.
          </p>
        </div>

        <div style={{ background: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-light)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Data Minimization: PII Excluded from Aggregate Views
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>
            <span>Total Intake</span>
            <Users size={16} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--nhaa-blue-dark)', margin: '0.25rem 0' }}>1,284</div>
          <div style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: '600' }}>↑ 12% across 28 States & UTs</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626', fontSize: '0.8rem', fontWeight: '600' }}>
            <span>Critical Triaged (SVI 75+)</span>
            <ShieldAlert size={16} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#dc2626', margin: '0.25rem 0' }}>18</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>100% under Nodal human review</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--sahaya-teal-dark)', fontSize: '0.8rem', fontWeight: '600' }}>
            <span>Support Referrals Created</span>
            <CheckCircle2 size={16} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--sahaya-teal)', margin: '0.25rem 0' }}>428</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Counselling, DLSA & Relief grants</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--nhaa-blue)', fontSize: '0.8rem', fontWeight: '600' }}>
            <span>Avg Escalation Response</span>
            <Clock size={16} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--nhaa-blue)', margin: '0.25rem 0' }}>11 min</div>
          <div style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: '600' }}>45% reduction from baseline</div>
        </div>
      </div>

      {/* Chart Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* Chart 1: Cases by Risk */}
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.25rem' }}>
            Cases by SVI Risk Tier
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Distribution across Administrative Demonstration Thresholds
          </p>
          <div style={{ maxHeight: '260px', display: 'flex', justifyContent: 'center' }}>
            <Doughnut
              data={riskData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
              }}
            />
          </div>
        </div>

        {/* Chart 2: Cases by Channel */}
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.25rem' }}>
            Intake Volume by Accessibility Channel
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Comparing 14566 IVR, Web Portal, Chatbot & Rescue Intakes
          </p>
          <div style={{ maxHeight: '260px' }}>
            <Bar
              data={channelData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>

        {/* Chart 3: Cases by Language */}
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.25rem' }}>
            Linguistic Distribution of Grievances
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Multi-lingual intake processing across prototype languages
          </p>
          <div style={{ maxHeight: '260px' }}>
            <Bar
              data={languageData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>

        {/* Chart 4: Response Time Trends */}
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--nhaa-blue-dark)', marginBottom: '0.25rem' }}>
            Operational Triaging & Response Trends
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Critical emergency contact time vs supervisory human review duration
          </p>
          <div style={{ maxHeight: '260px' }}>
            <Line
              data={responseTimeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
