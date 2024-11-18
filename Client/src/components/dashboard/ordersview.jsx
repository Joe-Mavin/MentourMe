import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const OrdersOverview = () => {
  return (
    <Paper sx={{ bgcolor: "#1E293B", padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Orders Overview
      </Typography>
      <List>
        {[
          "Design changes - $2,400",
          "New order #241923",
          "Server Payments - $1,500",
          "New order #421019",
        ].map((order, index) => (
          <ListItem key={index}>
            <ListItemText primary={order} sx={{ color: "#FFFFFF" }} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default OrdersOverview;
