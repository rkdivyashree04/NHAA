import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CaseProvider, useCases } from './context/CaseContext';

// Common Components
import GovernmentHeader from './components/common/GovernmentHeader';
import Footer from './components/common/Footer';

// Public Components
import PublicNavbar from './components/public/PublicNavbar';
import HeroSection from './components/public/HeroSection';
import SahayaSection from './components/public/SahayaSection';
import InfoSections from './components/public/InfoSections';
import RegisterGrievanceModal from './components/public/RegisterGrievanceModal';
import RegisterRescueModal from './components/public/RegisterRescueModal';
import TrackGrievanceModal from './components/public/TrackGrievanceModal';
import ChatbotWidget from './components/public/ChatbotWidget';

// SAHAYA Components
import SahayaConsentModal from './components/sahaya/SahayaConsentModal';
import SahayaVictimInterface from './components/sahaya/SahayaVictimInterface';
import SahayaResultModal from './components/sahaya/SahayaResultModal';

// Officer Components
import OfficerNavbar from './components/officer/OfficerNavbar';
import OfficerDashboard from './components/officer/OfficerDashboard';
import OfficerLoginModal from './components/officer/OfficerLoginModal';
import ProfileSetupModal from './components/officer/ProfileSetupModal';
import CaseDetailModal from './components/officer/CaseDetailModal';

// Service
import { calculateSVI, DEMO_NARRATIVES } from './services/sahayaEngine';

