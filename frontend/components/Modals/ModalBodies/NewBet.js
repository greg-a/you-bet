import React, { useEffect, useState } from "react";
import { Grid, InputAdornment, NoSsr, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import BasicTextInput from "../../Form/Inputs/BasicTextInput";
import SimpleButton from "../../Form/Buttons/SimpleButton";
import { validateBet } from "../../../utils/validateForms";
import useFeedList from "../../../hooks/useFeedList";

const NewBetModal = ({ onSubmit, description, editBet }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { refreshFeedList } = useFeedList();
  const today = new Date();
  const [betInfo, setBetInfo] = useState({
    description: "",
    betAmount: 0,
    endDate: today.toISOString().substring(0, 10),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBetInfo((old) => ({ ...old, [name]: value }));
  };

  const handleBetAmountChange = (event) => {
    const { value } = event.target;
    let formattedVal = parseInt(value, 10) || 0;
    if (formattedVal > 0 && value[0] === "0") formattedVal = value.slice(1);
    if (value.includes(".")) formattedVal = value.split(".")[0];
    setBetInfo((old) => ({ ...old, betAmount: formattedVal }));
  };

  const handleSubmit = async () => {
    if (!validateBet(betInfo))
      return enqueueSnackbar("Form is incomplete", { variant: "error" });
    try {
      await onSubmit(betInfo);
      refreshFeedList();
    } catch (err) {
      enqueueSnackbar(err.message, "error");
    }
  };

  useEffect(() => {
    if (editBet) {
      const { description, betAmount, endDate } = editBet;
      setBetInfo({ description, betAmount, endDate });
    }
  }, []);

  return (
    <NoSsr>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <BasicTextInput
            label="description"
            name="description"
            onChange={handleChange}
            value={betInfo.description}
            multiline
          />
        </Grid>
        <Grid item xs={6}>
          <BasicTextInput
            label="amount"
            type="number"
            name="betAmount"
            onChange={handleBetAmountChange}
            value={betInfo.betAmount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <BasicTextInput
            label="end date"
            type="date"
            name="endDate"
            onChange={handleChange}
            defaultValue={betInfo.endDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <SimpleButton title="Submit" onClick={handleSubmit} />
        </Grid>
      </Grid>
    </NoSsr>
  );
};

export default NewBetModal;
