import React, { useState } from 'react';
import '../components/TestResultsAdmin.css';

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange({ target: { name: e.target.name, value: newValue } });
  };

  return (
    <div className="custom-select">
      <div 
        className="select-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          backgroundColor: 'white',
          color: selectedValue ? '#333' : '#666',
          padding: '0.5rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {selectedValue ? options.find(opt => opt.value === selectedValue)?.label : placeholder}
        <span className="select-arrow">▼</span>
      </div>

      {isOpen && (
        <div className="select-options">
          {options.map((option) => (
            <div
              key={option.value}
              className="option-item"
              onClick={() => {
                handleChange({ target: { name: 'selectedStudent', value: option.value } });
                setIsOpen(false);
              }}
              style={{
                backgroundColor: 'white',
                color: '#333',
                padding: '0.5rem',
                cursor: 'pointer'
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
