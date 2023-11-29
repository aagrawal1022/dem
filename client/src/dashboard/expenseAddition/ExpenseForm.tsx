import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { PaymentMethod, PaymentMethodTitle } from "./ExpenseForm.const";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { CardTypeTitle } from "utils/types/plasticCard";

export const ExpenseForm = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Cash
  );
  const [selectedCardOption, setSelectedCardOption] = useState("");
  const [selectedUpiOption, setSelectedUpiOption] = useState("");
  const { cardDetails, bankAccounts } = useSelector(
    (state: RootState) => state.user.user
  );

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Add Expense
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Amount" type="number" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Payment Mode</InputLabel>
              <Select
                value={paymentMethod}
                onChange={handlePaymentMethodChange as any}
              >
                {Object.values(PaymentMethod).map((paymentMethod) => (
                  <MenuItem key={paymentMethod} value={paymentMethod}>
                    {PaymentMethodTitle[paymentMethod]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {paymentMethod === PaymentMethod.Card && cardDetails.length && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Card Option</InputLabel>
                <Select
                  value={selectedCardOption}
                  onChange={(e) =>
                    setSelectedCardOption(e.target.value as string)
                  }
                >
                  {cardDetails.map((option) => (
                    <MenuItem key={option.cardName} value={option.cardName}>
                      {`${option.cardName} - ${CardTypeTitle[option.cardType]} - ${option?.lastFourDigit}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          {paymentMethod === PaymentMethod.UPI && bankAccounts.length && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Bank Account</InputLabel>
                <Select
                  value={selectedUpiOption}
                  onChange={(e) =>
                    setSelectedUpiOption(e.target.value as string)
                  }
                >
                  {bankAccounts.map((option) => (
                    <MenuItem key={option.bankName} value={option.bankName}>
                      {`${option.bankName} - ${option?.lastFourDigit}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Add Expense
        </Button>
      </form>
    </Container>
  );
};
