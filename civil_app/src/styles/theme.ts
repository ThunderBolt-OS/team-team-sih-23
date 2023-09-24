import { createTheme } from "@mui/material";

const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#4fa0fe",
      contrastText: "#fcfdfe",
    },
    text: {
      primary: "#474C59",
    },
  },

  typography: {
    fontFamily: ["Poppins", "Roboto", "Arial", "sans-serif"].join(","),
  },
  shape: {
    borderRadius: 6,
  },
});

export const theme = createTheme({
  ...globalTheme,
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "0px 10px",
          background: globalTheme.palette.background.paper,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          height: 500,
        },
        main: {
          overflow: "unset",
        },
        columnHeaderTitle: {
          color: globalTheme.palette.text.primary,
        },
        columnHeaders: {
          top: 0,
          zIndex: 1,
          position: "sticky",
          border: "none",
          borderRadius: 6,
          marginBottom: 10,
          backgroundColor: globalTheme.palette.background.paper,
        },
        cell: {
          border: "none",
        },
        row: {
          borderRadius: 6,
          backgroundColor: globalTheme.palette.background.paper,
        },
      },
    },
  },
});
