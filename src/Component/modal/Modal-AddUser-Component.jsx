import { Modal, Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState, useEffect } from "react";
import { InputAdornment } from "@mui/material";
import Input from "../../Component/input";
const ModalAddUser = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setPhoneNumber("");
    setUserName("");
    setEmail("");
  }, [props?.open]);

  return (
    <>
      <Modal
        open={props?.open}
        onClose={props?.onClickOpen}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            overflowY: "scroll",
            width: "30%",
            height: "85%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={{ width: "100%" }} id="parent-modal-title">
              Add User
            </h2>
            <CloseIcon onClick={() => props?.onClickOpen()} />
          </div>
          <div>
            <Input
              value={firstName}
              disable={false}
              label={"First Name"}
              onChange={(v) => setFirstName(v?.target?.value)}
              style={{ width: "100%" }}
            />
            <Input
              value={lastName}
              disable={false}
              label={"Last Name"}
              onChange={(v) => setLastName(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={userName}
              disable={false}
              label={"User Name"}
              onChange={(v) => setUserName(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={phoneNumber}
              disable={false}
              label={"Phone Number"}
              onChange={(v) => setPhoneNumber(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={email}
              disable={false}
              label={"Email"}
              onChange={(v) => setEmail(v?.target?.value)}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Input
              value={password}
              disable={false}
              label={"password"}
              type={showPassword ? "text" : "password"}
              onChange={(v) => setPassword(v?.target?.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ width: "100%", marginTop: 10 }}
            />
            <div style={{ marginTop: 10 }}>
              <Button
                onClick={() =>
                  props?.submit(
                    firstName,
                    lastName,
                    password,
                    phoneNumber,
                    userName,
                    email
                  )
                }
                variant="contained"
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default ModalAddUser;
