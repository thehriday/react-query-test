import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import usePostQuery from "@/hooks/query/usePostQuery";
import usePostMutation from "@/hooks/query/usePostMutation";

export default function Index() {
  const router = useRouter();

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const postQuery = usePostQuery();
  const postMutation = usePostMutation();

  if (postQuery.isLoading) {
    return <h1>Loading..</h1>;
  }

  if (postQuery.isError) {
    return <h1>Error Occurs {JSON.stringify(postQuery.error)}</h1>;
  }

  const postSubmitHandler = () => {
    postMutation.mutate({ postTitle, postBody });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Post title"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Post body"
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
      />
      <br />
      <button onClick={postSubmitHandler} disabled={postMutation.isLoading}>
        Submit
      </button>

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
