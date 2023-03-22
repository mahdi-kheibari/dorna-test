import React from 'react';
import PropTypes from 'prop-types';
// componenets
import { TextField } from '@mui/material';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDatePicker } from '@mui/x-date-pickers';
import Modal from '../../../components/modal';

// ----------------------------------------------------------------------
UserModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAction: PropTypes.func,
  title: PropTypes.string,
  fields: PropTypes.object,
  setFields: PropTypes.func,
  handleChangeUserInput: PropTypes.func
};

export default function UserModal({ open, handleClose, handleAction, title, fields, setFields, handleChangeUserInput }) {
  return (
    <Modal open={open} handleClose={() => handleClose()} handleAction={() => handleAction()} title={title}>
      <TextField
        value={fields.firstName.value}
        onChange={(e) => handleChangeUserInput(e, "firstName")}
        placeholder="نام"
        error={fields.firstName.error}
        helperText={fields.firstName.error && fields.firstName.errorText}
      />
      <TextField
        value={fields.lastName.value}
        onChange={(e) => handleChangeUserInput(e, "lastName")}
        placeholder="نام خانوادگی"
        error={fields.lastName.error}
        helperText={fields.lastName.error && fields.lastName.errorText}
      />
      <TextField
        value={fields.fatherName.value}
        onChange={(e) => handleChangeUserInput(e, "fatherName")}
        placeholder="نام پدر"
        error={fields.fatherName.error}
        helperText={fields.fatherName.error && fields.fatherName.errorText}
      />
      <DemoItem label="تاریخ تولد">
        <MobileDatePicker
          value={fields.birthday}
          onChange={(newValue) => setFields({ ...fields, birthday: newValue })}
          disableFuture
        />
      </DemoItem>
    </Modal>
  );
}

