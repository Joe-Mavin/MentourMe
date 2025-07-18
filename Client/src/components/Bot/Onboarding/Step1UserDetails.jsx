import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Box, Container } from "@mui/material";

const Step1UserDetails = ({ data, update, next }) => {
  const [name, setName] = useState(data.name || "");
  const [age, setAge] = useState(data.age || "");

  const handleNext = () => {
    if (name && age) {
      update("name", name);
      update("age", age);
      next();
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, md: 6 } }}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Card sx={{ width: '100%', borderRadius: 4, boxShadow: 3, p: { xs: 1, sm: 2 } }}>
          <CardContent>
            <Typography variant="h4" fontWeight={700} color="primary" mb={2} textAlign="center">
              Welcome! Let's start with your details
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                autoFocus
              />
              <TextField
                label="Your Age"
                type="number"
                variant="outlined"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleNext}
                sx={{ borderRadius: 3, fontWeight: 700, mt: 2 }}
              >
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Step1UserDetails;
