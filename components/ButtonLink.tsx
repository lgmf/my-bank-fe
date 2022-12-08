import { Button, ButtonProps } from "@mui/material";
import NextLink from "next/link";

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

export default function ButtonLink({
  href,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <NextLink href={href} tabIndex={-1}>
      <Button {...rest}>{children}</Button>
    </NextLink>
  );
}
