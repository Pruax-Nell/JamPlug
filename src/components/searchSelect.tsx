import React, { useState, useMemo, useEffect } from 'react';
import type { SerializedEvent, EventCardData, EventLocation, SelectOption } from '../function/types';
import { formatEventDate, } from '../function/dateHelper';
import { formatLabel, capitalize, slugify } from '../function/stringHelper';


export interface SearchableSelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// ----- SEARCHSELECT
export const SearchableSelect = ({ label, value, options, onChange, placeholder, disabled }: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const currentOption = options.find(o => o.value === value);
    setSearchTerm(currentOption ? currentOption.label : value === 'All' ? '' : value);
  }, [value, options]);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
    <div className={`searchable-select ${disabled ? 'disabled' : ''}`}>
      <label>{label}</label>
      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} 
        //  alt = onMouseDown()
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="options-list">
          {filteredOptions.map(opt => (
            <li key={opt.value} onMouseDown={() => {onChange(opt.value); setIsOpen(false);}}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


// other
export const SearchSelect = ({ 
  label, 
  value, 
  options, 
  onChange, 
  placeholder, 
  disabled 
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync the text box with the actual selected value
  useEffect(() => {
    const currentOption = options.find(o => o.value === value);
    setSearchTerm(currentOption ? currentOption.label : value === 'All' ? '' : value);
  }, [value, options]);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`searchable-select-container ${disabled ? 'is-disabled' : ''}`}>
      <label className="select-label">{label}</label>
      <div className="input-wrapper">
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          // The timeout allows the 'onMouseDown' on the list item to fire before the list vanishes
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        
        {isOpen && !disabled && filteredOptions.length > 0 && (
          <ul className="options-dropdown">
            {filteredOptions.map(opt => (
              <li 
                key={opt.value} 
                onMouseDown={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


// Adjust path as needed
// import { SearchableSelect } from './SearchableSelect'; 
// Inside your Return block:
{/* <SearchableSelect 
  label="Select Rink"
  value={filters.attributes.venue} 
  options={dynamicRinks} // This list would be filtered by location
  onChange={(val) => handleFilterChange('attributes', 'venue', val)}
  disabled={dynamicRinks.length === 0}
  placeholder="Type to find a rink..."
/> */}