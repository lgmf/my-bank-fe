import {
  Autocomplete,
  Box,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";

import paymentImage from "../../assets/payment-svgrepo-com.svg";

import ButtonLink from "../../components/ButtonLink";
import SecondaryText from "../../components/SecondaryText";
import PrivateLayout from "../../layout/PrivateLayout";
import { User } from "../../types/User";
import { ensureAuth } from "../../utils/ensureAuth";

interface TransferSuccessPageProps {
  authenticatedUser: User;
}

export default function TransferSuccessPage({
  authenticatedUser,
}: TransferSuccessPageProps) {
  const theme = useTheme();

  return (
    <PrivateLayout documentTitle="Transfer Success" user={authenticatedUser}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Image src={paymentImage} width={250} height={250} alt="" />

        <Box>
          <Typography gutterBottom variant="h5" textAlign="center">
            Transfer Succeeded! 🎉
          </Typography>

          <SecondaryText gutterBottom variant="body1">
            Your transfer process has been completed successfully!
          </SecondaryText>
        </Box>

        <ButtonLink href="/" variant="contained">
          Back to Home
        </ButtonLink>
      </Box>
    </PrivateLayout>
  );
}

export const getServerSideProps = ensureAuth(async ({ user }) => {
  return {
    props: {
      authenticatedUser: user,
    },
  };
});
