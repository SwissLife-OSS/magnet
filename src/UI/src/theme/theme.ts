import { createTheme } from "@mui/material/styles"

const theme = createTheme({
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

export default theme