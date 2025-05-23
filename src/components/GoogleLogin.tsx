import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import {
  Container,
  Typography,
  Paper,
  Button,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center font-sans px-4">
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: isMobile ? 3 : 5,
            borderRadius: 4,
            textAlign: 'center',
            backgroundColor: '#0a0a0a',
            border: '2px solid #6b7280',
            color: 'white',
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              mb: 3,
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              color: 'white',
            }}
          >
            Welcome to Clinic Management
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleGoogleSignIn}
            disabled={loading}
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.5,
              px: 3,
              width: '100%',
              fontWeight: 'bold',
              backgroundColor: '#9c27b0',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#7b1fa2',
                borderColor: 'gray',
                boxShadow: '0 0 15px rgba(217, 0, 255, 0.5)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              isMobile ? '' : 'Sign in with Google'
            )}
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default GoogleLogin;
