import { Button, Card, Container, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { useAppDispatch } from "../../store";
import { login } from "../../store/users/usersThunks";

export const LoginPage = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(login(data));
  };

  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ padding: 6, paddingBottom: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField
                  label="Электронная почта"
                  variant="outlined"
                  {...field}
                />
              </FormControl>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField
                  label="Пароль"
                  type="password"
                  variant="outlined"
                  {...field}
                />
              </FormControl>
            )}
          />
          <Button type="submit" size="large">
            Войти
          </Button>
        </form>
      </Card>
    </Container>
  );
};
