import React, { useState } from "react";
import BasicModal from "../basicModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required(),
  email: yup.string().email().required(),

  mobile: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "phone number must be number"
    )

    .required(),
});

export default function BasicTable() {
  const [arr, setArr] = useState([]);
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const editContact = (value, index) => {
    handler();
    setEdit(true);
    setCurrentIndex(index);
    const { name, email, mobile } = value;
    setValue("name", name);
    setValue("email", email);
    setValue("mobile", mobile);
  };

  const deleteContact = (index) => {
    const data = [...arr];
    const myValue = data.splice(index, 1);
    const mydata = data.filter((value, index) => value !== myValue);
    console.log(mydata);
    setArr(mydata);
  };

  return (
    <div>
      <BasicModal
        setArr={setArr}
        arr={arr}
        handleSubmit={handleSubmit}
        reset={reset}
        setValue={setValue}
        register={register}
        visible={visible}
        errors={errors}
        setVisible={setVisible}
        handler={handler}
        closeHandler={closeHandler}
        edit={edit}
        setEdit={setEdit}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
    
      <table className="table table-striped table-hover container shadow">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((value, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{value.name}</td>
                <td>
                  {value.email} <br />
                  {value.mobile}
                </td>
                <td>
                  {" "}
                  <EditIcon
                    color="primary"
                    onClick={() => editContact(value, index)}
                  />{" "}
                  <DeleteIcon
                    color="error"
                    onClick={() => {
                      deleteContact(index);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
