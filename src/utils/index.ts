export const formatTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const getStatusColor = (status: 'normal' | 'warning' | 'danger'): string => {
  const colorMap = {
    normal: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444'
  };
  return colorMap[status] || '#94A3B8';
};

export const getStatusBgColor = (status: 'normal' | 'warning' | 'danger'): string => {
  const colorMap = {
    normal: '#D1FAE5',
    warning: '#FEF3C7',
    danger: '#FEE2E2'
  };
  return colorMap[status] || '#F1F5F9';
};

export const getStatusText = (status: 'normal' | 'warning' | 'danger'): string => {
  const textMap = {
    normal: '正常',
    warning: '偏低',
    danger: '异常'
  };
  return textMap[status] || '未知';
};

export const getTempTrendText = (trend: 'up' | 'down' | 'stable'): string => {
  const textMap = {
    up: '↑ 上升',
    down: '↓ 下降',
    stable: '→ 稳定'
  };
  return textMap[trend] || '稳定';
};

export const getTempTrendColor = (trend: 'up' | 'down' | 'stable'): string => {
  const colorMap = {
    up: '#EF4444',
    down: '#10B981',
    stable: '#0EA5E9'
  };
  return colorMap[trend] || '#94A3B8';
};
