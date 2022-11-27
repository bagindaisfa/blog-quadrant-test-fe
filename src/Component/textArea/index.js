import React from "react";
import TextField from "@mui/material/TextField";

function TextArea({ label, disable, ...rest }) {
  return (
    <div className="input-wrapper">
      <TextField
        id="outlined-basic"
        label={label}
        multiline
        variant="outlined"
        className="input"
        rows={15}
        disabled={disable}
        {...rest}
      />
    </div>
  );
}

export default TextArea;
