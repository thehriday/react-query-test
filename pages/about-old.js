import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import usePostQuery from "@/hooks/query/usePostQuery";

export default function HelloNextJS() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postQuery = usePostQuery();

  postQuery.fetchStatus;

  postQuery.refetch();

  postQuery.fetchStatus === "paused";

  postQuery.status === "success";

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      console.log("Calling newPostMutation");

      return wait(1000).then(() => {
        ABOUT.push({
          id: Date.now(),
          title,
        });
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["about"]);
      console.log("I am success");
    },
  });

  if (postQuery.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  return (
    <div>
      <h1>Hello NextJS</h1>
      {postQuery.data.map((singlePost) => (
        <h3 key={singlePost.id}>{singlePost.title}</h3>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => {
          newPostMutation.mutate("New About Data");
        }}
      >
        Add New
      </button>
      <br />
      <br />
      <button onClick={() => router.push("/")}>Go to Index</button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
