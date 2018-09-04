import glamorous from 'glamorous';

export const StyledBox = glamorous.div(({ theme }) => {
    return {
        border: `3px solid ${theme.colors.core.hex}`,
        borderRadius: "3px",
        padding: theme.padding[2],
        fontSize: theme.text.sizes.md,
        lineHeight: theme.text.lineHeight.wider,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 400,
        height: 225
    };
});