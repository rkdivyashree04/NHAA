import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateSVI } from '../services/sahayaEngine';

const INITIAL_CASES = [
  {
    id: 'NHAA-2026-1042',
    referenceNumber: 'REF-TN-1042',
    date: '2026-09-23 10:14',
    channel: '14566 Helpline',
    victim: {
      name: 'M. Muthukumar',
      age: '34',
      gender: 'Male',
      contact: '+91 94432 98765',
      state: 'Tamil Nadu',
      district: 'Salem',
      location: 'Valapady Panchayat, Salem Rural',
      preferredLang: 'ta',
      preferredComm: 'Phone Call',
      consentGiven: true
    },
    grievance: {
      category: 'Atrocity under PoA Act (Physical Threat & Social Boycott)',
      incidentDate: '2026-09-22',
      description: 'அவர்கள் என்னையும் என் குடும்பத்தினரையும் அச்சுறுத்தியுள்ளனர். இந்த புகாரைத் தொடர்ந்தால் என்ன நடக்கும் என்று எனக்கு பயமாக இருக்கிறது. எங்கள் வீட்டை எரித்துவிடுவதாக எச்சரித்துள்ளனர். (They have threatened me and my family. I am afraid of what will happen if I continue with this complaint. They threatened to burn our house.)',
      supportingInfo: 'Village community witnesses available; previous CSR petition filed at local police station.'
    },
    sahayaAssessment: {
      consent: true,
      language: 'ta',
      svi: 82,
      riskCategory: 'CRITICAL',
      riskColor: '#dc2626',
      indicators: {
        fear: 'HIGH (85/100)',
        threat: 'HIGH (92/100)',
        trauma: 'HIGH (74/100)',
        isolation: 'MEDIUM (55/100)',
        safety_concern: 'HIGH (88/100)',
        voice_signals: 'Distress (65/100)'
      },
      voiceFeatures: {
        speechRate: '114 wpm (slowed / hesitant)',
        pauseDuration: '1.8s (elevated hesitation)',
        pitchVariation: '42 Hz variance (dynamic tremor)',
        voiceActivity: 'Tremor cues present',
        silenceRatio: '26%'
      },
      safetyFlags: {
        immediateSafety: true,
        reason: 'Acute threat to life and arson intimidation flagged by safety triggers'
      },
      explainability: [
        'Direct threat and intimidation statements identified in victim narrative',
        'Strong fear-related linguistic markers and apprehension for personal/family safety',
        'Potential immediate physical safety concern flagged for priority officer review',
        'Elevated trauma-related and distress linguistic indicators',
        'Indicators of social boycott and community isolation'
      ],
      recommendations: [
        { type: 'Safety', title: 'Immediate Physical & Witness Safety Review', priority: 'CRITICAL' },
        { type: 'Counselling', title: 'Trauma & Psychosocial Counselling', priority: 'HIGH' },
        { type: 'Legal Aid', title: 'Special PoA / PCR Legal Advocacy', priority: 'HIGH' }
      ]
    },
    humanReview: {
      status: 'PENDING', // PENDING or COMPLETED
      reviewedBy: null,
      reviewedAt: null,
      decision: null,
      officerNotes: ''
    },
    assignedOfficer: 'Unassigned',
    assignedOfficerId: null,
    status: 'Human Review Required',
    publicTimeline: [
      { step: 'Case Submitted', date: '2026-09-23 10:14', note: 'Grievance submitted via 24x7 Helpline 14566' },
      { step: 'Grievance Registered', date: '2026-09-23 10:14', note: 'Official NHAA Case ID generated' },
      { step: 'SAHAYA Assessment Attached', date: '2026-09-23 10:15', note: 'AI vulnerability analysis completed with consent' },
      { step: 'Human Review', date: 'Pending', note: 'Awaiting authorized nodal officer evaluation' }
    ],
    internalTimeline: [
      { timestamp: '2026-09-23 10:14', actor: 'System / IVR', action: 'Grievance submitted via 14566 Helpline' },
      { timestamp: '2026-09-23 10:15', actor: 'SAHAYA AI Module', action: 'Assessment completed: SVI = 82 (CRITICAL). Urgent safety concern flagged.' },
      { timestamp: '2026-09-23 10:15', actor: 'System', action: 'Case escalated to Nodal Priority Queue — Human Review Required' }
    ],
    referrals: []
  },
  {
    id: 'NHAA-2026-1043',
    referenceNumber: 'REF-UP-1043',
    date: '2026-09-23 14:30',
    channel: 'Chatbot',
    victim: {
      name: 'R. Devi',
      age: '41',
      gender: 'Female',
      contact: '+91 98112 34567',
      state: 'Uttar Pradesh',
      district: 'Sitapur',
      location: 'Maholi Tehsil',
      preferredLang: 'hi',
      preferredComm: 'WhatsApp',
      consentGiven: true
    },
    grievance: {
      category: 'Social & Economic Boycott',
      incidentDate: '2026-09-21',
      description: 'गाँव में हमारा सामाजिक बहिष्कार कर दिया गया है। हमें सार्वजनिक नल से पानी नहीं लेने दिया जा रहा है। (We are subjected to social boycott in the village. Access to public water tap is denied.)',
      supportingInfo: 'Multiple affected families in the settlement.'
    },
    sahayaAssessment: {
      consent: true,
      language: 'hi',
      svi: 68,
      riskCategory: 'HIGH',
      riskColor: '#ea580c',
      indicators: {
        fear: 'MEDIUM (62/100)',
        threat: 'HIGH (70/100)',
        trauma: 'HIGH (68/100)',
        isolation: 'HIGH (80/100)',
        safety_concern: 'MEDIUM (58/100)'
      },
      safetyFlags: { immediateSafety: false },
      explainability: [
        'Indicators of social boycott and denial of basic civic amenities',
        'Elevated trauma and community exclusion markers',
        'Intimidation by dominant local groups'
      ],
      recommendations: [
        { type: 'Counselling', title: 'Psychosocial Support & Community Debriefing', priority: 'HIGH' },
        { type: 'Legal Aid', title: 'Legal Notice under PCR Act 1955', priority: 'MEDIUM' }
      ]
    },
    humanReview: {
      status: 'COMPLETED',
      reviewedBy: 'Smt. Ananya Sharma',
      reviewedAt: '2026-09-23 15:10',
      decision: 'Confirmed High Priority',
      officerNotes: 'High priority confirmed. Counselling referral initiated for family members.'
    },
    assignedOfficer: 'Smt. Ananya Sharma',
    assignedOfficerId: 'CSL-2011',
    status: 'In Review',
    publicTimeline: [
      { step: 'Case Submitted', date: '2026-09-23 14:30', note: 'Grievance submitted via NHAA Chatbot' },
      { step: 'Grievance Registered', date: '2026-09-23 14:30', note: 'Case ID NHAA-2026-1043 created' },
      { step: 'SAHAYA Assessment Attached', date: '2026-09-23 14:31', note: 'AI assessment attached with victim consent' },
      { step: 'Human Review', date: '2026-09-23 15:10', note: 'Reviewed by Smt. Ananya Sharma' },
      { step: 'Assigned Nodal Officer', date: '2026-09-23 15:10', note: 'Assigned to Smt. Ananya Sharma' },
      { step: 'Action / Referral', date: '2026-09-23 15:15', note: 'Counselling referral created' }
    ],
    internalTimeline: [
      { timestamp: '2026-09-23 14:30', actor: 'System / Chatbot', action: 'Grievance submitted via Chatbot' },
      { timestamp: '2026-09-23 14:31', actor: 'SAHAYA AI Module', action: 'Assessment completed: SVI = 68 (HIGH)' },
      { timestamp: '2026-09-23 15:10', actor: 'Smt. Ananya Sharma', action: 'Human Review completed. Priority confirmed as High.' },
      { timestamp: '2026-09-23 15:15', actor: 'Smt. Ananya Sharma', action: 'Created Counselling Referral REF-CSL-101' }
    ],
    referrals: ['REF-CSL-101']
  },
  {
    id: 'NHAA-2026-1044',
    referenceNumber: 'REF-KA-1044',
    date: '2026-09-22 11:20',
    channel: 'Mobile App',
    victim: {
      name: 'K. Narayanan',
      age: '52',
      gender: 'Male',
      contact: '+91 98451 22334',
      state: 'Karnataka',
      district: 'Mandya',
      location: 'Maddur Taluk',
      preferredLang: 'en',
      preferredComm: 'SMS',
      consentGiven: true
    },
    grievance: {
      category: 'Land Dispossession / Encroachment',
      incidentDate: '2026-09-20',
      description: 'Encroachment of assigned patta land and verbal abuse during demarcation survey.',
      supportingInfo: 'Land records and revenue survey sketch available.'
    },
    sahayaAssessment: {
      consent: true,
      language: 'en',
      svi: 43,
      riskCategory: 'MODERATE',
      riskColor: '#d97706',
      indicators: {
        fear: 'LOW (32/100)',
        threat: 'MEDIUM (48/100)',
        trauma: 'MEDIUM (42/100)',
        isolation: 'LOW (25/100)',
        safety_concern: 'LOW (35/100)'
      },
      safetyFlags: { immediateSafety: false },
      explainability: [
        'Property and land rights dispute with verbal harassment',
        'Low immediate physical safety risk; civil revenue intervention indicated'
      ],
      recommendations: [
        { type: 'Legal Aid', title: 'PoA Special Court Legal Representation', priority: 'MEDIUM' },
        { type: 'Rehabilitation', title: 'Revenue Department Verification', priority: 'MEDIUM' }
      ]
    },
    humanReview: {
      status: 'COMPLETED',
      reviewedBy: 'Adv. Prakash Rao',
      reviewedAt: '2026-09-22 14:00',
      decision: 'Assigned Legal Counsel',
      officerNotes: 'Assigned to Mandya DLSA for revenue demarcation verification.'
    },
    assignedOfficer: 'Adv. Prakash Rao',
    assignedOfficerId: 'LEG-3045',
    status: 'Assigned',
    publicTimeline: [
      { step: 'Case Submitted', date: '2026-09-22 11:20', note: 'Case submitted via NHAA Mobile App' },
      { step: 'Grievance Registered', date: '2026-09-22 11:20', note: 'Grievance registered' },
      { step: 'Human Review', date: '2026-09-22 14:00', note: 'Reviewed by Legal Officer' },
      { step: 'Assigned Nodal Officer', date: '2026-09-22 14:00', note: 'Assigned to Adv. Prakash Rao' }
    ],
    internalTimeline: [
      { timestamp: '2026-09-22 11:20', actor: 'System / Mobile', action: 'Grievance intake logged' },
      { timestamp: '2026-09-22 11:22', actor: 'SAHAYA AI Module', action: 'Assessment completed: SVI = 43 (MODERATE)' },
      { timestamp: '2026-09-22 14:00', actor: 'Adv. Prakash Rao', action: 'Legal review conducted; notice drafted' }
    ],
    referrals: ['REF-LEG-202']
  },
  {
    id: 'NHAA-2026-1045',
    referenceNumber: 'REF-TN-1045',
    date: '2026-09-20 09:15',
    channel: 'Web Portal',
    victim: {
      name: 'S. Vasanth',
      age: '28',
      gender: 'Male',
      contact: '+91 94445 66778',
      state: 'Tamil Nadu',
      district: 'Madurai',
      location: 'Melur Town',
      preferredLang: 'ta',
      preferredComm: 'Email',
      consentGiven: false
    },
    grievance: {
      category: 'Procedural / Welfare Grant Follow-up',
      incidentDate: '2026-09-15',
      description: 'Status inquiry regarding disbursement of second installment of educational rehabilitation scholarship.',
      supportingInfo: 'Sanction letter dated August 2026.'
    },
    sahayaAssessment: null,
    humanReview: {
      status: 'COMPLETED',
      reviewedBy: 'Dr. R. Selvam, IAS',
      reviewedAt: '2026-09-20 12:00',
      decision: 'Scholarship Disbursed',
      officerNotes: 'Funds credited to beneficiary Aadhaar-linked DBT account. Matter resolved.'
    },
    assignedOfficer: 'Dr. R. Selvam, IAS',
    assignedOfficerId: 'OFF-1042',
    status: 'Resolution',
    publicTimeline: [
      { step: 'Case Submitted', date: '2026-09-20 09:15', note: 'Submitted via Web Portal' },
      { step: 'Grievance Registered', date: '2026-09-20 09:15', note: 'Registered' },
      { step: 'Assigned Nodal Officer', date: '2026-09-20 10:00', note: 'Assigned to Dr. R. Selvam' },
      { step: 'Action / Referral', date: '2026-09-20 12:00', note: 'DBT verification completed' },
      { step: 'Resolution', date: '2026-09-21 16:30', note: 'Scholarship grant released successfully' }
    ],
    internalTimeline: [
      { timestamp: '2026-09-20 09:15', actor: 'System / Web', action: 'Procedural grievance submitted without AI assessment' },
      { timestamp: '2026-09-20 12:00', actor: 'Dr. R. Selvam', action: 'Verified with District Welfare Officer' },
      { timestamp: '2026-09-21 16:30', actor: 'Dr. R. Selvam', action: 'Case closed as resolved' }
    ],
    referrals: []
  }
];

