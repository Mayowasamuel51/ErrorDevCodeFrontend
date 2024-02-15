import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const api = import.meta.env.VITE_STORE_PORTFOILO_GET;
const PortfoiloFetch = () => {
  return useQuery({
    queryKey: ["key"],
    queryFn: () => axios.get(`${api}`),
  });
};

export default PortfoiloFetch;
