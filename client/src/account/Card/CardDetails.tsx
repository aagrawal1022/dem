import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { RootState, store } from "store/store";
import { AddCardDetails, CardTypeTitle } from "./CardDetails.const";
import { useMutation } from "@apollo/client";
import { cardGqls } from "./CardDetails.gqls";
import { update as updateUserData } from "store/slices/authSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CardType } from "utils/types/plasticCard";

const RemoveCardButton = ({ onClick }: any) => (
  <IconButton color="secondary" onClick={onClick}>
    <CloseIcon />
  </IconButton>
);

const EditCardButton = ({ onClick }: any) => (
  <IconButton color="primary" onClick={onClick}>
    <EditIcon />
  </IconButton>
);

export const CardDetails = () => {
  const { cardDetails, id: userId } = useSelector(
    (state: RootState) => state.user.user
  );
  const {
    control,
    handleSubmit,
    reset,
    register,
    unregister,
    formState: { errors },
  } = useForm<AddCardDetails>();
  const [cards, setCards] = useState(cardDetails);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
  const [removingCard] = useMutation(cardGqls.mutations.removeCard);
  const [addingCard] = useMutation(cardGqls.mutations.addCard);

  const handleAddCard = () => {
    setAddCardModalOpen(true);
  };

  const handleSaveCard: SubmitHandler<AddCardDetails> = async (
    formData: any
  ) => {
    const cardDetails = {
      ...formData,
      lastFourDigit: +formData.lastFourDigit,
      userId: +userId,
    } as AddCardDetails;
    
    const result = await addingCard({
      variables: {
        cardDetails,
      },
    });

    store.dispatch(updateUserData(result.data?.addCard));

    setCards(result.data?.addCard?.cardDetails);
    setAddCardModalOpen(false);
  };

  const handleDeleteCard = (cardId: number) => {
    setDeleteDialogOpen(true);
    setSelectedCardId(cardId);
  };

  const confirmDeleteCard = async () => {
    const result = await removingCard({
      variables: {
        cardId: +selectedCardId,
        userId: +userId,
      },
    });
    store.dispatch(updateUserData(result.data?.removeCard));

    if (selectedCardId !== null) {
      setCards((prevCards) =>
        prevCards.filter((card) => card.id !== selectedCardId)
      );
      setDeleteDialogOpen(false);
      setSelectedCardId(null);
    }
  };

  const cancelDeleteCard = () => {
    setDeleteDialogOpen(false);
    setSelectedCardId(null);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        My Cards
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ font: "initial" }}>Nickname</TableCell>
              <TableCell style={{ font: "initial" }}>Card Type</TableCell>
              <TableCell style={{ font: "initial" }}>
                Last Four Digits
              </TableCell>
              <TableCell style={{ font: "initial" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell>{card.cardName}</TableCell>
                <TableCell>{CardTypeTitle[card.cardType]}</TableCell>
                <TableCell>{`X-${card.lastFourDigit}`}</TableCell>
                <TableCell>
                  <EditCardButton onClick={() => handleDeleteCard(card.id)} />
                  <RemoveCardButton onClick={() => handleDeleteCard(card.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" onClick={handleAddCard}>
        Add New Card
      </Button>
      <Dialog
        open={isAddCardModalOpen}
        onClose={() => setAddCardModalOpen(false)}
      >
        <DialogTitle>Add New Card</DialogTitle>
        <form onSubmit={handleSubmit(handleSaveCard)}>
          <DialogContent>
            <DialogContentText>
              Please enter the details for the new card.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Card Name"
              type="text"
              fullWidth
              required
              {...register("cardName", {
                required: "Card Name is required",
              })}
            />
            <TextField
              margin="dense"
              label="Last Four Digits"
              type="number"
              fullWidth
              {...register("lastFourDigit")}
            />
            <FormControl fullWidth>
              <InputLabel>Card Type</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field} value={field.value || ""}>
                    <MenuItem value={CardType.DebitCard}>Debit</MenuItem>
                    <MenuItem value={CardType.CreditCard}>Credit</MenuItem>
                  </Select>
                )}
                name="cardType"
                control={control}
                rules={{ required: "Card Type is required" }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddCardModalOpen(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={cancelDeleteCard}>
        <DialogTitle>Delete Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this card?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCard} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteCard} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