const INITIAL_REFERRALS = [
  {
    id: 'REF-CSL-101',
    caseId: 'NHAA-2026-1043',
    type: 'Counselling',
    assignedSpecialist: 'Smt. Ananya Sharma',
    createdDate: '2026-09-23',
    priority: 'HIGH',
    status: 'Accepted',
    notes: 'Initial trauma assessment scheduled via video call.'
  },
  {
    id: 'REF-LEG-202',
    caseId: 'NHAA-2026-1044',
    type: 'Legal Aid',
    assignedSpecialist: 'Adv. Prakash Rao',
    createdDate: '2026-09-22',
    priority: 'MEDIUM',
    status: 'In Progress',
    notes: 'Demarcation injunction application drafted for Special PoA Court.'
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-1',
    title: 'CRITICAL CASE ALERT: NHAA-2026-1042',
    message: 'SVI = 82 / 100 detected. Potential immediate safety threat flagged in Salem district.',
    type: 'critical',
    time: '10:15 AM',
    caseId: 'NHAA-2026-1042',
    read: false
  },
  {
    id: 'NOTIF-2',
    title: 'New High Risk Case: NHAA-2026-1043',
    message: 'Sitapur district social boycott grievance registered. SVI = 68.',
    type: 'high',
    time: '2:31 PM',
    caseId: 'NHAA-2026-1043',
    read: true
  }
];

