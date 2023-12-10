// IncomeForm.tsx
import React, { useEffect, useState } from "react";
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
  AddIncomeInput,
  IncomeCategory,
  IncomeCategoryTitle,
  OtherIncomeCategory,
  OtherIncomeCategoryTitle,
} from "./IncomeForm.const";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { incomeGqls } from "./Income.gqls";

export const IncomeForm = () => {
  const { bankAccounts, id: userId } = useSelector(
    (state: RootState) => state.user.user
  );
  const {
    control,
    handleSubmit,
    reset,
    register,
    unregister,
    formState: { errors },
  } = useForm<AddIncomeInput>();
  const [isPseudoIncome, setIsPseudoIncome] = useState(false);
  const [addingIncome] = useMutation(incomeGqls.mutations.addIncome);

  const onSubmit: SubmitHandler<AddIncomeInput> = async (formData) => {
    const incomeDetails = {
      ...formData,
      amount: parseFloat(formData.amount as string),
      incomeDate: new Date().toISOString().slice(0, -5),
      userId: +userId,
      isPseudoIncome,
    };
    const result = await addingIncome({
      variables: {
        incomeDetails,
      },
    });
    reset();
  };

  useEffect(() => {
    if (isPseudoIncome) {
      unregister("bankAccountId");
    }
  }, [isPseudoIncome]);
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
                checked={isPseudoIncome}
                onChange={() => setIsPseudoIncome(!isPseudoIncome)}
                name="pseudoIncomeToggle"
              />
            </Grid>
          </Grid>
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              required
              {...register("amount", { required: "Amount is required" })}
            />
            {errors.amount && (
              <span role="alert" style={{ color: "red" }}>
                {errors.amount.message}
              </span>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              required
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span role="alert" style={{ color: "red" }}>
                {errors.description.message}
              </span>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Income Category</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field} value={field.value || ""}>
                    {Object.values(
                      isPseudoIncome ? OtherIncomeCategory : IncomeCategory
                    ).map(
                      (
                        incomeCategory: OtherIncomeCategory | IncomeCategory
                      ) => (
                        <MenuItem key={incomeCategory} value={incomeCategory}>
                          {isPseudoIncome
                            ? OtherIncomeCategoryTitle[
                                incomeCategory as OtherIncomeCategory
                              ]
                            : IncomeCategoryTitle[
                                incomeCategory as IncomeCategory
                              ]}
                        </MenuItem>
                      )
                    )}
                  </Select>
                )}
                name="category"
                control={control}
                rules={{ required: "Income Category is required" }}
              />
              {errors.category && (
                <span role="alert" style={{ color: "red" }}>
                  {errors.category.message}
                </span>
              )}
            </FormControl>
          </Grid>
          {!isPseudoIncome && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Bank Account</InputLabel>
                <Controller
                  render={({ field }) => (
                    <Select {...field} value={field.value || ""}>
                      {bankAccounts.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {`${option.bankName} - ${option?.lastFourDigit}`}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name="bankAccountId"
                  control={control}
                  rules={{ required: "Bank Account is required" }}
                />
                {errors.bankAccountId && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.bankAccountId.message}
                  </span>
                )}
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
          Add Income
        </Button>
      </form>
    </Container>
  );
};
