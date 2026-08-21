import React from 'react';
import { Activity } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2" style={{ color: 'var(--dark-blue)', fontWeight: '700', fontSize: '24px' }}>
      <Activity size={28} color="var(--main-blue)" />
      <span>medsyncra</span>
    </div>
  );
};

export default Logo;
