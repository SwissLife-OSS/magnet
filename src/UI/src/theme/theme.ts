import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif'
        ].join(','),
    },
    components: {
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    position: "absolute",
                    top: "45%",
                    left: "50%"
                },
            }
        }
    },
    
});
