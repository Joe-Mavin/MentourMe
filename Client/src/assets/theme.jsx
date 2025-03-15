import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#1A1F37', // Use consistent colors
      },
      secondary: {
        main: '#E0E1E2',
      },
    },
    typography: {
      fontFamily: 'Plus Jakarta Display, sans-serif',
    },
  });

export default theme;