const CaseContext = createContext();

export function CaseProvider({ children }) {
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('nhaa_cases_v2');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [referrals, setReferrals] = useState(() => {
    const saved = localStorage.getItem('nhaa_referrals_v2');
    return saved ? JSON.parse(saved) : INITIAL_REFERRALS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('nhaa_notifications_v2');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('nhaa_audit_logs');
    return saved ? JSON.parse(saved) : [
      { id: 'AUD-1', timestamp: '2026-09-23 10:15:02', user: 'SYSTEM_SAHAYA', action: 'AI_ASSESSMENT_COMPLETED', details: 'Case NHAA-2026-1042 evaluated. SVI=82' },
      { id: 'AUD-2', timestamp: '2026-09-23 15:10:45', user: 'ananya.counsel (CSL-2011)', action: 'HUMAN_REVIEW_CONFIRMED', details: 'Priority confirmed HIGH for NHAA-2026-1043' }
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('nhaa_cases_v2', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('nhaa_referrals_v2', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('nhaa_notifications_v2', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nhaa_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Add Grievance (with or without SAHAYA assessment)
  const addGrievance = ({ victimData, grievanceData, sahayaData = null }) => {
    const nextNum = 1046 + cases.length - 4;
    const caseId = `NHAA-2026-${nextNum}`;
    const refNum = `REF-${(victimData.state || 'IN').substring(0, 2).toUpperCase()}-${nextNum}`;
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const isHighOrCritical = sahayaData && (sahayaData.riskCategory === 'CRITICAL' || sahayaData.riskCategory === 'HIGH');

    const newCase = {
      id: caseId,
      referenceNumber: refNum,
      date: dateStr,
      channel: grievanceData.channel || 'Web Portal',
      victim: {
        ...victimData,
        consentGiven: !!sahayaData
      },
      grievance: grievanceData,
      sahayaAssessment: sahayaData ? {
        consent: true,
        language: victimData.preferredLang || 'en',
        svi: sahayaData.svi,
        riskCategory: sahayaData.riskCategory,
        riskColor: sahayaData.riskColor,
        indicators: {
          fear: `${sahayaData.textAnalysis.indicatorTiers.fear} (${sahayaData.textAnalysis.rawIndicators.fear}/100)`,
          threat: `${sahayaData.textAnalysis.indicatorTiers.threat} (${sahayaData.textAnalysis.rawIndicators.threat}/100)`,
          trauma: `${sahayaData.textAnalysis.indicatorTiers.trauma} (${sahayaData.textAnalysis.rawIndicators.trauma}/100)`,
          isolation: `${sahayaData.textAnalysis.indicatorTiers.isolation} (${sahayaData.textAnalysis.rawIndicators.isolation}/100)`,
          safety_concern: `${sahayaData.textAnalysis.indicatorTiers.safety_concern} (${sahayaData.textAnalysis.rawIndicators.safety_concern}/100)`,
          voice_signals: sahayaData.voiceFeatures ? `${sahayaData.voiceFeatures.hesitationLevel} (${sahayaData.voiceFeatures.acousticScore}/100)` : 'None'
        },
        voiceFeatures: sahayaData.voiceFeatures,
        safetyFlags: {
          immediateSafety: sahayaData.textAnalysis.immediateSafety,
          reason: sahayaData.textAnalysis.safetyTriggerReason
        },
        explainability: sahayaData.explainabilityPoints,
        recommendations: sahayaData.recommendations
      } : null,
      humanReview: {
        status: isHighOrCritical ? 'PENDING' : 'NOT_REQUIRED',
        reviewedBy: null,
        reviewedAt: null,
        decision: null,
        officerNotes: ''
      },
      assignedOfficer: 'Unassigned',
      assignedOfficerId: null,
      status: isHighOrCritical ? 'Human Review Required' : 'Grievance Registered',
      publicTimeline: [
        { step: 'Case Submitted', date: dateStr, note: 'Grievance submitted by victim / representative' },
        { step: 'Grievance Registered', date: dateStr, note: `Assigned Official Case ID ${caseId}` },
        ...(sahayaData ? [{ step: 'SAHAYA Assessment Attached', date: dateStr, note: 'AI vulnerability indicators attached with consent' }] : []),
        { step: 'Human Review', date: isHighOrCritical ? 'Pending' : 'Scheduled', note: 'Review by designated nodal officer' }
      ],
      internalTimeline: [
        { timestamp: dateStr, actor: 'Victim Intake', action: `Grievance registered under ${grievanceData.category || 'Statutory Provisions'}` },
        ...(sahayaData ? [{ timestamp: dateStr, actor: 'SAHAYA Engine', action: `Assessment attached: SVI = ${sahayaData.svi} (${sahayaData.riskCategory}). ${sahayaData.textAnalysis.immediateSafety ? 'URGENT SAFETY FLAG.' : ''}` }] : [])
      ],
      referrals: []
    };

    setCases(prev => [newCase, ...prev]);

    // Create Notification for Officer
    if (sahayaData) {
      const newNotif = {
        id: 'NOTIF-' + Date.now(),
        title: `${sahayaData.riskCategory} CASE ALERT: ${caseId}`,
        message: `SVI = ${sahayaData.svi}/100 in ${victimData.district || 'District'}. Indicators: ${sahayaData.explainabilityPoints[0] || 'Vulnerability flags detected'}.`,
        type: sahayaData.riskCategory.toLowerCase(),
        time: 'Just now',
        caseId: caseId,
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    // Add Audit Log
    setAuditLogs(prev => [
      {
        id: 'AUD-' + Date.now(),
        timestamp: dateStr + ':00',
        user: 'PORTAL_PUBLIC_INTAKE',
        action: 'CASE_REGISTERED',
        details: `Case ${caseId} created. SAHAYA consent: ${!!sahayaData}. SVI: ${sahayaData ? sahayaData.svi : 'N/A'}`
      },
      ...prev
    ]);

    return newCase;
  };

  // Add Rescue Request
  const addRescue = (rescueData) => {
    // Generate high priority rescue case
    const nextNum = 1046 + cases.length - 4;
    const caseId = `NHAA-2026-${nextNum}`;
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const rescueCase = {
      id: caseId,
      referenceNumber: `RESCUE-${nextNum}`,
      date: dateStr,
      channel: 'Emergency Rescue Request',
      victim: {
        name: 'Urgent Rescue Caller',
        contact: rescueData.contact,
        state: 'Emergency Location',
        district: rescueData.location,
        location: rescueData.location,
        preferredLang: rescueData.preferredLang || 'en',
        preferredComm: 'Immediate Call',
        consentGiven: true
      },
      grievance: {
        category: `Emergency Rescue: ${rescueData.nature}`,
        incidentDate: dateStr,
        description: rescueData.description,
        supportingInfo: 'Immediate dispatch request submitted through emergency intake portal.'
      },
      sahayaAssessment: {
        consent: true,
        language: rescueData.preferredLang || 'en',
        svi: 95,
        riskCategory: 'CRITICAL',
        riskColor: '#dc2626',
        indicators: {
          fear: 'CRITICAL (95/100)',
          threat: 'CRITICAL (96/100)',
          trauma: 'HIGH (80/100)',
          isolation: 'HIGH (85/100)',
          safety_concern: 'CRITICAL (98/100)'
        },
        safetyFlags: {
          immediateSafety: true,
          reason: 'Emergency Rescue Request logged: Active peril or imminent threat'
        },
        explainability: [
          'Immediate Rescue escalation triggered by victim in active peril',
          'Urgent dispatch coordination required with District Collectorate and Police Nodal Cell',
          'Potential acute danger to bodily integrity'
        ],
        recommendations: [
          { type: 'Safety', title: 'Emergency Nodal Dispatch & Physical Protection', priority: 'CRITICAL' },
          { type: 'Medical', title: 'Emergency Medical & Trauma First Response', priority: 'CRITICAL' }
        ]
      },
      humanReview: {
        status: 'PENDING',
        reviewedBy: null,
        reviewedAt: null,
        decision: null,
        officerNotes: 'EMERGENCY ESCALATION: Nodal Officer Alerted'
      },
      assignedOfficer: 'Unassigned (Emergency Queue)',
      assignedOfficerId: null,
      status: 'Emergency Dispatch Queued',
      publicTimeline: [
        { step: 'Rescue Submitted', date: dateStr, note: 'Emergency rescue petition received' },
        { step: 'Nodal Coordination', date: dateStr, note: 'Simulated alert dispatched to District Nodal Officer' },
        { step: 'Human Response', date: 'Active', note: 'Rapid Response Team coordination in progress' }
      ],
      internalTimeline: [
        { timestamp: dateStr, actor: 'Rescue Intake', action: `Emergency rescue intake: ${rescueData.nature}` },
        { timestamp: dateStr, actor: 'System', action: 'CRITICAL ESCALATION: Alert dispatched to District Magistrate & Nodal SP' }
      ],
      referrals: []
    };

    setCases(prev => [rescueCase, ...prev]);

    setNotifications(prev => [
      {
        id: 'NOTIF-' + Date.now(),
        title: `EMERGENCY RESCUE DISPATCH: ${caseId}`,
        message: `Active emergency reported at ${rescueData.location}. Nature: ${rescueData.nature}. Immediate intervention required.`,
        type: 'critical',
        time: 'Just now',
        caseId: caseId,
        read: false
      },
      ...prev
    ]);

    return rescueCase;
  };

  // Human Review Decision
  const updateHumanReview = (caseId, { decision, priority, notes, officerName, officerId }) => {
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;

      const updatedCase = {
        ...c,
        humanReview: {
          status: 'COMPLETED',
          reviewedBy: officerName,
          reviewedAt: dateStr,
          decision: `${decision} (${priority || 'As Assessed'})`,
          officerNotes: notes
        },
        assignedOfficer: officerName,
        assignedOfficerId: officerId,
        status: decision === 'Close AI Flag' ? 'AI Flag Closed / Under Standard Review' : 'Human Review Completed',
        publicTimeline: [
          ...c.publicTimeline.filter(t => t.step !== 'Human Review'),
          { step: 'Human Review', date: dateStr, note: `Reviewed by authorized officer (${officerName})` },
          { step: 'Assigned Nodal Officer', date: dateStr, note: `Supervised by ${officerName}` }
        ],
        internalTimeline: [
          ...c.internalTimeline,
          {
            timestamp: dateStr,
            actor: `${officerName} (${officerId})`,
            action: `Human-in-the-loop review: ${decision}. Priority adjusted/confirmed as ${priority || c.sahayaAssessment?.riskCategory}. Notes: ${notes}`
          }
        ]
      };

      if (priority && updatedCase.sahayaAssessment) {
        updatedCase.sahayaAssessment = {
          ...updatedCase.sahayaAssessment,
          riskCategory: priority,
          riskColor: priority === 'CRITICAL' ? '#dc2626' : priority === 'HIGH' ? '#ea580c' : priority === 'MODERATE' ? '#d97706' : '#16a34a'
        };
      }

      return updatedCase;
    }));

    setAuditLogs(prev => [
      {
        id: 'AUD-' + Date.now(),
        timestamp: dateStr + ':00',
        user: `${officerName} (${officerId})`,
        action: 'HUMAN_REVIEW_ACTION',
        details: `Case ${caseId} reviewed. Decision: ${decision}. Priority: ${priority}. Notes: ${notes}`
      },
      ...prev
    ]);
  };

  // Create Referral
  const createReferral = ({ caseId, type, assignedSpecialist, priority = 'HIGH', notes = '' }) => {
    const refId = `REF-${type.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const dateStr = now.toISOString().substring(0, 10);
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newRef = {
      id: refId,
      caseId,
      type,
      assignedSpecialist,
      createdDate: dateStr,
      priority,
      status: 'Pending',
      notes
    };

    setReferrals(prev => [newRef, ...prev]);

    // Update case timeline & referrals list
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      return {
        ...c,
        referrals: [...(c.referrals || []), refId],
        publicTimeline: [
          ...c.publicTimeline,
          { step: 'Action / Referral', date: dateStr, note: `${type} referral created (${refId})` }
        ],
        internalTimeline: [
          ...c.internalTimeline,
          { timestamp: timeStr, actor: assignedSpecialist || 'Case Officer', action: `Initiated ${type} referral (${refId}) for victim support` }
        ]
      };
    }));

    return newRef;
  };

  // Update Referral Status
  const updateReferralStatus = (referralId, newStatus, updateNote = '') => {
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);

    setReferrals(prev => prev.map(r => {
      if (r.id !== referralId) return r;
      return {
        ...r,
        status: newStatus,
        notes: updateNote ? `${r.notes ? r.notes + ' | ' : ''}${updateNote}` : r.notes
      };
    }));

    // Find referral and log to case timeline
    const targetRef = referrals.find(r => r.id === referralId);
    if (targetRef) {
      setCases(prev => prev.map(c => {
        if (c.id !== targetRef.caseId) return c;
        return {
          ...c,
          internalTimeline: [
            ...c.internalTimeline,
            { timestamp: timeStr, actor: 'Referral Coordinator', action: `Referral ${referralId} (${targetRef.type}) updated to: ${newStatus}` }
          ]
        };
      }));
    }
  };

  // Add Case Note
  const addCaseNote = (caseId, noteText, officerName = 'Officer') => {
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);

    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      return {
        ...c,
        internalTimeline: [
          ...c.internalTimeline,
          { timestamp: timeStr, actor: officerName, action: `Case Note added: ${noteText}` }
        ]
      };
    }));
  };

  const getCaseById = (id) => {
    return cases.find(c => c.id.toLowerCase() === id.toLowerCase() || (c.referenceNumber && c.referenceNumber.toLowerCase() === id.toLowerCase()));
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Calculate high-level stats
  const stats = {
    total: cases.length,
    critical: cases.filter(c => c.sahayaAssessment?.riskCategory === 'CRITICAL').length,
    high: cases.filter(c => c.sahayaAssessment?.riskCategory === 'HIGH').length,
    moderate: cases.filter(c => c.sahayaAssessment?.riskCategory === 'MODERATE').length,
    low: cases.filter(c => c.sahayaAssessment?.riskCategory === 'LOW').length,
    pendingReview: cases.filter(c => c.humanReview?.status === 'PENDING').length
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        referrals,
        notifications,
        auditLogs,
        stats,
        addGrievance,
        addRescue,
        updateHumanReview,
        createReferral,
        updateReferralStatus,
        addCaseNote,
        getCaseById,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}

export const useCases = () => useContext(CaseContext);
