import { AccountBalance } from "@mui/icons-material";
import { Container, styled } from "@mui/material";

import ButtonLink from "../../components/ButtonLink";
import { User } from "../../types/User";
import UserAccountMenu from "./UserAccountMenu";

interface HeaderProps {
  user: User;
}

const StyledHeader = styled("header")(({ theme }) => ({
  display: "flex",
  padding: 16,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.getContrastText(theme.palette.background.default),
  marginBottom: 20,
}));

export default function Header({ user }: HeaderProps) {
  return (
    <StyledHeader>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ButtonLink
          href="/"
          color="inherit"
          endIcon={<AccountBalance fill="currentColor" />}
        >
          My Bank
        </ButtonLink>

        <UserAccountMenu user={user} />
      </Container>
    </StyledHeader>
  );
}
