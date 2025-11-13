import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value && (
        <span className={value === 'X' ? 'x-value' : 'o-value'}>
          {value}
        </span>
      )}
    </button>
  );
};

export default Square;
