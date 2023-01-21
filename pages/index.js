import { useQuery } from "@tanstack/react-query";
import axios from "@/api/axios";

import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("/posts").then(({ data }) => data);
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
      {postQuery.data.map((singlePost) => (
        <h1
          key={singlePost.id}
          onClick={() => router.push(`/posts/${singlePost.id}`)}
        >
          {singlePost.title}
        </h1>
      ))}
    </div>
  );
}
