import React from 'react';

const ProgressCard = ({ label, value = 0, total = 0 }) => {
  // Handle edge cases to prevent NaN or division by zero
  const safeValue = isNaN(value) ? 0 : value;
  const safeTotal = isNaN(total) || total === 0 ? 1 : total;
  const percentage = Math.round((safeValue / safeTotal) * 100);

  return (
    <div className="flex flex-col items-center px-4 py-3">
      <span className="text-lg font-semibold text-gray-800">{safeValue} / {total || 0}</span>
      <span className="text-sm text-gray-600">{label}</span>

      <div className="w-full bg-gray-200 rounded h-2 mt-2">
        <div
          className="h-2 bg-[#00b8a3] rounded transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;