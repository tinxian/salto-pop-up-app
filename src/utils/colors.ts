export enum BrandingColors {
    purple = '#7B33EC',
}

export enum BackgroundColors {
    white = '#ffffff',
    gray = '#cccccc',
    darkGray = '#444444',
}

export enum TypographyColors {
    text = '#000000',
    lightGray = '#cccccc',
}

export enum BorderColors {
    lightGray = '#cccccc',
}

export enum ButtonColors {
    // active
    active = '#7B33EC',
    activeText = '#ffffff',
    activePressed = '#522393',
    // default
    default = '#f3f3f3',
    defaultText = '#007bc7',
    defaultPressed = '#e6e6e6',
    // disabled
    disabled = '#cccccc',
    disabledText = '#999999',
    disabledPressed = '#cccccc',

    // other
    pressed = '#f3f3f3',
}

export enum InputColors {
    border = '#dfdfdf',
    background = '#ffffff',
    disabled = '#ebebeb',
    focused = '#111111',
}

export enum StateColors {
    error = '#d52b1e',
    warning = '#e17000',
    success = '#39870c',
}

// path to colors will work like this colors.branding.purple
export const colors = {
    branding: BrandingColors,
    background: BackgroundColors,
    buttons: ButtonColors,
    state: StateColors,
    input: InputColors,
    typography: TypographyColors,
    border: BorderColors,
}
