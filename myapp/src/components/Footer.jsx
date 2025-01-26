import * as React from 'react';
import Box from '@mui/material/Box';  // Using MUI Box
import Button from '@mui/material/Button';  // Using MUI Button
import Table from '@mui/material/Table';  // Using MUI Table
import Typography from '@mui/material/Typography';  // Using MUI Typography
import Paper from '@mui/material/Paper';  // Using MUI Paper instead of Sheet

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1', 159, 6.0, 24, 4.0),
  createData('2', 237, 9.0, 37, 4.3),
  createData('3', 262, 16.0, 24, 6.0),
  createData('4', 305, 3.7, 67, 4.3),
];

export default function TableColumnPinning() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography level="body-sm" sx={{ textAlign: 'center', pb: 2 }}>
        ← Scroll direction →
      </Typography>
      <Paper
        variant="outlined"
        sx={(theme) => ({
          '--TableCell-height': '40px',
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
          '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
          overflow: 'auto',
          background: `linear-gradient(to right, ${theme.palette.background.paper} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.palette.background.paper} 70%) 0 100%`,
          backgroundSize: '40px calc(100% - var(--TableCell-height))',
          backgroundRepeat: 'no-repeat',
        })}
      >
        <Table
          sx={{
            '& tr > *:first-child': {
              position: 'sticky',
              left: 0,
              boxShadow: '1px 0 var(--TableCell-borderColor)',
              bgcolor: 'background.paper',
            },
            '& tr > *:last-child': {
              position: 'sticky',
              right: 0,
              bgcolor: 'var(--TableCell-headBackground)',
            },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Row</th>
              <th style={{ width: 200 }}>Calories</th>
              <th style={{ width: 200 }}>Fat&nbsp;(g)</th>
              <th style={{ width: 200 }}>Carbs&nbsp;(g)</th>
              <th style={{ width: 200 }}>Protein&nbsp;(g)</th>
              <th aria-label="last" style={{ width: 'var(--Table-lastColumnWidth)' }} />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.calories}</td>
                <td>{row.fat}</td>
                <td>{row.carbs}</td>
                <td>{row.protein}</td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" color="primary">
                      Edit
                    </Button>
                    <Button size="small" variant="contained" color="secondary">
                      Delete
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Box>
  );
}
