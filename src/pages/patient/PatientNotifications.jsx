import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../../components/patient/PatientNavbar';
import { Bell, CheckCircle } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../../data/mockDataStore';

const PatientNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = () => {
    const allNotifs = getNotifications();
    setNotifications(allNotifs.filter(n => n.patientId === "MS-DEMO-1001"));
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("patientAuthenticated");
    if (isAuthenticated !== "true") {
      navigate('/patient/login');
      return;
    }
    loadNotifications();
  }, [navigate]);

  const handleMarkRead = (id) => {
    markNotificationRead(id);
    loadNotifications();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <PatientNavbar />
      
      <main className="container" style={{ padding: '48px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Notifications</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>Stay updated on your medical alerts.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {notifications.length === 0 ? (
            <div style={{ backgroundColor: 'var(--white)', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>You have no notifications.</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} style={{ backgroundColor: notif.read ? 'var(--white)' : '#eff6ff', padding: '24px', borderRadius: '12px', border: `1px solid ${notif.read ? 'var(--border)' : '#bfdbfe'}`, display: 'flex', gap: '16px' }}>
                <div style={{ marginTop: '4px' }}>
                  <Bell size={24} color={notif.read ? "var(--text-secondary)" : "var(--main-blue)"} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '16px', color: 'var(--dark-blue)', margin: 0 }}>{notif.title}</h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{notif.time}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-main)', margin: '0 0 16px 0', lineHeight: 1.5 }}>{notif.message}</p>
                  
                  {!notif.read && (
                    <button 
                      onClick={() => handleMarkRead(notif.id)}
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <CheckCircle size={14} /> Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
};

export default PatientNotifications;
