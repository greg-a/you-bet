import React from 'react';
import {
  Fade, IconButton, Modal, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './ModalBase.style';

const ModalBase = ({
  open, onClose, title, body,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        data-test="basic-modal"
        className="modal-backdrop" 
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.headerContainer}>
              <Typography variant="h4" gutterBottom>{title}</Typography>
              <IconButton
                onClick={onClose}
                className={classes.closeButton}
                data-test="close-modal"
                color="inherit"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </div>
            {body}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalBase;
