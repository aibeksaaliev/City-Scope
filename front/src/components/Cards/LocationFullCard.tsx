import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Button, CardMedia } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectSelectedLocation, unsetLocation } from "@/features/locations/locationsSlice";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import { apiURL } from "@/configs/constants";
import CardActions from "@mui/material/CardActions";
import { addLocationToFavorites } from "@/features/users/usersThunks";
import { selectUser } from "@/features/users/usersSlice";
import CreateFeedbackForm from "@/components/Forms/LocationForms/CreateFeedbackForm";
import FeedbackCard from "@/components/Cards/FeedbackCard";
import { fetchLocationById } from "@/features/locations/locationsThunks";

interface Props {
  id: number;
}

const LocationFullCard: React.FC<Props> = ({id}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const selectedLocation = useAppSelector(selectSelectedLocation);
  const [modalStatus, setModalStatus] = useState(false);

  const favoriteStatus = user && user.favoriteLocations.some((location) => location.id === selectedLocation?.id);

  const closeFullCard = () => {
    dispatch(unsetLocation());
    history.back();
  };

  const openCreateFeedbackForm = () => {
    setModalStatus(true);
  };

  const closeCreateFeedbackForm = () => {
    setModalStatus(false);
  };

  const addToFavorites = (locationID: number) => {
    dispatch(addLocationToFavorites(locationID));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationById(id));
    }
  }, [dispatch, id]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 350,
        marginLeft: "auto",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 350, boxSizing: "border-box" }
      }}
    >
      <Box sx={{ overflow: "auto", paddingTop: "64px" }}>
        <Button
          onClick={closeFullCard}
        >
          Close
        </Button>
        <Divider />
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500], fontSize: "10px" }} aria-label="recipe">
                LOGO
              </Avatar>
            }
            action={
              <IconButton onClick={() => addToFavorites(selectedLocation?.id!)}>
                {favoriteStatus ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            }
            title={selectedLocation?.title}
            subheader={selectedLocation?.description}
          />
          <CardContent>
            <Box sx={{ display: "flex" }}>
              <IconButton size="small" sx={{ marginRight: 1 }}>
                <LocationOnIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {selectedLocation?.address}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
              >
                {selectedLocation?.images?.map((img, index) => {
                  return <SwiperSlide key={index}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={apiURL + img}
                      alt="Paella dish"
                      sx={{ borderRadius: "5px" }}
                    />
                  </SwiperSlide>;
                })}
              </Swiper>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton size="small" sx={{ marginRight: 1 }}>
                <ScheduleIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {selectedLocation?.workingHours}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton size="small" sx={{ marginRight: 1 }}>
                <LocalPhoneIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {selectedLocation?.contacts}
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Box sx={{ background: "#333333", borderRadius: "10px", color: "#FFFFFF", p: 0.5, textAlign: "center" }}>
                <Typography sx={{ fontSize: "15px", textTransform: "uppercase" }}>Reviews</Typography>
              </Box>
            </Box>
            {selectedLocation?.feedbacks.map((feedback) => {
              return <FeedbackCard key={feedback.id} feedback={feedback}/>;
            })}
            {/*<ApproveLocationForm id={selectedLocation?.id!}/>*/}
          </CardContent>
          <CardActions sx={{ width: "100%" }}>
          </CardActions>
        </Card>
      </Box>
      <Box sx={{ position: "sticky", top: "100%" }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#333333", color: "#FFFFFF" }}
          onClick={openCreateFeedbackForm}
        >Leave a review</Button>
        <CreateFeedbackForm isModalOpen={modalStatus} closeModal={closeCreateFeedbackForm} />
      </Box>
    </Drawer>
  );
};

export default LocationFullCard;