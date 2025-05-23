import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

function Input({ value, onChange, label, placeholder, type, id }) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Box width="100%">
      <label
        htmlFor={id}
        style={{
          fontSize: '13px',
          color: grey[600],
          fontWeight: '500',
        }}
      >
        {label}
      </label>
      <div className="input-box">
        <input
          id={id}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          placeholder={placeholder}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            outline: 'none',
          }}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                style={{
                  color: '#932be7',
                  cursor: 'pointer',
                }}
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                style={{
                  color: grey[400],
                  cursor: 'pointer',
                }}
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </Box>
  );
}

export default Input;
