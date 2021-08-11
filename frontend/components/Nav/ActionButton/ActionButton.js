import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NewBetButton from './Actions/NewBetButton';
import CreateIcon from '@material-ui/icons/Create';
import ModalBase from '../../Modals/ModalBase';
import NewBetModal from '../../Modals/ModalBodies/NewBet';

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
];

const ActionButton = () => {
  const classes = useStyles();
  const [direction, setDirection] = useState('up');
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [modalData, setModalData] = useState({ open: false });

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const handleCloseModal = () => {
    setModalData({ open: false })
  };

  const handleCreateBet = () => {
    setModalData({
      open: true,
      title: 'Create Bet',
      body: <NewBetModal onSubmit={handleCloseModal}/>
    });
  };

  const handleClick = (event) => {
    const { name } = event.currentTarget;
    if (name === 'Create Bet') handleCreateBet();
  };

  const handleClose = () => {
    setOpen(false);
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
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={direction}
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
