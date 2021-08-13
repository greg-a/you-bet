import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useSnackbar } from 'notistack';
import CreateIcon from '@material-ui/icons/Create';
import ModalBase from '../../Modals/ModalBase';
import NewBetModal from '../../Modals/ModalBodies/NewBet';
import { userLogout } from '../../../services/auth-services';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const actions = [
  { icon: <CreateIcon />, name: 'Create Bet' },
  { icon: <ExitToAppIcon />, name: 'Logout' },
];

const ActionButton = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [modalData, setModalData] = useState({ open: false });

  const handleCloseModal = () => {
    setModalData({ open: false })
  };

  const handleCreateBet = () => {
    setModalData({
      open: true,
      title: 'Create Bet',
      body: <NewBetModal onSubmit={handleCloseModal} />
    });
  };

  const handleLogout = async () => {
    try {
      await userLogout();
      window.location.href = '/login';
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' })
    }
  };

  const handleClick = (event) => {
    const { name } = event.currentTarget;
    if (name === 'Create Bet') handleCreateBet();
    if (name === 'Logout') handleLogout();
  };

  const handleClose = (event) => {
    if (event.type === 'click') setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {modalData && (
        <ModalBase
          title={modalData.title}
          open={modalData.open}
          body={modalData.body}
          onClose={handleCloseModal}
        />
      )}
      <SpeedDial
        ariaLabel="Action Buttons"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClick}
            name={action.name}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default ActionButton;
