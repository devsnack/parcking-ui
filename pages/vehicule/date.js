import * as React from "react";
import moment from "moment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "moment/locale/fr";

export default function MaterialUIPickers() {
  const [value, setValue] = React.useState(moment);

  const handleChange = (newValue) => {
    console.log(newValue.format("L"));
    console.log(newValue.format("LT"));
    setValue(newValue._d);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
      <Stack spacing={3}>
        <DesktopDatePicker
          locale={"fr"}
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        =
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
