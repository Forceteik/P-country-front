import { createTheme, Theme } from '@mui/material';
import { createBreakpoints } from '@mui/system';

import { blueMain, blueHover, blueLight, black, gray, pinkMain, midDarkGray } from './colorPalette';

const breakpoints = createBreakpoints({});

declare module '@mui/styles/defaultTheme' {
  // @ts-ignore
  type DefaultTheme = Theme;
}

// type CustomType = {
//   MuiPickersBasePicker: {
//     pickerView: {
//       maxWidth?: string;
//     };
//     container: {
//       justifyContent?: string;
//       paddingTop?: string;
//       alignItems?: string;
//     };
//   };
//   MuiPickersYearSelection: {
//     container: {
//       minWidth?: string;
//       paddingTop?: string;
//     };
//   };
//   MuiPickersModal: {
//     dialogRoot: {
//       minWidth?: string;
//       borderRadius?: string;
//       color?: string;
//     };
//     withAdditionalAction: {
//       "&:first-child": {
//         display?: string;
//       };
//       "justifyContent"?: string;
//     };
//   };
//   MuiPickersDatePickerRoot: {
//     toolbarLandscape: {
//       display?: string;
//     };
//     toolbar: {
//       display?: string;
//     };
//   };
//
//   MuiDialogActions: {
//     root: {
//       "& .MuiButton-label": {
//         color?: string;
//         padding?: string;
//         transition?: string;
//         fontFamily?: string;
//       };
//       "& .MuiButton-root": {
//         border?: string;
//         borderRadius?: string;
//         margin?: string;
//         transition?: string;
//       };
//       "& .MuiButtonBase-root:first-child": {
//         display?: string;
//       };
//       "& .MuiButton-textPrimary:hover": {
//         "backgroundColor"?: string;
//         "& .MuiButton-label": {
//           color?: string;
//         };
//       };
//       "padding"?: string;
//     };
//   };
// };

// declare module "@mui/material/styles/overrides" {
//   interface ComponentNameToClassKey extends overridesNameToClassKey {}
//   export interface ComponentNameToClassKey extends CustomType {}
// }

/**
 * All future global styles, and mui component overrides should be implemented there
 */
// Все стили оверрайда, закомиченные внизу, остались от версии mui4 и не встают в mui5. Надо читать доку и дорабатывать эти стили.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: blueMain,
    },
    secondary: {
      main: '#419CF9',
      dark: '#003B77',
    },
  },
  typography: {
    fontFamily: 'inter',
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            textDecoration: 'none !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .Mui-disabled': {
            '& fieldset': {
              border: 'none',
            },
          },
        },
        input: {
          'paddingBottom': 10,
          '&:-webkit-autofill': {
            backgroundColor: 'unset',
            WebkitBoxShadow: '0 0 0 1000px #fff inset !important',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          transform: 'translate(27px, 25px) scale(1)',
          [breakpoints.down('xs')]: {
            transform: 'translate(22px, 19px) scale(1)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& .Mui-disabled': {
            backgroundColor: gray,
            border: 'none',
            // minHeight: 60
          },
        },
        input: {
          'paddingRight': 20,
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'inset 0 0 0 1000px #fff inset !important',
          },
        },
      },
    },
    // MuiPickersYearSelection: {
    //   styleOverrides: {
    //     container: {
    //       minWidth: 346,
    //       paddingTop: 22,
    //     },
    //   },
    // },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: midDarkGray,
          fontSize: '16px',
        },
      },
    },
    // MuiPickersDatePickerRoot: {
    //   styleOverrides: {
    //     toolbarLandscape: {
    //       display: "none",
    //     },
    //     toolbar: {
    //       display: "none",
    //     },
    //   },
    // },
    // MuiPickersBasePicker: {
    //   styleOverrides: {
    //     container: {
    //       justifyContent: "center",
    //       paddingTop: 22,
    //       alignItems: "center",
    //     },
    //   },
    // },
    // MuiPickersModal: {
    //   styleOverrides: {
    //     dialogRoot: {
    //       minWidth: 377,
    //       borderRadius: 20,
    //       color: "#000000",
    //     },
    //     withAdditionalAction: {
    //       "&:first-child": {
    //         display: "none",
    //       },
    //       "justifyContent": "center",
    //     },
    //   },
    //
    // },
    MuiIconButton: {
      styleOverrides: {
        colorSecondary: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          '& .MuiButton-label': {
            color: black,
            fontFamily: 'inter-med',
            padding: '5px 15px',
            transition: 'all 0.5s',
          },
          '& .MuiButton-root': {
            border: `1px solid ${gray}`,
            margin: 10,
            transition: 'all 0.5s',
          },
          '& .MuiButtonBase-root:first-child': {
            display: 'none',
          },
          '& .MuiButton-textPrimary:hover': {
            'backgroundColor': blueHover,
            '& .MuiButton-label': {
              color: '#fff',
            },
          },
          'padding': '4px 0px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          'fontSize': '9px',
          '&.Mui-error': {
            // position: 'absolute',
            // bottom: -12,
            lineHeight: '110%',
            [breakpoints.down('xs')]: {
              position: 'relative',
              bottom: 'unset',
            },
          },
          [breakpoints.down('xs')]: {
            fontSize: '12px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          'backgroundColor': blueLight,
          'borderRadius': 8,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: gray,
            },
            '&:hover fieldset': {
              borderColor: '#a7cdfa',
            },
            '&.Mui-focused fieldset': {
              borderColor: blueMain,
              borderWidth: 1,
            },
            '&.Mui-error fieldset': {
              borderColor: pinkMain,
            },
          },
          '& label.Mui-focused': {
            color: blueMain,
          },
          '& label.Mui-error': {
            color: pinkMain,
          },
          '& .MuiOutlinedInput-root.Mui-disabled': {
            '& fieldset': {
              border: 'none',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // root: {
        //   "&.MuiSelect-select:focus": {
        //     backgroundColor: "#ffffff",
        //   },
        // },
        select: {
          '&:focus': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
          a {
            color: ${black};
            text-decoration: none;
          },
          html {
            height: "100%";
          },
          body {
            min-height: 100%;
            background-color: #fff;
          },
      `,
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          zIndex: 1300,
        },
      },
    },
  },
});

export default theme;
