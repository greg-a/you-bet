import React, { useState } from 'react';
import { Grid, InputAdornment, NoSsr } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BasicTextInput from '../../Form/Inputs/BasicTextInput';
import SimpleButton from '../../Form/Buttons/SimpleButton';
import { createBet } from '../../../services/bets-services';

const NewBetModal = ({ onSubmit }) => {
  const { enqueueSnackbar } = useSnackbar();
  const today = new Date();
  const [betInfo, setBetInfo] = useState({ description: '', betAmount: 0, endDate: today.toISOString().substring(0, 10) });

  const validateForm = () => {
    const { description, betAmount, endDate } = betInfo;
    if (description && betAmount && endDate) return true;
    return false;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBetInfo((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return enqueueSnackbar('Form is incomplete', { variant: 'error' });
    try {
      await createBet(betInfo);
      enqueueSnackbar('Bet was saved!', { variant: 'success' });
      onSubmit();
    } catch (err) {
      enqueueSnackbar(err.message, 'error')
    }
  };

  return (
    <NoSsr>
      <Grid container spacing={6}>
        <Grid item md={12}>
          <BasicTextInput
            label="description"
            name="description"
            onChange={handleChange}
            value={betInfo.description}
            multiline
          />
        </Grid>
        <Grid item md={3}>
          <BasicTextInput
            label="amount"
            type="number"
            name="betAmount"
            onChange={handleChange}
            value={betInfo.bet}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item md={4}>
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
        <Grid item md={2} />
        <Grid item md={3}>
          <SimpleButton
            title="Submit"
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </NoSsr>
  );
};

export default NewBetModal;
