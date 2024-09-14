import React from "react";
import Modal from "@mui/material/Modal";
import { border, borderRadius, Box, padding, Stack } from "@mui/system";
import { Button, Input, TextareaAutosize, Typography } from "@mui/material";
import BottomContainer from "../BottomContainer";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddVariableModal: React.FC<ModalProps> = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          ...style
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          className="h-full"
        >
          <Typography variant="h1" fontWeight={800} fontSize={30}>
            Add Variable
          </Typography>
          <Stack>
            <Typography
              variant="h5"
              fontWeight={500}
              align="left"
              fontSize={18}
            >
              Name
            </Typography>
            <input
              className="focus:outline-none"
              placeholder="Variable name"
              style={{ width: "30vw", ...inputSyle }}
            />
          </Stack>
          <Stack>
            <Typography
              variant="h5"
              fontWeight={500}
              align="left"
              fontSize={18}
            >
              Prompt
            </Typography>
            <textarea
              className="focus:outline-none"
              style={{ height: "30vh", width: "30vw", ...inputSyle }}
              placeholder="Write your prompt..."
            />
          </Stack>

          <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
            {/* TODO: Add onClick event to save the variable */}
            <Button
              type="button"
              variant="contained"
              tabIndex={-1}
              onClick={() => handleClose()}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddVariableModal;

const style = {
  height: "70vh",
  width: "40vw",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 3,
  boxShadow: 24,
  p: 4
};

const inputSyle = {
  border: "1px solid #EBEBEB",
  borderRadius: 5,
  padding: 10,
  ":focus-visible": {
    border: "1px solid #EBEBEB"
  }
};
