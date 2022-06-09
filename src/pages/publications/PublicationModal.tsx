import { TPublication } from "../../store/publications/types";
import { Button, Card, Modal } from "@mui/material";
import React from "react";
import { PublicationForm } from "./PublicationForm";
import { useAppDispatch } from "../../store";
import {
  deletePublication,
  updatePublication,
} from "../../store/publications/publicationsThunks";
import { grey } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflowY: "auto",
  outline: "none",
  maxWidth: 1000,
  maxHeight: 800,
  boxShadow: 24,
  paddingLeft: 4,
  paddingRight: 4,
  paddingTop: 4,
};

const ROWS_TO_RENDER = [
  "pubHeader",
  "authors",
  "pubType",
  "publisherID",
  "pubDate",
  "language",
  "status",
];

export interface IPublicationProps {
  open: boolean;
  publication: TPublication | null;
  onClose?: () => void;
}

export const PublicationModal: React.FC<IPublicationProps> = ({
  open,
  onClose,
  publication,
}) => {
  const dispatch = useAppDispatch();

  const onSubmit = (data: Partial<TPublication>) => {
    dispatch(
      updatePublication({ id: publication?.pubID.toString() || "", data })
    );
  };

  const onDelete = () => {
    if (publication?.pubID) {
      dispatch(deletePublication(String(publication.pubID)));
    }

    onClose?.();
  };

  if (!publication) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={style}>
        <PublicationForm
          onSubmit={onSubmit}
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
              <Button variant="outlined" size="large" onClick={onClose}>
                Отменить
              </Button>
              <div>
                <Button
                  variant="outlined"
                  size="large"
                  color="error"
                  onClick={onDelete}
                >
                  Удалить
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  size="large"
                  color="success"
                  sx={{ marginLeft: 4 }}
                >
                  Обновить
                </Button>
              </div>
            </Card>
          }
          publication={ROWS_TO_RENDER.reduce<Partial<TPublication>>(
            (acc, key) => ({
              ...acc,
              [key]: publication[key as keyof TPublication],
            }),
            {}
          )}
        />
      </Card>
    </Modal>
  );
};
