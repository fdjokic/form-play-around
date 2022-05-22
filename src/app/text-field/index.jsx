import React, { useState, useRef } from 'react';

const TextField = ({
  value = '',
  onChange,
  validations,
  errors,
  setError,
  name,
}) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const validate = (validations) => {
    setError((prev) => ({
      ...prev,
      [name]: validations
        .map((errorsFor) => errorsFor(value))
        .filter((errorsMsg) => errorsMsg.length > 0),
    }));
  };
  return (
    <div>
      <div>
        <div
          className={`form-field ${focused ? 'is-focused' : ''} ${
            value.length > 0 ? 'has-value' : ''
          } `}
        >
          <div className='control'>
            <label onClick={() => ref.current.focus()}>
              {name.slice(0, 1).toUpperCase() + name.slice(1)}
            </label>
            <input
              ref={ref}
              type='text'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
                validate(validations);
              }}
            />
          </div>
        </div>
        {errors.length > 0 ? (
          <div className='has-error'>{errors.join(', ')}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TextField;
