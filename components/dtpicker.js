import * as React from "react";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "moment/locale/fr";

export default function DatePickerT({ onChange }) {
  const [value, setValue] = React.useState(moment);

  const handleChange = (newValue) => {
    console.log(newValue);
    if (newValue == null) {
      return;
    }
    //var a = moment(newValue.format("L").toArray());
    //var b = moment("25/02/2023".split("/").reverse().map(Number));
    //var a = moment(newValue).toArray().slice(0, 3);
    //console.log(moment(b).diff(a, "days"));
    onChange([newValue.format("L"), newValue.format("LT")]);
    console.log(newValue.format("L"));
    console.log(newValue.format("LT"));
    setValue(newValue._d);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        value={value}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
}
