import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import React from 'react';

function Modal({ children, title, open, handleClose, handleAction }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ px: 2, "& .MuiFormHelperText-root": { textAlign: "right" } }}>
          {children}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant='text' onClick={handleClose}>بازگشت</Button>
        <Button variant='contained' onClick={handleAction}>{title.split(" ")[0]}</Button>
      </DialogActions>
    </Dialog>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAction: PropTypes.func,
};

export default Modal;
