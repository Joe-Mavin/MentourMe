import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";

const addictionTypes = [
  "Substance Abuse",
  "Technology Addiction",
  "Gambling",
  "Smoking",
  "Alcohol",
  "Other",
];

const StepAddictionDetails = ({ data, update, next, back }) => {
  const [selectedAddiction, setSelectedAddiction] = useState(data.addiction || "");

  const handleNext = () => {
    if (selectedAddiction) {
      update("addiction", selectedAddiction);
      next();
    } else {
      alert("Please select an addiction type.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ maxWidth: 480, width: '100%', borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} color="primary" mb={2} textAlign="center">
            Please specify the type of addiction you'd like to address:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mb={3}>
            {addictionTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                clickable
                color={selectedAddiction === type ? "primary" : "default"}
                onClick={() => setSelectedAddiction(type)}
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: selectedAddiction === type ? '0 2px 8px 0 rgba(37,99,235,0.10)' : 'none',
                  background: selectedAddiction === type ? 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)' : undefined,
                  color: selectedAddiction === type ? '#fff' : undefined,
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

export default StepAddictionDetails;
