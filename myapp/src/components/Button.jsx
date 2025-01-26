import React, { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingButtonGroup() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate save action
  };

  return (
    <ButtonGroup variant="outlined" aria-label="Loading button group">
      <Button>Submit</Button>
      <Button>Fetch data</Button>
      <Button onClick={handleSave} startIcon={loading ? <CircularProgress size={16} /> : <SaveIcon />}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </ButtonGroup>
  );
}
