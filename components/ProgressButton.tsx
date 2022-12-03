import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface ProgressButton extends ButtonProps {
  loading: boolean;
}

export default function ProgressButton({
  children,
  disabled,
  loading = false,
  ...rest
}: ProgressButton) {
  return (
    <Button {...rest} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
}
