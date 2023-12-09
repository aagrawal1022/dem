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
} from "@mui/material";
import {
  AddExpenseInput,
  ExpenseCategory,
  ExpenseCategoryTitle,
  PaymentMethod,
  PaymentMethodTitle,
} from "./ExpenseForm.const";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { CardTypeTitle } from "utils/types/plasticCard";
import { useMutation } from "@apollo/client";
import { expenseGqls } from "./Expense.gqls";

export const ExpenseForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    unregister,
    formState: { errors },
  } = useForm<AddExpenseInput>();
  const {
    cardDetails,
    bankAccounts,
    id: userId,
  } = useSelector((state: RootState) => state.user.user);
  const [addingExpense] = useMutation(expenseGqls.mutations.addExpense);
  const watchPaymentMethod = watch("paymentMethod");
  const onSubmit: SubmitHandler<AddExpenseInput> = async (
    expenseData: AddExpenseInput
  ) => {
    const expenseDetails = {
      ...expenseData,
      amount: parseFloat(expenseData.amount as string),
      expenseDate: new Date().toISOString().slice(0, -5),
      userId: +userId,
    };
    const result = await addingExpense({
      variables: {
        expenseDetails,
      },
    });
    reset();
  };

  useEffect(() => {
    if (watchPaymentMethod === PaymentMethod.Cash) {
      unregister("cardId");
      unregister("bankAccountId");
    } else if (watchPaymentMethod === PaymentMethod.Card) {
      unregister("bankAccountId");
    } else {
      unregister("cardId");
    }
  }, [watchPaymentMethod]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Add Expense
      </Typography>
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
              <InputLabel>Category</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field} value={field.value || ""}>
                    {Object.values(ExpenseCategory).map((expenseCategory) => (
                      <MenuItem key={expenseCategory} value={expenseCategory}>
                        {ExpenseCategoryTitle[expenseCategory]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                name="category"
                control={control}
                rules={{ required: "Payment Method is required" }}
              />
              {errors.category && (
                <span role="alert" style={{ color: "red" }}>
                  {errors.category.message}
                </span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Payment Mode</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field} value={field.value || ""}>
                    {Object.values(PaymentMethod).map((paymentMethod) => (
                      <MenuItem key={paymentMethod} value={paymentMethod}>
                        {PaymentMethodTitle[paymentMethod]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                name="paymentMethod"
                control={control}
                rules={{ required: "Payment Method is required" }}
              />
              {errors.paymentMethod && (
                <span role="alert" style={{ color: "red" }}>
                  {errors.paymentMethod.message}
                </span>
              )}
            </FormControl>
          </Grid>
          {watchPaymentMethod === PaymentMethod.Card && cardDetails.length && (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Card Option</InputLabel>
                <Controller
                  render={({ field }) => (
                    <Select {...field} value={field.value || ""}>
                      {cardDetails.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {`${option.cardName} - ${
                            CardTypeTitle[option.cardType]
                          } - ${option?.lastFourDigit}`}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name="cardId"
                  control={control}
                  rules={{ required: "Card Option is required" }}
                />
                {errors.cardId && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.cardId.message}
                  </span>
                )}
              </FormControl>
            </Grid>
          )}
          {watchPaymentMethod === PaymentMethod.UPI && bankAccounts.length && (
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
          Add Expense
        </Button>
      </form>
    </Container>
  );
};
