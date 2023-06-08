import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Rating, TextField } from "@mui/material";
import { FeedbackMutation } from "@/features/feedacks/types";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createFeedback } from "@/features/feedacks/FeedbacksThunks";
import { selectSelectedLocation } from "@/features/locations/locationsSlice";

const CreateFeedbackForm = () => {
  const dispatch = useAppDispatch();
  const selectedLocation = useAppSelector(selectSelectedLocation);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const id = selectedLocation?.id!;
    const feedback: FeedbackMutation = {rating, comment};
    dispatch(createFeedback({feedback, id}));
  };

  return (
    <Dialog open={true}>
      <DialogTitle sx={{ fontSize: "16px" }}>
        Leave a review
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={submitForm}>
          <Rating
            name="rating"
            size="large"
            onChange={(event, value) => setRating(value)}
          />
          <TextField
            type="text"
            multiline
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Type a review here"
            fullWidth
          />
          <LoadingButton
            type="submit"
          >
            Send
          </LoadingButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeedbackForm;