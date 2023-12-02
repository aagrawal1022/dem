// IncomeForm.tsx
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
  Switch,
} from "@mui/material";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { BankAccount } from "utils/types/bankAccount";
import {
  IncomeCategory,
  IncomeCategoryTitle,
  OtherIncomeCategory,
  OtherIncomeCategoryTitle,
} from "./IncomeForm.const";

export const IncomeForm = () => {
  const { bankAccounts } = useSelector((state: RootState) => state.user.user);
  const [amount, setAmount] = useState<number>();
  const [description, setDescription] = useState("");
  const [bankAccount, setBankAccount] = useState<BankAccount>();
  const [incomeCategory, setIncomeCategory] = useState<IncomeCategory>(
    IncomeCategory.Salary
  );
  const [otherIncomeCategory, setOtherIncomeCategory] =
    useState<OtherIncomeCategory>(OtherIncomeCategory.ProvidentFund);
  const [isOtherIncomeEnabled, setIsOtherIncomeEnabled] = useState(false);

  const handleAddIncome = () => {
    console.log("Adding income:", {
      amount,
      description,
      bankAccount,
      incomeCategory,
      isOtherIncomeEnabled,
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom align="center">
        Add Income
      </Typography>
      <Grid item container alignItems="center">
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Enable Other Income</Grid>
            <Grid item>
              <Switch
                checked={isOtherIncomeEnabled}
                onChange={() => setIsOtherIncomeEnabled(!isOtherIncomeEnabled)}
                name="otherIncomeToggle"
              />
            </Grid>
          </Grid>
        </Typography>
      </Grid>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          {!isOtherIncomeEnabled && (
            <>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Bank Account</InputLabel>
                  <Select
                    value={bankAccount}
                    onChange={(e) =>
                      setBankAccount(e.target.value as BankAccount)
                    }
                  >
                    {bankAccounts.map((option: BankAccount) => (
                      <MenuItem key={option.bankName} value={option.bankName}>
                        {`${option.bankName} - ${option?.lastFourDigit}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Income Category</InputLabel>
                  <Select
                    value={incomeCategory}
                    onChange={(e) =>
                      setIncomeCategory(e.target.value as IncomeCategory)
                    }
                  >
                    {Object.values(IncomeCategory).map((category) => (
                      <MenuItem key={category} value={category}>
                        {IncomeCategoryTitle[category]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
          {isOtherIncomeEnabled && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Other Income Category</InputLabel>
                <Select
                  value={otherIncomeCategory}
                  onChange={(e) =>
                    setOtherIncomeCategory(
                      e.target.value as OtherIncomeCategory
                    )
                  }
                >
                  {Object.values(OtherIncomeCategory).map((category) => (
                    <MenuItem key={category} value={category}>
                      {OtherIncomeCategoryTitle[category]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Button
          type="button"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleAddIncome}
        >
          Add Income
        </Button>
      </form>
    </Container>
  );
};
