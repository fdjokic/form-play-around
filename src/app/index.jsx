import React, { useState, useRef } from 'react';
import './styles.css';

const isRequired = (val) => {
  return val.length > 0 ? '' : 'cannot be blank';
};

const isEmail = (val) => {
  const ai = val.indexOf('@');
  const gdi = val
    .split('')
    .reduce((acc, char, i) => (char === '.' ? i : acc), 0);
  return ai > -1 && gdi > ai ? '' : 'must be an email';
};

export default function App() {
  const [value, setValue] = useState('');
  const [error, setError] = useState([]);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const validate = (validations) => {
    setError(validations.map((errorsFor) => errorsFor(value)));
  };

  return (
    <div>
      <div
        className={`form-field ${focused ? 'is-focused' : ''} ${
          value.length > 0 ? 'has-value' : ''
        } `}
      >
        <div className='control'>
          <label onClick={() => ref.current.focus()}>Email</label>
          <input
            ref={ref}
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              validate([isRequired, isEmail]);
            }}
          />
        </div>
      </div>
      {error.length > 0 ? (
        <div className='has-error'>{error.join(', ')}</div>
      ) : null}
    </div>
  );
}
