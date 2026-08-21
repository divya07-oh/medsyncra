import React from 'react';
import { CheckCircle2, User, Calendar } from 'lucide-react';

const VerificationStatus = ({ item }) => {
  return (
    <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <CheckCircle2 size={24} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '16px', color: '#065f46' }}>✓ Professionally Reviewed: {item.topic}</h4>
            <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '4px', fontWeight: '500' }}>
              Status: {item.status}
            </span>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#047857' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} /> Reviewed by: {item.reviewer}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} /> Date: {item.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;
