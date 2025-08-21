import { Box, Stack } from '@mui/material';
import { grey, purple } from '@mui/material/colors';
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
          color: purple[300],
          fontWeight: '500',
        }}
      >
        {label}
      </label>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        gap="0.7rem"
        bgcolor={grey[100]}
        borderRadius="0.25rem"
        px="1rem"
        py="0.75rem"
        mb="1rem"
        border="1px solid"
        borderColor={purple[50]}
        mt="0.75rem"
        sx={{
          outline: 'none',
        }}
      >
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
                  color: purple[600],
                  cursor: 'pointer',
                }}
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                style={{
                  color: grey[600],
                  cursor: 'pointer',
                }}
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}

export default Input;
