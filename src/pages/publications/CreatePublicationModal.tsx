import React from "react";
import { Button, Card, Modal } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TPublication } from "../../store/publications/types";
import { useAppDispatch } from "../../store";
import { addPublication } from "../../store/publications/publicationsThunks";
import { PublicationForm } from "./PublicationForm";

export interface ICreatePublicationModalProps {
  open: boolean;
  onClose?: () => void;
}

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

export const CreatePublicationModal: React.FC<ICreatePublicationModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const onSubmit = (data: Partial<TPublication>) => {
    dispatch(addPublication(data));
    onClose?.();
  };

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
              <Button
                variant="outlined"
                type="submit"
                size="large"
                color="success"
              >
                Добавить
              </Button>
            </Card>
          }
        />
      </Card>
    </Modal>
  );
};
