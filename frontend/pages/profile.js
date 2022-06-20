import React, { useState } from "react";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import BasicTextInput from "../components/Form/Inputs/BasicTextInput";
import useAuth from "../hooks/useAuth";
import { changePassword } from "../services";
import { useSnackbar } from "notistack";

const defaultInputs = {
  currentPassword: "",
  newPassword1: "",
  newPassword2: "",
};

const Profile = () => {
  const { userInfo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [passwordResetInfo, setPasswordResetInfo] = useState(defaultInputs);
  const [inputErrors, setInputErrors] = useState(defaultInputs);
  const [passwordsValid, setPasswordsValid] = useState(true);

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordResetInfo({ ...passwordResetInfo, ...{ [name]: value } });
  };

  const validatePasswords = () => {
    return passwordResetInfo.password1 === passwordResetInfo.newPassword2;
  };

  const handlePasswordReset = async () => {
    if (validatePasswords) {
      try {
        await changePassword(passwordResetInfo);
        enqueueSnackbar("Password was updated!", { variant: "success" });
        setPasswordResetInfo(defaultInputs);
      } catch (err) {
        enqueueSnackbar("Error: make sure your current password is correct", {
          variant: "error",
        });
      }
    } else {
      setInputErrors({
        ...inputErrors,
        ...{ newPassword2: "passwords do not match" },
      });
    }
  };

  if (!userInfo) return <p>loading...</p>;
  return (
    <Grid
      container
      style={{ textAlign: "center", height: "70vh", paddingTop: "70px" }}
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
      </Grid>
      <Grid item xs={10} md={5}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <BasicTextInput label="email" value={userInfo.email} disabled />
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicTextInput
              label="username"
              value={userInfo.username}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicTextInput name="name" label="name" value={userInfo.name} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <Typography variant="subtitle1">Password Reset</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicTextInput
              type="password"
              name="currentPassword"
              label="current password"
              onChange={handlePasswordChange}
              value={passwordResetInfo.currentPassword}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicTextInput
              type="password"
              name="newPassword1"
              label="new password"
              onChange={handlePasswordChange}
              value={passwordResetInfo.newPassword1}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BasicTextInput
              type="password"
              name="newPassword2"
              label="new password"
              onChange={handlePasswordChange}
              value={passwordResetInfo.newPassword2}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              onClick={handlePasswordReset}
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
