import React, { useState, useRef } from 'react';
import TextField from './text-field';
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

const defaultValues = {
  name: '',
  email: '',
};

const defaultErrors = {
  name: [],
  email: [],
};

export default function App() {
  const [values, setValues] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState({ name: [], email: [] });
  return (
    <div className='container'>
      <TextField
        value={values.name}
        name='name'
        onChange={(val) => {
          const name = val;
          setValues((prev) => ({ ...prev, name }));
        }}
        validations={[isRequired]}
        errors={error.name}
        setError={setError}
      />
      <TextField
        value={values.email}
        name='email'
        onChange={(val) => {
          const email = val;
          setValues((prev) => ({ ...prev, email }));
        }}
        validations={[isEmail]}
        errors={error.email}
        setError={setError}
      />
    </div>
  );
}
