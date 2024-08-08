import React from "react";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import { styled } from "@mui/system";

const theme = createTheme({
  typography: {
    fontFamily: "Manrope",
  },
  palette: {
    primary: {
      main: "#3A3A3A",
    },
  },
});

const CustomInput = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#3A3A3A",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "normal",
  },
  "& .MuiInput-underline:before": {
    borderBottom: "2px solid #3A3A3A",
  },
  "& .MuiInput-underline:hover:before": {
    borderBottom: "2px solid #3A3A3A",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "2px solid #3A3A3A",
  },
});

const NumberInput = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomInput
        type="number"
        value={value}
        onChange={handleChange}
        label="Number Input"
        variant="standard"
      />
    </ThemeProvider>
  );
};

export default NumberInput;
