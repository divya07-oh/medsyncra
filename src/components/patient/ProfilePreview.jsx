import React from 'react';
import Logo from '../Logo';

const ProfilePreview = ({ profile }) => {
  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      padding: '24px', 
      borderRadius: '12px', 
      border: '1px solid var(--border)',
      height: 'fit-content'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Logo />
        <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>Patient Profile</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Name</span>
          <span style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600' }}>{profile.fullName || '-'}</span>
        </div>
        
        <div>
          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Date of Birth</span>
          <span style={{ fontSize: '15px', color: 'var(--text-main)' }}>{profile.dateOfBirth || '-'}</span>
        </div>
        
        <div>
          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Gender</span>
          <span style={{ fontSize: '15px', color: 'var(--text-main)' }}>{profile.gender || '-'}</span>
        </div>
        
        <div>
          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>Blood Group</span>
          <span style={{ fontSize: '15px', color: 'var(--text-main)' }}>{profile.bloodGroup || 'Not provided'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
