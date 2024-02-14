import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase.config";
const api = import.meta.env.VITE_STORE_PORTFOILO_POST;

const Portfoilo = () => {
  const notify = () => toast("Successfully uploaded portfoilo !!!");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const schema = yup.object().shape({
    portfoilo: yup.string().required(),
    // image: yup
    //   .mixed()
    //   .test(
    //     "required",
    //     "You need to provide a image screenshot of your portfoilo",
    //     (value) => {
    //       return value && value.length;
    //     }
    //   )
    //   .test("fileSize", "The file is too large", (value, context) => {
    //     return value && value[0] && value[0].size <= 500000;
    //   })
    //   .test("type", "We only support jpeg, .jpg , .png ", function (value) {
    //     return value && value[0] && value[0].type === "text/plain" ||
    //                 value && value[0] && value[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || value && value[0] && value[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //   }),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data.image, data.name)
    const uploadFile = () => {
      for (const file of data.image) {
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                notifyfail();
                console.log("failed");
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                notifyfail();
                console.log("failed");
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                console.log("failed");
                // Unknown error occurred, inspect error.serverResponse
                notifyfail();
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                const payload = {
                  email: data.email,
                  portfoilourl: data.portfoilo,
                  imageurl: downloadURL,
                };
                axios
                  .post(`${api}`, payload, {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  })
                  .then((res) => {
                    if (res.status === 201) {
                      notify();
                      console.log("stored info");
                      console.log("File available at", downloadURL);
                    }
                  });
              })
              .catch((err) => {
                notifyfail();
                console.log(err.message);
              });
          }
        );
      }
    };
    uploadFile();
  };
  return (
    <>
      <h2 className="text-center font-bold text-4xl  pt-4 ">
        Add your Porfolio to Gain Gigs{" "}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 w-full grid place-items-center"
      >
        <div className="w-4/5 h-40 ">
          <ToastContainer />
          <TextField
            {...register("portfoilo", { required: true })}
            fullWidth
            name="portfoilo"
            type="url"
            label="Portfoilo Url"
            id="fullWidth"
          />
          <p className="text-red-600">{errors.portfoilo?.message}</p>
          <br />
          <br />
          <div className="mb-3">
            <label
              for="formFile"
              class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >
              Take a ScreenShot of your Porfoilo Main Page and Upload here
            </label>
            <input
              {...register("image", { required: true })}
              name="image"
              type="file"
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            
              id="formFile"
            />
          </div>
          <p className="text-red-600">{errors.image?.message}</p>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "12px" }}
            endIcon={<SendIcon />}
          >
            Upload
          </Button>
        </div>
      </form>
    </>
  );
};
export default Portfoilo;
