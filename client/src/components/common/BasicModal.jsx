import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { URL } from "../../constant.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const BasicModal = () => {
  const [open, setOpen] = React.useState(false);
  const [classCode, setClassCode] = React.useState("");
  const { user } = useAuth();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let success;
    const token = localStorage.getItem('token');

    const res = fetch(`${URL}/user/joinclass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        classCode: classCode,
        userId: user._id,
      }),
    })
      .then((data) => data.json())
      .then((data) => (success = data.success));
    console.log(res);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          bgcolor: "white",
          color: "green",
          "&:hover": {
            bgcolor: "green",
            color: "white",
          },
          fontSize: "28px",
          width: "40px",
          height: "40px",
          minWidth: "40px",
          borderRadius: "50%",
          p: 0,
          textTransform: "none",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: 1,
        }}
      >
        +
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Enter Class Code
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Class Code"
              variant="outlined"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
