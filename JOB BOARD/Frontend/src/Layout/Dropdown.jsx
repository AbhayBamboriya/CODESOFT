import React, { useState } from 'react'

const Dropdown = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <div>
        <label htmlFor="dropdown"></label>
        <select id="dropdown" value={selectedOption} onChange={handleChange} className='hover'>
            <option value="" disabled>Select an option</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {/* <p>You selected: {selectedOption}</p> */}
      </div>
    );
}

export default Dropdown
