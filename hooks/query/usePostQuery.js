import { useQuery } from "@tanstack/react-query";

import axios from "@/api/axios";

const usePostQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("/posts").then(({ data }) => data);
    },
  });
};

export default usePostQuery;
