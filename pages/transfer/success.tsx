import { Box, Typography } from "@mui/material";
import Image from "next/image";

import paymentImage from "../../assets/payment-svgrepo-com.svg";

import ButtonLink from "../../components/ButtonLink";
import SecondaryText from "../../components/SecondaryText";
import PrivateLayout from "../../layout/PrivateLayout";
import { ensureAuth } from "../../utils/ensureAuth";

export default function TransferSuccessPage() {
  return (
    <PrivateLayout documentTitle="Transfer Success">
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

export const getServerSideProps = ensureAuth();
