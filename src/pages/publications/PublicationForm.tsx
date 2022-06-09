import {
  PublicationStatus,
  TPublication,
} from "../../store/publications/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { ReactNode, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import { usePublishers } from "../../common/hooks/usePublishers";
import { useAppSelector } from "../../store";
import { UserRoles } from "../../store/users/types";

const translates: Partial<Record<keyof TPublication, string>> = {
  pubHeader: "Название публикации",
  pubType: "Тип публикации",
  pubDate: "Дата публикации",
  authors: "Авторы публикации",
  publisherID: "Издатель",
  language: "Язык публикации",
  status: "Статус публикации",
};

const initialValues = {
  pubHeader: "",
  authors: "",
  pubType: "",
  publisherID: 1,
  pubDate: format(Date.now(), "yyyy-MM-dd"),
  language: "",
  status: PublicationStatus.taken,
};

export interface IPublicationFormProps {
  onSubmit: (data: Partial<TPublication>) => void;
  footer: ReactNode;
  publication?: Partial<TPublication>;
}

export const PublicationForm: React.FC<IPublicationFormProps> = ({
  onSubmit,
  publication,
  footer,
}) => {
  const user = useAppSelector((state) => state.users.user);
  const isUser = user?.role === UserRoles.user || !user;

  const publishers = usePublishers();

  const { control, handleSubmit } = useForm({
    defaultValues: publication
      ? {
          ...publication,
          pubDate: format(new Date(publication?.pubDate || ""), "yyyy-MM-dd"),
        }
      : initialValues,
  });

  const renderInput = useCallback(
    (key: keyof TPublication) => {
      if (key === "pubDate") {
        return (
          <Controller
            name={key}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField
                  type="date"
                  disabled={isUser}
                  variant="outlined"
                  label={translates[key]}
                  defaultValue={format(
                    new Date(publication?.pubDate || Date.now()),
                    "yyyy-MM-dd"
                  )}
                  {...field}
                />
              </FormControl>
            )}
          />
        );
      }

      if (key === "publisherID") {
        return (
          <Controller
            name={key}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <InputLabel id="publisherID">Издатель</InputLabel>
                <Select
                  disabled={isUser}
                  labelId="publisherID"
                  label={translates[key]}
                  {...field}
                >
                  {publishers.map((publisher) => (
                    <MenuItem
                      key={publisher.publisherID}
                      value={publisher.publisherID}
                    >
                      {publisher.publisherName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        );
      }

      if (key === "status") {
        return (
          <Controller
            name={key}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel id="status">{translates[key]}</InputLabel>
                <Select
                  labelId="status"
                  label={translates[key]}
                  disabled={isUser || !!publication}
                  {...field}
                >
                  <MenuItem value={PublicationStatus.digital}>
                    Электронная
                  </MenuItem>
                  <MenuItem value={PublicationStatus.taken}>Занято</MenuItem>
                  <MenuItem value={PublicationStatus.available}>
                    Свободно
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
        );
      }

      return (
        <Controller
          key={key}
          // Реализованы не все поля из типа TPublication
          // @ts-ignore
          name={key}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <TextField
                disabled={isUser}
                label={translates[key]}
                variant="outlined"
                multiline
                {...field}
              />
            </FormControl>
          )}
        />
      );
    },
    [control, publishers, publication]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(publication || initialValues).map((key) =>
        renderInput(key as keyof TPublication)
      )}
      {!isUser && footer}
    </form>
  );
};
