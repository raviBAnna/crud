import React, { useEffect, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import EmailIcon from "@mui/icons-material/Email";
import ContactsIcon from "@mui/icons-material/Contacts";

import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

export default function BasicModal({
  setArr,
  arr,
  handleSubmit,
  register,
  reset,
  error,
  errors,
  setValue,
  handler,
  visible,
  closeHandler,
  edit,
  setEdit,
  setCurrentIndex,
  currentIndex,
}) {

  const addButton = () => {
    setEdit(false);
    handler();
    setValue("name", "");
    setValue("email", "");
    setValue("mobile", "");
  };


  const onSubmit = (value) => {
    if (!!edit === false) {
      setArr([
        ...arr,
        {
          name: value.name,
          email: value.email,
          mobile: value.mobile,
        },
      ]);
    } else {
      const newArr = arr.splice(currentIndex, 1, {
        name: value.name,
        email: value.email,
        mobile: value.mobile,
      });
    }
    reset();
    closeHandler();
  };

  return (
    <div>
      <div className="text-center  d-flex justify-content-center mb-5 mt-5">
        <h1 className=" mx-5 bolder">Contact List </h1>
        <Button auto shadow onPress={addButton}>
          <AddIcon />
        </Button>
      </div>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {!!edit ? "Update Contact" : "Add Contact"}
          </Text>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Name"
              contentLeft={<PersonIcon fill="currentColor" />}
              {...register("name")}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
            <br />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<EmailIcon fill="currentColor" />}
              {...register("email")}
              error={!!errors?.name}
              helperText={errors?.email?.message}
            />
            <br />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="mobile"
              contentLeft={<ContactsIcon fill="currentColor" />}
              {...register("mobile")}
              error={!!errors?.mobile}
              helperText={errors?.mobile?.message}
            />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
            <Button auto type="submit">
              {!!edit ? "Update " : "Add"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
