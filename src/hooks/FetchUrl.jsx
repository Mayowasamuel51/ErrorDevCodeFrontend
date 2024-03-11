import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const api = import.meta.env.VITE_STORE_API_GET;
const user = localStorage.getItem("user");
const UrlFetch = () => {
  return useQuery({
    queryKey: ["url", user],
    queryFn: async({queryKey}) => {
      try {
        const response = await axios.get(`${api}/${queryKey[1]}`);
        return response?.data.response;
      } catch (error) {
        return error;
      }
    }

  });
};

export default UrlFetch;
