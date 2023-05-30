import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LocationType } from "@/features/locations/types";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

interface Props {
  location: LocationType;
  onClick: () => void;
}

const LocationPreviewCard: React.FC<Props> = ({location, onClick}) => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], fontSize: "10px" }} aria-label="recipe">
            LOGO
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={location.title}
        subheader={location.address}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {location.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button
          onClick={onClick}
        >
          Approve
        </Button>
      </CardActions>
      <Divider/>
    </Card>
  );
}

export default LocationPreviewCard;
