import React from 'react';
import { FileText, Download, Trash2, Calendar, User } from 'lucide-react';

const RecordCard = ({ record, onDelete }) => {
  return (
    <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(86, 215, 222, 0.1)', color: 'var(--teal)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileText size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
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
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '8px', backgroundColor: '#f8fafc', borderRadius: '4px', marginTop: '4px', wordBreak: 'break-all' }}>
          {record.fileName} ({record.fileSize})
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button className="btn btn-outline" style={{ flex: 1, padding: '8px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
           View
        </button>
        <button className="btn btn-outline" style={{ flex: 1, padding: '8px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
          <Download size={16} /> <span className="desktop-only">Save</span>
        </button>
        <button 
          onClick={() => onDelete(record.id)}
          className="btn btn-outline" 
          style={{ padding: '8px', fontSize: '14px', borderColor: '#fee2e2', color: '#ef4444', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default RecordCard;
