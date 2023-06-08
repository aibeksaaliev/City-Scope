import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { LocationType } from "@/features/locations/types";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/users/usersSlice";

interface Props {
  location: LocationType;
  onClick?: () => void;
}

const LocationPreviewCard: React.FC<Props> = ({location, onClick}) => {
  const user = useAppSelector(selectUser);

  return (
    <Card sx={{ maxWidth: 350, mb: 1 }} onClick={onClick}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], fontSize: "10px" }} aria-label="recipe">
            LOGO
          </Avatar>
        }
        title={location.title}
        subheader={location.description}
        onClick={(e) => e.stopPropagation()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {location.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        {user && user.role === "admin" ? (
          <Button
            onClick={onClick}
          >
            Approve
          </Button>
        ) : null}
      </CardActions>
      <Divider/>
    </Card>
  );
}

export default LocationPreviewCard;
