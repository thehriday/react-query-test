import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "@/api/axios";

const usePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postTitle, postBody }) => {
      return axios
        .post("/posts", { userId: 1, title: postTitle, body: postBody })
        .then(({ data }) => data);
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["posts"]);
      queryClient.setQueryData(["posts"], (prevData) => {
        return [...prevData, data];
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default usePostMutation;
