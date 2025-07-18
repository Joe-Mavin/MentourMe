import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";

const timeOptions = ["5 minutes", "10 minutes", "20 minutes"];

const Step4TimeAvailability = ({ data, update, next, back }) => {
  const [time, setTime] = React.useState(data.timeAvailability || "");

  const handleNext = () => {
    if (time) {
      update("timeAvailability", time);
      next();
    } else {
      alert("Please select your available time.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ maxWidth: 420, width: '100%', borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} color="primary" mb={2} textAlign="center">
            How much time can you dedicate daily?
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" mb={3}>
            {timeOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                clickable
                color={time === option ? "primary" : "default"}
                onClick={() => setTime(option)}
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: time === option ? '0 2px 8px 0 rgba(37,99,235,0.10)' : 'none',
                  background: time === option ? 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)' : undefined,
                  color: time === option ? '#fff' : undefined,
                }}
              />
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="primary" onClick={back} sx={{ borderRadius: 3, fontWeight: 700 }}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext} sx={{ borderRadius: 3, fontWeight: 700 }}>
              Next
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Step4TimeAvailability;
