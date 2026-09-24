# NHAA + SAHAYA Platform
## AI-Assisted Victim Vulnerability, Trauma Assessment & Support Platform

An integrated public-service platform combining the **National Helpline Against Atrocities (NHAA)** with **SAHAYA**, an AI-assisted victim vulnerability, trauma assessment, and human-in-the-loop prioritization module.

Operating under the statutory mandate of the **Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, 1989** and the **Protection of Civil Rights Act, 1955** (Department of Social Justice & Empowerment, Ministry of Social Justice & Empowerment, Government of India).

---

### Core System Architecture

```text
VICTIM
  ↓
NHAA Core Platform (24x7 Helpline 14566 / Web / Chatbot / Rescue)
  ↓
Voluntary Consent Gate
  ↓
SAHAYA Multimodal Assessment (Text NLP + Acoustic Speech Signals)
  ↓
Vulnerability Indicators (Threat, Fear, Trauma, Isolation, Immediate Safety)
  ↓
Stress Vulnerability Index (SVI: 0–100)
  ↓
Explainable Indicators (XAI)
  ↓
NHAA Unified Case Record
  ↓
Nodal Officer Dashboard
  ↓
Human-in-the-Loop Review & Decision
  ↓
Support Referral (Trauma Counselling, Special PoA Legal Aid, Protection)
  ↓
Follow-up & Statutory Redressal
```

---

### Key Capabilities

1. **NHAA as Primary Platform + SAHAYA as Integrated Module**:
   - SAHAYA is fully embedded inside the grievance redressal lifecycle.
   - Professional government identity with light theme default, 14566 toll-free helpline, and strict non-diagnostic administrative boundaries.

2. **Multilingual Architecture (6 Languages)**:
   - Full localization across: English (`en`), Tamil (`ta`), Hindi (`hi`), Telugu (`te`), Kannada (`kn`), and Malayalam (`ml`).
   - Independent victim interaction language and officer interface language.

3. **SAHAYA Multimodal Assessment & SVI Engine**:
   - **Text NLP Analysis**: Identifies indicators of threat, fear, trauma-related language, social isolation, and acute physical danger.
   - **Immediate Safety Trigger**: Flags critical danger phrases for priority human escalation without allowing AI to make final police decisions.
   - **Supporting Acoustic Features**: Speech rate, pause duration, pitch variation, and hesitation patterns (strictly supporting, non-diagnostic).
   - **Stress Vulnerability Index (SVI 0–100)**: Categorized into Low (0–24), Moderate (25–49), High (50–74), and Critical (75–100).
   - **Explainable AI (XAI)**: Concise, auditable bullet points detailing why a case was prioritized.

4. **Human-in-the-Loop Supervision**:
   - Every High and Critical case mandates human review (`Confirm Priority`, `Modify Priority`, `Request More Info`, `Refer`, `Close AI Flag`).
   - Immutable audit trail recording reviewer, timestamp, action, and supervisory comments.

5. **Support Referral & Case Management**:
   - Inter-agency coordination for Psychosocial Counselling, Special Legal Aid (DLSA), Medical Care, Witness Safety, and DBT Rehabilitation Grants.
   - Priority case queues, real-time notifications, interactive charts (Chart.js), and statutory CSV/PDF compliance reporting.

---

### Getting Started

#### Prerequisites
- Node.js (v18+)
- npm (v9+)

#### Installation & Local Execution
```bash
# Clone the repository
git clone https://github.com/rkdivyashree04/NHAA.git
cd NHAA

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

### Quick Demo Roles
- **Nodal Case Officer**: Dr. R. Selvam, IAS (`selvam.nodal`)
- **Crisis Counsellor**: Smt. Ananya Sharma (`ananya.counsel`)
- **Special Legal Counsel**: Adv. Prakash Rao (`prakash.legal`)
- **Administrative Supervisor**: Vikramaditya Singh (`admin.nhaa`)

---

### Legal & Administrative Notice
*SAHAYA SVI thresholds and indicators shown in this platform are administrative demonstration thresholds to assist case triage and prioritization by authorized officers. SAHAYA does not provide medical, psychiatric, or clinical diagnoses, nor does it make automated emergency or policing determinations.*
