import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useUsers } from "./useUsers";
import { RegistrationModal } from "./RegistrationModal";
import { TUser } from "../../store/users/types";
import {
  deleteUser,
  registration,
  updateUser,
} from "../../store/users/usersThunks";
import { useAppDispatch } from "../../store";
import { grey } from "@mui/material/colors";
import { AddButton } from "../../common/components/AddButton";

export const UsersPage = () => {
  const dispatch = useAppDispatch();

  const [userModal, setUserModal] = useState<{
    open: boolean;
    user: TUser | null;
  }>({ open: false, user: null });

  const users = useUsers();

  const handleModalClose = useCallback(() => {
    setUserModal({ open: false, user: null });
  }, []);

  const handleUserDelete = useCallback(() => {
    dispatch(deleteUser(userModal.user?.userID.toString() || ""));
    handleModalClose();
  }, [userModal]);

  const onSubmit = useCallback(
    (data: Partial<TUser>) => {
      if (userModal.user) {
        dispatch(
          updateUser({ id: userModal.user?.userID.toString() || "", data })
        );

        return;
      }

      dispatch(registration(data as Omit<TUser, "userID">));

      handleModalClose();
    },
    [userModal]
  );

  return (
    <>
      <Grid container spacing={2} pr={4} pl={4} mt={1}>
        {(users || []).map((user) => (
          <Grid item xs={12} key={user.userID}>
            <Card
              sx={{ width: "100%", cursor: "pointer" }}
              onClick={() => {
                setUserModal({ open: true, user });
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                <Container>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {user.fullName}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {user.email}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {user.phone}
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
                    {user.role}
                  </Typography>
                </Container>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddButton onClick={() => setUserModal({ user: null, open: true })} />

      {userModal.open && (
        <RegistrationModal
          onSubmit={onSubmit}
          onClose={handleModalClose}
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
              {userModal.user ? (
                <>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleModalClose}
                  >
                    Отменить
                  </Button>
                  <div>
                    <Button
                      variant="outlined"
                      size="large"
                      color="error"
                      onClick={handleUserDelete}
                      sx={{ marginLeft: 6 }}
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
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleModalClose}
                  >
                    Отменить
                  </Button>
                  <div>
                    <Button
                      variant="outlined"
                      type="submit"
                      size="large"
                      color="success"
                      sx={{ marginLeft: 4 }}
                    >
                      Зарегистрировать
                    </Button>
                  </div>
                </>
              )}
            </Card>
          }
          {...userModal}
        />
      )}
    </>
  );
};
