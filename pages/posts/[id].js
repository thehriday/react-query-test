import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import axios from "@/api/axios";

export default function SinglePost() {
  const router = useRouter();
  const { id } = router.query;

  const postQuery = useQuery({
    queryKey: ["posts", id],
    enabled: Boolean(id),
    queryFn: () => {
      return axios.get(`/posts/${id}`).then(({ data }) => data);
    },
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: Boolean(postQuery?.data?.userId),
    queryFn: () => {
      return axios
        .get(`/users/${postQuery?.data?.userId}`)
        .then(({ data }) => data);
    },
  });

  if (postQuery.isLoading) {
    return <h1>Loading..</h1>;
  }

  if (postQuery.isError) {
    return <h1>Error Occurs {JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>{postQuery.data.title}</h1>
      <h2>{postQuery.data.body}</h2>
      <br />
      <hr />
      <br />
      {userQuery.isLoading && <h3>Loading</h3>}
      {userQuery.isError && <h3>user error</h3>}
      {userQuery.data && <h3>User Data: {userQuery.data.name}</h3>}
    </div>
  );
}
