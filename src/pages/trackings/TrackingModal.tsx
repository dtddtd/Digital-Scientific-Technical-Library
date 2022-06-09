import React, { useCallback, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
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
import { TTracking } from "../../store/trackings/types";
import { addDays, format } from "date-fns";
import { useAppSelector } from "../../store";
import { TTrackingPublication } from "./types";
import { PublicationStatus } from "../../store/publications/types";

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

export interface ITrackingModalProps {
  open: boolean;
  footer: React.ReactNode;
  onSubmit: (data: Partial<TTracking>) => void;
  onClose?: () => void;
  tracking?: TTrackingPublication | null;
}

export type TTrackingForm = { dateIN: string; dateOUT: string };

const defaultValues: TTrackingForm = {
  dateIN: format(Date.now(), "yyyy-MM-dd"),
  dateOUT: format(addDays(Date.now(), 14), "yyyy-MM-dd"),
};

export const TrackingModal: React.FC<ITrackingModalProps> = ({
  open,
  onClose,
  tracking,
  footer,
  onSubmit,
}) => {
  const currentUser = useAppSelector((state) => state.users.user);
  const isUser = currentUser?.role === UserRoles.user || !currentUser;
  const publications = useAppSelector((state) => state.publications.all);
  const users = useAppSelector((state) => state.users.allUsers);

  const availablePubs = useMemo(
    () =>
      publications.filter((pub) => pub.status === PublicationStatus.available),
    [publications]
  );

  const [selectedUser, setSelectedUser] = useState(
    tracking
      ? {
          id: tracking.userID,
          label: isUser
            ? currentUser?.fullName
            : users.find((user) => user.userID === tracking.userID)?.fullName,
        }
      : {
          label: users[0]?.fullName,
          id: users[0]?.userID,
        }
  );

  const [selectedPub, setSelectedPub] = useState(
    tracking
      ? {
          id: tracking.pubID,
          label: publications.find((pub) => pub.pubID === tracking.pubID)
            ?.pubHeader,
        }
      : {
          label: availablePubs[0]?.pubHeader,
          id: availablePubs[0]?.pubID,
        }
  );

  const { control, handleSubmit } = useForm({
    defaultValues: tracking
      ? {
          dateIN: format(new Date(tracking?.dateIN || ""), "yyyy-MM-dd"),
          dateOUT: format(new Date(tracking?.dateOUT || ""), "yyyy-MM-dd"),
        }
      : defaultValues,
  });

  const onFormSubmit = useCallback(
    (data: Partial<TTrackingForm>) => {
      onSubmit({
        ...data,
        userID: selectedUser.id.toString(),
        pubID: selectedPub.id.toString(),
      });
    },
    [onSubmit, selectedUser, selectedPub]
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={style}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box sx={{ width: "100%", marginBottom: 4 }}>
            <Autocomplete
              disabled={isUser || !!tracking}
              id="userID"
              options={users.map((user) => ({
                label: user.fullName,
                id: user.userID,
              }))}
              value={selectedUser}
              onChange={(e, value) => {
                value && setSelectedUser(value);
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Пользователи" />
              )}
            />
          </Box>

          <Box sx={{ width: "100%", marginBottom: 4 }}>
            <Autocomplete
              disabled={isUser || !!tracking}
              id="pubID"
              options={availablePubs.map((pub) => ({
                label: pub.pubHeader,
                id: pub.pubID,
              }))}
              value={selectedPub.id ? selectedPub : null}
              onChange={(e, value) => {
                value && setSelectedPub(value);
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Публикация" />
              )}
            />
          </Box>

          <Controller
            name="dateIN"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField
                  type="date"
                  disabled={isUser}
                  variant="outlined"
                  label="Дата выдачи"
                  defaultValue={format(
                    new Date(tracking?.dateIN || Date.now()),
                    "yyyy-MM-dd"
                  )}
                  {...field}
                />
              </FormControl>
            )}
          />

          <Controller
            name="dateOUT"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField
                  type="date"
                  disabled={isUser}
                  variant="outlined"
                  label="Дата возврата"
                  defaultValue={format(
                    new Date(tracking?.dateIN || addDays(Date.now(), 14)),
                    "yyyy-MM-dd"
                  )}
                  {...field}
                />
              </FormControl>
            )}
          />

          {!isUser && footer}
        </form>
      </Card>
    </Modal>
  );
};
