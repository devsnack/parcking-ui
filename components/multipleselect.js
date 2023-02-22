import React from "react";
import Select from "react-select";

export default function multiselect({ data, rest }) {
  return (
    <Select
      defaultValue={[data[0]]}
      isMulti
      name="colors"
      options={data}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
