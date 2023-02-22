import * as React from "react";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "moment/locale/fr";

export default function DatePickerTime({ onTimeChange }) {
  const [value, setValue] = React.useState(moment);

  const handleChange = (newValue) => {
    setValue(newValue._d);
    console.log(newValue);
    if (newValue == null) {
      return;
    }
    onTimeChange(newValue);

    // console.log(newValue.format("L"));
    //console.log(newValue.format("LT"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
      <DesktopDatePicker
        locale={"fr"}
        label=""
        //inputFormat="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
