import React from 'react';
import { AlertCircle } from 'lucide-react';

const MedicalTimeline = ({ timeline }) => {
  return (
    <div style={{ position: 'relative', paddingLeft: '24px' }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '7px', width: '2px', backgroundColor: 'var(--border)' }}></div>
      
      {timeline.map((item, index) => (
        <div key={item.id} style={{ position: 'relative', marginBottom: index === timeline.length - 1 ? 0 : '32px' }}>
          <div style={{ 
            position: 'absolute', 
            left: '-24px', 
            width: '16px', 
            height: '16px', 
            borderRadius: '50%', 
            backgroundColor: item.flagged ? '#fef3c7' : 'var(--white)',
            border: `2px solid ${item.flagged ? '#b45309' : 'var(--teal)'}`,
            top: '4px',
            zIndex: 2
          }}></div>
          
          <div style={{ backgroundColor: 'var(--white)', padding: '16px 24px', borderRadius: '8px', border: `1px solid ${item.flagged ? '#fde68a' : 'var(--border)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ fontWeight: '600', color: 'var(--dark-blue)', fontSize: '16px' }}>{item.year} - {item.hospital}</div>
            </div>
            <div style={{ color: 'var(--text-main)', fontSize: '14px' }}>{item.description}</div>
            
            {item.flagged && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309', fontSize: '13px', marginTop: '12px', padding: '8px 12px', backgroundColor: '#fffbeb', borderRadius: '4px' }}>
                <AlertCircle size={16} />
                Potential contradiction flagged. Requires professional verification.
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicalTimeline;
