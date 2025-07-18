import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Figma blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#fbbf24', // Figma yellow accent
      contrastText: '#222',
    },
    background: {
      default: '#f7f9fb', // Soft neutral background
      paper: '#fff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#6b7280',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
    info: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: 'Inter, Plus Jakarta Display, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em' },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.95rem', fontWeight: 400 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 14, // Figma-style rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 2px 8px 0 rgba(37,99,235,0.08)',
          fontWeight: 600,
          padding: '10px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 4px 24px 0 rgba(37,99,235,0.06)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 4px 24px 0 rgba(37,99,235,0.06)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          background: '#f1f5f9',
          padding: '8px 12px',
        },
      },
    },
  },
});

export default theme;