import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif'
        ].join(','),
    },
    transitions: {
        // Disable all transitions globally
        create: () => 'none',
    },
    components: {
        // Disable transitions for specific components that commonly cause issues
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiListItemButton: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiSelect: {
            defaultProps: {
                MenuProps: {
                    disableAutoFocusItem: true,
                    transitionDuration: 0,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                SelectProps: {
                    MenuProps: {
                        disableAutoFocusItem: true,
                        transitionDuration: 0,
                    },
                },
            },
        },
        MuiMenu: {
            defaultProps: {
                transitionDuration: 0,
            },
        },
        MuiPopover: {
            defaultProps: {
                transitionDuration: 0,
            },
        },
    },
});
