import React from 'react';
import { FileText, Calendar, User } from 'lucide-react';

const MedicalRecordCard = ({ record }) => {
  return (
    <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(86, 215, 222, 0.1)', color: 'var(--teal)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <FileText size={20} />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--dark-blue)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{record.title}</h4>
          <div style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '4px' }}>
            {record.type}
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <User size={14} style={{ flexShrink: 0 }} /> <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{record.provider}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <Calendar size={14} style={{ flexShrink: 0 }} /> {record.date}
        </div>
      </div>
      
      <button className="btn btn-outline w-full" style={{ padding: '8px 16px', fontSize: '14px' }}>View Record</button>
    </div>
  );
};

export default MedicalRecordCard;
