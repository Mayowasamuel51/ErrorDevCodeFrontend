import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const api = import.meta.env.VITE_STORE_API_KEY
const user = localStorage.getItem("user");
const KeyFetch = () => {
  return useQuery({
    queryKey: ["key"],
    queryFn: () => axios.get(`${api}/${user}`),
  });
};

export default KeyFetch;
