import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useTrackings } from "./useTrackings";
import { format } from "date-fns";
import { TrackingModal } from "./TrackingModal";
import { TTrackingPublication } from "./types";
import { grey } from "@mui/material/colors";
import {
  addTracking,
  deleteTracking,
  fetchAllTrackings,
  fetchAllTrackingsByUser,
  updateTracking,
} from "../../store/trackings/trackingsThunks";
import { TTracking } from "../../store/trackings/types";
import { useAppDispatch, useAppSelector } from "../../store";
import { UserRoles } from "../../store/users/types";
import { fetchAllUsers } from "../../store/users/usersThunks";
import { fetchAllPublications } from "../../store/publications/publicationsThunks";
import { AddButton } from "../../common/components/AddButton";

export const TrackingsPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.users.user);
  const isUser = user?.role === UserRoles.user;

  const [trackingModal, setTrackingModal] = useState<{
    open: boolean;
    tracking: TTrackingPublication | null;
  }>({ open: false, tracking: null });

  const trackingPublications = useTrackings();

  useEffect(() => {
    isUser && user
      ? dispatch(fetchAllTrackingsByUser(user.userID))
      : dispatch(fetchAllTrackings());
  }, [isUser, user]);

  const handleClose = useCallback(() => {
    setTrackingModal({ open: false, tracking: null });
  }, []);

  const onSubmit = useCallback(
    (data: Partial<TTracking>) => {
      if (trackingModal.tracking) {
        dispatch(
          updateTracking({
            id: trackingModal.tracking?.trackID.toString() || "",
            data,
          })
        );

        return;
      }

      dispatch(addTracking(data));

      handleClose();
    },
    [trackingModal]
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteTracking(trackingModal.tracking?.trackID.toString() || ""));

    handleClose();
  }, [trackingModal]);

  useEffect(() => {
    !isUser && dispatch(fetchAllUsers());
    dispatch(fetchAllPublications());
  }, [isUser]);

  return (
    <>
      <Grid container spacing={2} pr={4} pl={4} mt={1}>
        {trackingPublications.map((tracking) => (
          <Grid item xs={12} key={tracking.pubID}>
            <Card
              sx={{ width: "100%", cursor: "pointer" }}
              onClick={() => {
                setTrackingModal({ open: true, tracking });
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                <Container>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {tracking.pubHeader}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {tracking.authors}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Взято: {tracking.fullName}
                  </Typography>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    flexBasis: "15%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    До {format(new Date(tracking?.dateOUT || ""), "dd.MM.yyyy")}
                  </Typography>
                </Container>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!isUser && (
        <AddButton
          onClick={() => setTrackingModal({ tracking: null, open: true })}
        />
      )}

      {trackingModal.open && (
        <TrackingModal
          onSubmit={onSubmit}
          onClose={handleClose}
          footer={
            <Card
              sx={{
                position: "sticky",
                bottom: 0,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 2,
                paddingBottom: 2,
                borderTop: `2px solid ${grey[800]}`,
                borderRadius: 0,
                boxShadow: "none",
                zIndex: 10,
              }}
            >
              {trackingModal.tracking ? (
                <>
                  <Button variant="outlined" size="large" onClick={handleClose}>
                    Отменить
                  </Button>
                  <Box sx={{ marginLeft: 6 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      color="error"
                      onClick={handleDelete}
                    >
                      Удалить
                    </Button>
                    <Button
                      variant="outlined"
                      type="submit"
                      size="large"
                      color="success"
                      sx={{ marginLeft: 1 }}
                    >
                      Обновить
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Button variant="outlined" size="large" onClick={handleClose}>
                    Отменить
                  </Button>
                  <Button
                    variant="outlined"
                    type="submit"
                    size="large"
                    color="success"
                  >
                    Добавить
                  </Button>
                </>
              )}
            </Card>
          }
          {...trackingModal}
        />
      )}
    </>
  );
};