function MainApp() {
  const { setActivePortal } = useLanguage();
  const { isAuthenticated, isFirstLogin, setIsFirstLogin } = useAuth();
  const { addGrievance, getCaseById } = useCases();

  // Active view: 'public' or 'officer'
  const [currentPortal, setCurrentPortal] = useState('public');
  const [activePublicTab, setActivePublicTab] = useState('home');
  const [activeOfficerNav, setActiveOfficerNav] = useState('dashboard');

  // Modals state
  const [isGrievanceOpen, setIsGrievanceOpen] = useState(false);
  const [isRescueOpen, setIsRescueOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isOfficerLoginOpen, setIsOfficerLoginOpen] = useState(false);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);

  // SAHAYA Modals state
  const [isSahayaConsentOpen, setIsSahayaConsentOpen] = useState(false);
  const [isSahayaVictimOpen, setIsSahayaVictimOpen] = useState(false);
  const [isSahayaResultOpen, setIsSahayaResultOpen] = useState(false);

  // Active Data for SAHAYA workflow
  const [pendingGrievanceData, setPendingGrievanceData] = useState(null);
  const [currentSahayaResult, setCurrentSahayaResult] = useState(null);
  const [currentCaseId, setCurrentCaseId] = useState('NHAA-2026-1042');

  // Selected case for Officer Dossier
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  // Switch between Public & Officer portals
  const switchToOfficerPortal = () => {
    setCurrentPortal('officer');
    setActivePortal('officer');
  };

  const switchToPublicPortal = () => {
    setCurrentPortal('public');
    setActivePortal('public');
  };

  // 1. Direct SAHAYA entry from Homepage or Chatbot
  const handleOpenDirectSahaya = () => {
    setPendingGrievanceData({
      victimData: {
        name: 'M. Muthukumar',
        age: '34',
        gender: 'Male',
        contact: '+91 94432 98765',
        state: 'Tamil Nadu',
        district: 'Salem',
        location: 'Valapady Panchayat, Salem Rural',
        preferredLang: 'ta',
        preferredComm: 'Phone Call'
      },
      grievanceData: {
        category: 'Atrocity under PoA Act (Physical Threat & Social Boycott)',
        incidentDate: '2026-09-22',
        description: DEMO_NARRATIVES.tamil_critical.text,
        supportingInfo: 'Previous representation submitted to District Collectorate; local village witnesses available.'
      }
    });
    setIsSahayaConsentOpen(true);
  };

  // 2. Grievance Form -> SAHAYA consent
  const handleStartSahayaFromGrievance = (grievanceDataPayload) => {
    setPendingGrievanceData(grievanceDataPayload);
    setIsSahayaConsentOpen(true);
  };

  // 3. Consent Granted -> Open Victim Interface
  const handleConsentAgree = () => {
    setIsSahayaConsentOpen(false);
    setIsSahayaVictimOpen(true);
  };

  // 4. Consent Skipped -> Fallback to direct grievance registration
  const handleConsentSkip = () => {
    setIsSahayaConsentOpen(false);
    if (pendingGrievanceData) {
      const created = addGrievance({
        victimData: pendingGrievanceData.victimData,
        grievanceData: pendingGrievanceData.grievanceData,
        sahayaData: null
      });
      alert(`Grievance registered without AI assessment. Official Case ID: ${created.id}`);
    }
  };

  // 5. Submit Victim Assessment -> Run SVI Engine -> Show Results
  const handleExecuteAssessment = ({ narrativeText, voiceFeatures, language, victimData, grievanceData }) => {
    const assessment = calculateSVI({
      text: narrativeText,
      audioFeatures: voiceFeatures,
      grievanceCategory: grievanceData?.category || 'Atrocity under PoA Act'
    });

    setCurrentSahayaResult(assessment);

    // Save and attach to NHAA case
    const targetVictim = victimData || pendingGrievanceData?.victimData || {
      name: 'M. Muthukumar',
      age: '34',
      gender: 'Male',
      contact: '+91 94432 98765',
      state: 'Tamil Nadu',
      district: 'Salem',
      location: 'Valapady Panchayat',
      preferredLang: language || 'ta',
      preferredComm: 'Phone Call'
    };

    const targetGrievance = grievanceData || pendingGrievanceData?.grievanceData || {
      category: 'Atrocity under PoA Act (Physical Threat & Social Boycott)',
      incidentDate: '2026-09-22',
      description: narrativeText,
      supportingInfo: 'Direct victim testimony recorded through SAHAYA module.'
    };

    const createdCase = addGrievance({
      victimData: targetVictim,
      grievanceData: targetGrievance,
      sahayaData: assessment
    });

    setCurrentCaseId(createdCase.id);
    setIsSahayaVictimOpen(false);
    setIsSahayaResultOpen(true);
  };

  // 6. Result Modal: Continue to NHAA Case (Opens Officer Dossier)
  const handleContinueToOfficerCase = () => {
    setIsSahayaResultOpen(false);
    setSelectedCaseId(currentCaseId);
    switchToOfficerPortal();
  };

  // 7. Officer Login Success
  const handleOfficerLoginSuccess = () => {
    switchToOfficerPortal();
    if (isFirstLogin) {
      setIsProfileSetupOpen(true);
    }
  };

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Conditionally Render: Public Portal vs Officer Portal */}
      {currentPortal === 'public' ? (
        <>
          {/* Government Official Header */}
          <GovernmentHeader
            onOpenLogin={() => setIsOfficerLoginOpen(true)}
            onOpenGrievance={() => setIsGrievanceOpen(true)}
            onOpenRescue={() => setIsRescueOpen(true)}
            onOpenTrack={() => setIsTrackOpen(true)}
            onOpenSahaya={handleOpenDirectSahaya}
          />

          {/* Navigation Bar */}
          <PublicNavbar
            activeTab={activePublicTab}
            setActiveTab={setActivePublicTab}
            onOpenGrievance={() => setIsGrievanceOpen(true)}
            onOpenRescue={() => setIsRescueOpen(true)}
            onOpenTrack={() => setIsTrackOpen(true)}
            onOpenSahaya={handleOpenDirectSahaya}
            onOpenLogin={() => setIsOfficerLoginOpen(true)}
          />

          {/* Main Public Homepage Content */}
          <main style={{ flex: 1 }}>
            {/* Hero Section */}
            <HeroSection
              onOpenGrievance={() => setIsGrievanceOpen(true)}
              onOpenRescue={() => setIsRescueOpen(true)}
              onOpenTrack={() => setIsTrackOpen(true)}
              onOpenSahaya={handleOpenDirectSahaya}
            />

            {/* Dedicated SAHAYA Showcase Section */}
            <SahayaSection onOpenSahaya={handleOpenDirectSahaya} />

            {/* Information, Metrics, and FAQs */}
            <InfoSections />
          </main>

          {/* Chatbot Support Assistant (Bottom-Right) */}
          <ChatbotWidget
            onOpenGrievance={() => setIsGrievanceOpen(true)}
            onOpenTrack={() => setIsTrackOpen(true)}
            onOpenSahaya={handleOpenDirectSahaya}
            onOpenRescue={() => setIsRescueOpen(true)}
          />

          {/* Official Footer */}
          <Footer
            onOpenGrievance={() => setIsGrievanceOpen(true)}
            onOpenRescue={() => setIsRescueOpen(true)}
            onOpenTrack={() => setIsTrackOpen(true)}
            onOpenSahaya={handleOpenDirectSahaya}
          />
        </>
      ) : (
        /* OFFICER PORTAL VIEW */
        <div className="officer-shell">
          <OfficerNavbar
            activeNav={activeOfficerNav}
            setActiveNav={setActiveOfficerNav}
            onOpenCase={(caseId) => setSelectedCaseId(caseId)}
            onOpenPublicPortal={switchToPublicPortal}
          />

          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <OfficerDashboard
              activeNav={activeOfficerNav}
              onSelectCase={(caseId) => setSelectedCaseId(caseId)}
              onOpenProfileSetup={() => setIsProfileSetupOpen(true)}
            />
          </main>

          {/* Compact Officer Footer */}
          <footer style={{ background: '#ffffff', borderTop: '1px solid var(--border-light)', padding: '0.85rem 2rem', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              Department of Social Justice & Empowerment, Government of India — NHAA Core Case Management
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={switchToPublicPortal}
                style={{ background: 'none', border: 'none', color: 'var(--nhaa-blue)', cursor: 'pointer', font: 'inherit', fontWeight: '600' }}
              >
                ← Return to Public Homepage
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODALS & WORKFLOWS */}
      {/* ========================================================== */}

      {/* 1. Register Grievance Modal */}
      <RegisterGrievanceModal
        isOpen={isGrievanceOpen}
        onClose={() => setIsGrievanceOpen(false)}
        onStartSahayaWithData={handleStartSahayaFromGrievance}
      />

      {/* 2. Register Rescue Modal */}
      <RegisterRescueModal
        isOpen={isRescueOpen}
        onClose={() => setIsRescueOpen(false)}
      />

      {/* 3. Track Grievance Modal */}
      <TrackGrievanceModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
      />

      {/* 4. SAHAYA Consent Modal */}
      <SahayaConsentModal
        isOpen={isSahayaConsentOpen}
        onClose={() => setIsSahayaConsentOpen(false)}
        onConsent={handleConsentAgree}
        onContinueWithoutAI={handleConsentSkip}
      />

      {/* 5. SAHAYA Victim Interface */}
      <SahayaVictimInterface
        isOpen={isSahayaVictimOpen}
        onClose={() => setIsSahayaVictimOpen(false)}
        initialData={pendingGrievanceData}
        onSubmitAssessment={handleExecuteAssessment}
        onRequestHumanAssistance={() => {
          setIsSahayaVictimOpen(false);
          setIsRescueOpen(true);
        }}
      />

      {/* 6. SAHAYA Result Modal */}
      <SahayaResultModal
        isOpen={isSahayaResultOpen}
        onClose={() => setIsSahayaResultOpen(false)}
        assessmentResult={currentSahayaResult}
        caseId={currentCaseId}
        onContinueToOfficerCase={handleContinueToOfficerCase}
        onRequestHumanAssistance={() => {
          setIsSahayaResultOpen(false);
          setIsRescueOpen(true);
        }}
      />

      {/* 7. Officer Login Modal */}
      <OfficerLoginModal
        isOpen={isOfficerLoginOpen}
        onClose={() => setIsOfficerLoginOpen(false)}
        onLoginSuccess={handleOfficerLoginSuccess}
      />

      {/* 8. Profile Setup Modal */}
      <ProfileSetupModal
        isOpen={isProfileSetupOpen}
        onClose={() => setIsProfileSetupOpen(false)}
      />

      {/* 9. Case Detail Modal (Dossier View) */}
      <CaseDetailModal
        caseId={selectedCaseId}
        isOpen={!!selectedCaseId}
        onClose={() => setSelectedCaseId(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CaseProvider>
            <MainApp />
          </CaseProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
