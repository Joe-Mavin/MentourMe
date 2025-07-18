import React from "react";
import { Card, CardContent, Typography, Button, Box, Slider } from "@mui/material";

const Step3Confidence = ({ data, update, next, back }) => {
  const goals = data.goals || [];
  const [confidenceLevels, setConfidenceLevels] = React.useState(data.confidenceLevels || {});

  const handleConfidenceChange = (goal, level) => {
    setConfidenceLevels((prev) => ({ ...prev, [goal]: level }));
  };

  const handleNext = () => {
    if (Object.keys(confidenceLevels).length === goals.length) {
      update("confidenceLevels", confidenceLevels);
      next();
    } else {
      alert("Please set confidence levels for all goals.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ maxWidth: 480, width: '100%', borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} color="primary" mb={2} textAlign="center">
            Rate your confidence in these areas (1-10)
          </Typography>
          <Box display="flex" flexDirection="column" gap={3} mb={3}>
            {goals.map((goal) => (
              <Box key={goal}>
                <Typography fontWeight={600} mb={1}>{goal}</Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Slider
                    min={1}
                    max={10}
                    value={Number(confidenceLevels[goal]) || 5}
                    onChange={(_, value) => handleConfidenceChange(goal, value)}
                    sx={{ flex: 1 }}
                  />
                  <Typography fontWeight={700} color="primary.main">{confidenceLevels[goal] || 5}</Typography>
                </Box>
              </Box>
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

export default Step3Confidence;
