import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";

const goalsList = [
  "Personal Development",
  "Stress Management",
  "Social Life",
  "Career Advice",
  "Physical Health",
  "Spirituality",
  "Addiction", // New goal option
];

const Step2Goals = ({ data, update, next, back }) => {
  const [selectedGoals, setSelectedGoals] = useState(data.goals || []);

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      update("goals", selectedGoals);
      if (selectedGoals.includes("Addiction")) {
        next("addiction"); // Navigate to the addiction step
      } else {
        next(); // Proceed to the next regular step
      }
    } else {
      alert("Please select at least one goal.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ maxWidth: 480, width: '100%', borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} color="primary" mb={2} textAlign="center">
            What would you like to work on?
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mb={3}>
            {goalsList.map((goal) => (
              <Chip
                key={goal}
                label={goal}
                clickable
                color={selectedGoals.includes(goal) ? "primary" : "default"}
                onClick={() => toggleGoal(goal)}
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: selectedGoals.includes(goal) ? '0 2px 8px 0 rgba(37,99,235,0.10)' : 'none',
                  background: selectedGoals.includes(goal) ? 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)' : undefined,
                  color: selectedGoals.includes(goal) ? '#fff' : undefined,
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

export default Step2Goals;
