import { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useFilterProvider } from "./FilterProvider";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export function FilterController() {
  const { from, to, versionsSelected, versions } = useFilterProvider();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        margin: 2,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <DatePicker
              label="From"
              value={from}
              onChange={(newValue) => {
                console.log("n", newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              label="To"
              value={to}
              onChange={(newValue) => {
                console.log("n", newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={4}>
            <div>xs=8</div>
          </Grid>

          <Grid item xs={8}>
            <Divider />
            {versionsSelected
              ? versionsSelected.map((item) => {
                  return (
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      key={item}
                      label={item}
                      onChange={(i)=> console.log(i.target.checked, item)}
                    />
                  );
                })
              : null}
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
}
