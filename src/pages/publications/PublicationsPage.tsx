import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { PublicationModal } from "./PublicationModal";
import { TPublication } from "../../store/publications/types";
import { usePublications } from "../../common/hooks/usePublications";
import { fetchAllPublications } from "../../store/publications/publicationsThunks";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAllUsers } from "../../store/users/usersThunks";
import { UserRoles } from "../../store/users/types";
import { CreatePublicationModal } from "./CreatePublicationModal";
import { AddButton } from "../../common/components/AddButton";

export const PublicationsPage = () => {
  const dispatch = useAppDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [publicationModalOpen, setPublicationModalOpen] = useState<{
    open: boolean;
    publication: TPublication | null;
  }>({ open: false, publication: null });

  const publications = usePublications();

  const user = useAppSelector((state) => state.users.user);
  const isUser = user?.role === UserRoles.user;

  useEffect(() => {
    !isUser && dispatch(fetchAllUsers());
    dispatch(fetchAllPublications());
  }, [isUser]);

  return (
    <>
      <Grid container spacing={2} pr={4} pl={4} mt={1}>
        {publications.map((publication) => (
          <Grid item xs={12} key={publication.pubID}>
            <Card
              sx={{ width: "100%", cursor: "pointer" }}
              onClick={() => {
                setPublicationModalOpen({ open: true, publication });
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                <Container>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {publication.pubHeader}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {publication.authors}
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
                    {format(new Date(publication.pubDate), "yyyy")}
                  </Typography>
                </Container>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!isUser && <AddButton onClick={() => setCreateModalOpen(true)} />}

      <CreatePublicationModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <PublicationModal
        onClose={() =>
          setPublicationModalOpen({ open: false, publication: null })
        }
        {...publicationModalOpen}
      />
    </>
  );
};
