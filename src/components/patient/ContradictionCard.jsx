import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Calendar } from 'lucide-react';

const ContradictionCard = ({ contradiction }) => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
      <div style={{ padding: '16px 24px', backgroundColor: '#fef3c7', borderBottom: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <AlertTriangle size={20} color="#b45309" />
        <h4 style={{ margin: 0, color: '#92400e', fontSize: '16px' }}>Potential Contradiction: {contradiction.field}</h4>
      </div>
      
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          
          <div style={{ backgroundColor: 'var(--white)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{contradiction.hospitalA}</div>
            <div style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600', marginBottom: '12px' }}>{contradiction.valueA}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <Calendar size={12} /> {contradiction.dateA}
            </div>
          </div>
          
          <div style={{ backgroundColor: 'var(--white)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{contradiction.hospitalB}</div>
            <div style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: '600', marginBottom: '12px' }}>{contradiction.valueB}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <Calendar size={12} /> {contradiction.dateB}
            </div>
          </div>
          
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#92400e' }}>Status: {contradiction.status}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Requires professional verification.</div>
          </div>
          <button 
            onClick={() => navigate(`/patient/contradictions/${contradiction.id}`)}
            className="btn btn-outline" 
            style={{ padding: '8px 16px', fontSize: '14px', borderColor: '#b45309', color: '#92400e' }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContradictionCard;
