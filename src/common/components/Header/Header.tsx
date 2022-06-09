import { Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { CreatePublicationModal } from "../../../pages/publications/CreatePublicationModal";
import { useAppDispatch, useAppSelector } from "../../../store";
import { logout } from "../../../store/users/usersThunks";

export const Header = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.users.user);

  return (
    <Card
      sx={{
        position: "sticky",
        top: 0,
        width: "100%",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        zIndex: 2,
      }}
    >
      <Typography color="text.primary" fontSize={30} fontWeight={700} p={1}>
        Электронная Научная Библиотека
      </Typography>

      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Typography>{user?.fullName}</Typography>
        <PersonOutlineIcon
          fontSize={"large"}
          sx={{ marginRight: 2, marginLeft: 2 }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={() => dispatch(logout())}
          sx={{ backgroundColor: "#9575cd", marginLeft: 1 }}
        >
          Выйти
        </Button>
      </div>
    </Card>
  );
};
