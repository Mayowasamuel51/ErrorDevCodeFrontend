import Store_Url from "../components/Store_Url";
import * as React from "react";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UrlPagination from "../components/UrlPagination";
const api = import.meta.env.VITE_STORE_API;

const Url = () => {
  const notify = () => toast("Website url stored!!!!");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const schema = yup.object().shape({
    websiteurl: yup.string().required(),
    description: yup.string().required(),
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
      email: user,
      url: data.websiteurl,
      description: data.description,
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
          navigate("/dashboard");
          notify();
      
        }
      })
      .catch((err) => {
        const response = err.response;
        // managing error from the backend server 
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
      <h2 className="text-center font-bold">STORE WEBSITE URL'S </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 w-full grid place-items-center "
      >
        <div className="w-4/5 h-40 ">
          <ToastContainer />
          <TextField
            {...register("websiteurl", { required: true })}
            fullWidth
            name="websiteurl"
            label="website Url"
            id="fullWidth"
          />
          <p className="text-red-600">{errors.websiteurl?.message}</p>
          <br />
          <br />
          <TextField
            {...register("description", { required: true })}
            name="description"
            fullWidth
            label="Website Description (Optional)"
            id="fullWidth"
          />
          <p className="text-red-600">{errors.description?.message}</p>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "12px" }}
            endIcon={<SendIcon />}
          >
          Store Url
          </Button>
        </div>
      </form>
      <div className="mt-4 w-full grid place-items-center">
        <div className="mt-16  w-4/5 h-40 ">
          <UrlPagination />
        </div>
      </div>
    </>
  );
};
export default Url;
