import React, { createContext, useContext, useState } from 'react';

export const DEMO_OFFICERS = [
  {
    id: 'OFF-1042',
    username: 'selvam.nodal',
    name: 'Dr. R. Selvam, IAS',
    role: 'NHAA Officer',
    department: 'Directorate of Social Justice & Empowerment',
    state: 'Tamil Nadu',
    district: 'Chennai',
    email: 'selvam.r@dosje.gov.in',
    phone: '+91 94440 12345',
    preferredLang: 'ta',
    avatar: 'RS',
    avatarColor: '#1e40af'
  },
  {
    id: 'CSL-2011',
    username: 'ananya.counsel',
    name: 'Smt. Ananya Sharma',
    role: 'Counsellor',
    department: 'Victim Trauma Care & Psychosocial Cell',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    email: 'ananya.sharma@nhaa.support',
    phone: '+91 98110 54321',
    preferredLang: 'hi',
    avatar: 'AS',
    avatarColor: '#0d9488'
  },
  {
    id: 'LEG-3045',
    username: 'prakash.legal',
    name: 'Adv. Prakash Rao',
    role: 'Legal Support',
    department: 'Special PoA & PCR Legal Aid Cell',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    email: 'prakash.rao@legal-aid.gov.in',
    phone: '+91 98450 98765',
    preferredLang: 'kn',
    avatar: 'PR',
    avatarColor: '#7c3aed'
  },
  {
    id: 'ADM-9001',
    username: 'admin.nhaa',
    name: 'Vikramaditya Singh',
    role: 'Administrator',
    department: 'Central Monitoring & SVI Technology Operations',
    state: 'Delhi (NCT)',
    district: 'New Delhi',
    email: 'admin.tech@nhaa.gov.in',
    phone: '+91 99100 22334',
    preferredLang: 'en',
    avatar: 'VS',
    avatarColor: '#b91c1c'
  }
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nhaa_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isFirstLogin, setIsFirstLogin] = useState(false);

  const login = (username, password) => {
    // Check demo accounts or generic valid login
    const found = DEMO_OFFICERS.find(
      u => u.username.toLowerCase() === username.toLowerCase() || u.id.toLowerCase() === username.toLowerCase()
    );

    const user = found || {
      id: 'OFF-' + Math.floor(1000 + Math.random() * 9000),
      username: username || 'officer.demo',
      name: username ? username.toUpperCase() : 'Officer Reviewer',
      role: 'NHAA Officer',
      department: 'District Social Justice Cell',
      state: 'Tamil Nadu',
      district: 'Salem',
      email: `${username || 'officer'}@dosje.gov.in`,
      phone: '+91 98000 11223',
      preferredLang: 'en',
      avatar: 'OF',
      avatarColor: '#1e40af'
    };

    setCurrentUser(user);
    localStorage.setItem('nhaa_auth_user', JSON.stringify(user));
    return { success: true, user };
  };

  const loginAsDemo = (officerId) => {
    const found = DEMO_OFFICERS.find(o => o.id === officerId);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('nhaa_auth_user', JSON.stringify(found));
      return { success: true, user: found };
    }
  };

  const updateProfile = (updatedFields) => {
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    localStorage.setItem('nhaa_auth_user', JSON.stringify(updated));
    setIsFirstLogin(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('nhaa_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        loginAsDemo,
        logout,
        updateProfile,
        isFirstLogin,
        setIsFirstLogin,
        demoOfficers: DEMO_OFFICERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
