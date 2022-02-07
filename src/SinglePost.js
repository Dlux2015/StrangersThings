import React from "react";
import { Link } from "react-router-dom";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { API_URL } from "./App";

const PostSingle = ({ posts, lstoken, fetchPosts }) => {
  if (posts.length === 0) return <div></div>;
  const { id } = useParams();
  const post = posts.find((post) => id == post._id);
  const history = useHistory();

  //delete
  const handleSubmitDelete = async (e) => {
    // e.preventDefault();

    const response = await fetch(`${API_URL}/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lstoken}`,
      },
    });
    const info = await response.json();

    if (info.error) {
      return setError(info.error.message);
    }
    fetchPosts();
    history.push("/posts");
  };

  return (
    <>
      <div id="post-results-box">
        {post && post.isAuthor ? (
          <div id="post-results">
            <h3 id="post-title">{post.title}</h3>
            <div id="post-info">Active: {post.active ? "true" : "false"}</div>
            <div id="post-info">Description: {post.description}</div>
            <div id="post-info">Price: {post.price}</div>
            <div id="post-info">Posted by: {post.author.username}</div>
            <div id="post-info">Location: {post.location} </div>
            <button
              id="delete"
              onClick={() => {
                handleSubmitDelete();
              }}
            >
              Delete
            </button>
            <Link id="send-message" to={`/posts/edit/${post._id}`}>
              <button id="edit">Edit</button>
            </Link>
          </div>
        ) : (
          <div>
            <div id="post-results">
              <h3 id="post-title">{post.title}</h3>
              <div id="post-info">Description: {post.description}</div>
              <div id="post-info">Price: {post.price}</div>
              <div id="post-info">Posted by: {post.author.username}</div>
              <div id="post-info">Location: {post.location} </div>
              <Link id="send-message" to={`message/${post._id}`}>
                <button>Send Message</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostSingle;
