import { Button, ButtonGroup } from "@mui/material";

const CustomButtonGroup = ({ mapMode, setMapMode }) => {
  console.log(mapMode);
  return (
    <ButtonGroup
      variant="outlined"
      aria-label="Custom button group"
      sx={{
        width: "80%",
        height: "44px",
        borderRadius: "8px",
        border: "1px solid #D4D4D4",
        "& .MuiButton-root": {
          color: "var(--ods-ref-color-gray-600, #666)",
          fontFamily: "Roboto",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "24px",
          letterSpacing: "0.4px",
          textTransform: "capitalize",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "rgba(48, 63, 159, 0.1)",
            border: "1px solid #D4D4D4",
          },
          padding: "8px 16px",
        },
      }}
    >
      <Button
        sx={{
          width: "33%",
          border: "1px solid #D4D4D4",
          backgroundColor: mapMode === 0 ? "#303f9f" : "transparent", // Selected button background
          color: mapMode === 0 ? "#fff" : "var(--ods-ref-color-gray-600, #666)", // Selected button color
        }}
        onClick={() => setMapMode(0)}
      >
        Interactive Mode
      </Button>
      <Button
        sx={{
          width: "34%",
          border: "1px solid #D4D4D4",
          backgroundColor: mapMode === 1 ? "#303f9f" : "transparent", // Selected button background
          color: mapMode === 1 ? "#fff" : "var(--ods-ref-color-gray-600, #666)", // Selected button color
        }}
        onClick={() => setMapMode(1)}
      >
        Tuta-Abs. Heatmap
      </Button>
      <Button
        sx={{
          width: "34%",
          border: "1px solid #D4D4D4",
          backgroundColor: mapMode === 2 ? "#303f9f" : "transparent", // Selected button background
          color: mapMode === 2 ? "#fff" : "var(--ods-ref-color-gray-600, #666)", // Selected button color
        }}
        onClick={() => setMapMode(2)}
      >
        Oidium Heatmap
      </Button>
    </ButtonGroup>
  );
};

export default CustomButtonGroup;
