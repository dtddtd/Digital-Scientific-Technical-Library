import React, { useState } from "react";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { TUser, UserRoles } from "../../store/users/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflowY: "auto",
  outline: "none",
  maxWidth: 500,
  maxHeight: 800,
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingTop: 4,
};

export interface IRegistrationModalProps {
  open: boolean;
  footer: React.ReactNode;
  onSubmit: (data: Partial<TUser>) => void;
  onClose?: () => void;
  user?: TUser | null;
}

export type TRegistrationForm = {
  email: string;
  password: string;
  fullName: string;
  role: UserRoles;
  department: string;
  phone: string;
};

const defaultValues: TRegistrationForm = {
  email: "",
  password: "",
  fullName: "",
  role: UserRoles.user,
  department: "",
  phone: "",
};

export const RegistrationModal: React.FC<IRegistrationModalProps> = ({
  open,
  onClose,
  user,
  footer,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: user ? { ...user, password: "" } : defaultValues,
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={style}>
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

          {!user && (
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <TextField label="Пароль" variant="outlined" {...field} />
                </FormControl>
              )}
            />
          )}

          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField label="Ф. И. О." variant="outlined" {...field} />
              </FormControl>
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <InputLabel id="status">Роль</InputLabel>
                <Select labelId="status" label="Роль" {...field}>
                  <MenuItem value={UserRoles.user}>Пользователь</MenuItem>
                  <MenuItem value={UserRoles.redactor}>Редактор</MenuItem>
                  <MenuItem value={UserRoles.admin}>Администратор</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField label="Отдел" variant="outlined" {...field} />
              </FormControl>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField
                  label="Номер телефона"
                  variant="outlined"
                  {...field}
                />
              </FormControl>
            )}
          />

          {footer}
        </form>
      </Card>
    </Modal>
  );
};
