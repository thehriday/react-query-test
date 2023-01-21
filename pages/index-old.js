import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

export default function HelloNextJS() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: ({ queryKey }) => {
      console.log("Calling QueryFN", queryKey);
      return wait(1000).then(() => [...POSTS]);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      console.log("Calling newPostMutation");

      return wait(1000).then(() => {
        POSTS.push({
          id: Date.now(),
          title,
        });
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
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
          newPostMutation.mutate("New Post");
        }}
      >
        Add New
      </button>
      <br />
      <br />
      <button onClick={() => router.push("/about")}>Go to About</button>
    </div>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
