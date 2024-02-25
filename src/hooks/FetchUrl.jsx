import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const api = import.meta.env.VITE_STORE_API_GET;
const user = localStorage.getItem("user");
const UrlFetch = () => {
  return useQuery({
    queryKey: ["url"],
    queryFn: async() => await axios.get(`${api}/${user}`),
  });
};

export default UrlFetch;
