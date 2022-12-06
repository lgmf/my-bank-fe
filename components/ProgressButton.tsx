import { Button, ButtonProps, Skeleton } from "@mui/material";

interface ProgressButton extends ButtonProps {
  loading?: boolean;
}

export default function ProgressButton({
  children,
  disabled,
  sx,
  loading = false,
  ...rest
}: ProgressButton) {
  return (
    <Button
      {...rest}
      disabled={loading || disabled}
      sx={{ ...sx, position: "relative" }}
    >
      {loading && (
        <Skeleton
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            transform: "none",
          }}
          animation="wave"
        />
      )}

      {children}
    </Button>
  );
}
