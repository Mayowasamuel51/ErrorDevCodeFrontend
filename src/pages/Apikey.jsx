import Store_Url from "../components/Store_Url";
import * as React from "react";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KeyPagination from "../components/KeyPagination";
const api = import.meta.env.VITE_STORE_KEY;

const ApiKey = () => {
  const notify = () => toast("Api information stored!!!!");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const schema = yup.object().shape({
    apiname: yup.string().required(),
    apikey: yup.string().required(),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const payload = {
      keyname: data.apiname,
      email: user,
      apikey: data.apikey,
    };
    axios
      .post(`${api}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          navigate("/dashboard/apikeys");
          notify();
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response.status === 422) {
          setError(response.data.message);
        } else if (response.status === 401) {
          setError(response.data.message);
        } else if (response.status === 403) {
          setError(response.data.message);
        }
      });
  };
  return (
    <>
      {/* <h2 className="text-center font-bold text-4xl  p-4">STORE YOUR API KEYS </h2> */}
      <div className="text-center p-4 pt-32">
        <h2 className="font-semibold text-4xl">
          {/* Share website URLs for storage */}
          STORE YOUR API KEYS 
          {/* Please share the website URLs for storage  */}
        </h2>
        <p className="px-10">
        Rather than writing or keeping api on your computer, you can store
          them on ErrorDeve
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 w-full grid place-items-center"
      >
        <div className="w-4/5 h-40 ">
          <ToastContainer />
          <TextField
            {...register("apiname", { required: true })}
            fullWidth
            name="apiname"
            label="Api Name"
            id="fullWidth"
          />
          <p className="text-red-600">{errors.apiname?.message}</p>
          <br />
          <br />
          <TextField
            {...register("apikey", { required: true })}
            name="apikey"
            fullWidth
            label="Api key"
            id="fullWidth"
          />
          <p className="text-red-600">{errors.apikey?.message}</p>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "12px" }}
            endIcon={<SendIcon />}
          >
            Store Api Info
          </Button>
        </div>
      </form>
      <div className="mt-4 w-full grid place-items-center">
        <div className="mt-16  w-4/5 h-40 ">
          <KeyPagination />
        </div>
      </div>
    </>
  );
};
export default ApiKey;
