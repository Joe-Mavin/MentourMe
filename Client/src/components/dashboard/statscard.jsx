import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ title, value, percentage }) => {
  return (
    <Card sx={{ bgcolor: "#1E293B", color: "#FFFFFF" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="body2" sx={{ color: percentage.startsWith("+") ? "green" : "red" }}>
          {percentage}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
