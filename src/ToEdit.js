import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "./App";

const PostEdit = ({ posts, lstoken, fetchPosts }) => {
  const { id } = useParams();
  const { title, description, price, location, willDeliver } = posts.filter(
    (post) => post._id === id
  )[0];
  const origPost = {
    title: title,
    description: description,
    price: price,
    location: location,
    willDeliver: willDeliver,
  };
  const history = useHistory();
  const [error, setError] = useState("");

  const [post, setPost] = useState(origPost);

  //Edit Submit
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/posts/${post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lstoken}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    const info = await response.json();

    if (info.error) {
      return setError(info.error.message);
    }
    console.log(post.price);
    console.log("it works");
    fetchPosts();
    history.push("/posts");
  };

  return (
    <>
      <div id="edit-form">
        <form className="post-form" onSubmit={handleSubmitEdit}>
          <div id="edit-form-title">Edit Form</div>
          <input
            value={post.title}
            placeholder="Title"
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
          <input
            value={post.description}
            placeholder="Description"
            onChange={(e) => {
              setPost({ ...post, description: e.target.value });
            }}
          />
          <input
            value={post.price}
            placeholder="Price"
            onChange={(e) => {
              setPost({ ...post, price: e.target.value });
            }}
          />
          <input
            value={post.location}
            placeholder="Location"
            onChange={(e) => {
              setPost({ ...post, location: e.target.value });
            }}
          />
          <select
            onChange={(e) => {
              setPost({ ...post, willDeliver: e.target.value });
            }}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          <button>Submit</button>
        </form>
        s
      </div>
    </>
  );
};

export default PostEdit;
