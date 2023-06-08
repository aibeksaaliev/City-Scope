import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "@/configs/axiosApi";
import { FeedbackMutation } from "@/features/feedacks/types";

export const createFeedback = createAsyncThunk<void, {feedback: FeedbackMutation, id: number}>(
  'feedbacks/createFeedback',
  async ({feedback, id}) => {
    try {
      await axiosApi.post(`/feedbacks?locationId=${id}`, feedback);
    } catch (e) {
      throw new Error();
    }
  }
)