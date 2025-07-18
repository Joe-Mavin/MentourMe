import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a8bfd', // Vision UI accent blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#fbbf24',
      contrastText: '#222',
    },
    background: {
      default: '#0f1535', // Deep navy
      paper: 'rgba(20, 24, 68, 0.95)', // Glassy card
    },
    text: {
      primary: '#fff',
      secondary: '#bfc9e0',
    },
    info: {
      main: '#1e2a78',
    },
  },
  typography: {
    fontFamily: 'Plus Jakarta Display, Inter, Roboto, Arial, sans-serif',
    h1: { fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, fontSize: '1.5rem' },
    h4: { fontWeight: 700, fontSize: '1.25rem' },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(20, 24, 68, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(58,139,253,0.10)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(20, 24, 68, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(58,139,253,0.10)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;