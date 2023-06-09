import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Avatar, Rating, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import { FeedbackType } from "@/features/feedacks/types";
import dayjs from "dayjs";

interface Props {
  feedback: FeedbackType;
}

const FeedbackCard: React.FC<Props> = ({feedback}) => {
  const createdDate = dayjs(feedback.createdAt).format('MMMM D, YYYY');

  return (
    <Card sx={{mb: 5}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], fontSize: "9px", width: "28px", height: "28px" }} aria-label="recipe">
            USER
          </Avatar>
        }
        titleTypographyProps={{ variant: "h6", sx: { fontSize: "13px" } }}
        subheaderTypographyProps={{ variant: "body2", sx: { fontSize: "10px" } }}
        title={feedback.user.email}
        subheader={createdDate}
      />
      <CardContent>
        <Typography>{feedback.comment}</Typography>
        <Rating defaultValue={feedback.rating} readOnly/>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;