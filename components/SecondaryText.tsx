import { Typography, TypographyProps, useTheme } from "@mui/material";

interface SecondaryTextProps extends Omit<TypographyProps, "color"> {}

export default function SecondaryText(props: SecondaryTextProps) {
  const theme = useTheme();
  return <Typography {...props} color={theme.palette.text.secondary} />;
}
