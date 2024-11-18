import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

const rows = [
  { name: "Chakra UI Version", budget: "$14,000", completion: "60%" },
  { name: "Add Progress Track", budget: "$5,000", completion: "100%" },
  { name: "Fix Platform Errors", budget: "Not Set", completion: "80%" },
];

const ProjectsTable = () => {
  return (
    <Paper sx={{ bgcolor: "#1E293B", padding: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#FFFFFF" }}>Project</TableCell>
            <TableCell sx={{ color: "#FFFFFF" }}>Budget</TableCell>
            <TableCell sx={{ color: "#FFFFFF" }}>Completion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell sx={{ color: "#FFFFFF" }}>{row.name}</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>{row.budget}</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>{row.completion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProjectsTable;
