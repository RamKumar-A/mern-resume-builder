import { Avatar, Badge, Box, Stack } from '@mui/material';
import { grey, purple, red } from '@mui/material/colors';
import { useRef, useState } from 'react';
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

function ProfilePhotoSelector({ image, setImage, preview, setPreview }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  }

  function handleRemoveImage() {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  }

  function onChooseFile() {
    inputRef.current.click();
  }

  return (
    <Box
      sx={{
        p: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <Box className="bg-yellow-500 p-2"> */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        style={{
          display: 'none',
        }}
      />
      {/* </Box> */}
      {!image ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Avatar
              sx={{
                width: 24,
                height: 24,
                color: '#fff',
                position: 'absolute',
                bgcolor: purple[600],
              }}
              onClick={onChooseFile}
            >
              {' '}
              <LuUpload
                style={{
                  padding: '0.25rem',
                  width: 'fit-content',
                }}
              />
            </Avatar>
          }
        >
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: purple[800],
            }}
          />
        </Badge>
      ) : (
        <Box position="relative">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: red[500],
                  color: grey[50],
                }}
                onClick={handleRemoveImage}
              >
                {' '}
                <LuTrash
                  style={{
                    padding: '0.25rem',
                    width: 'fit-content',
                  }}
                />
              </Avatar>
            }
          >
            <Avatar
              sx={{
                width: 50,
                height: 50,
              }}
              src={preview || previewUrl}
            />
          </Badge>
        </Box>
      )}
    </Box>
  );
}

export default ProfilePhotoSelector;
