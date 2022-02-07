import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "./App";

const NewPost = ({ lstoken, fetchPosts }) => {
  const history = useHistory();
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [location, setLocation] = useState([]);
  const [willDeliver, setWillDeliver] = useState([true]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
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
    fetchPosts();
    history.push("/posts");
  };

  return (
    <>
      <form id="new-post-form" onSubmit={handleSubmit}>
        <h2 id="new-post">New Post</h2>
        <input
          type="text"
          placeholder="What are you selling?"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <input
          type="text"
          placeholder="Describe the item (i.e. condition, model)"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></input>
        <input
          type="number"
          placeholder="What's the price?"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        ></input>
        <input
          type="text"
          placeholder="Where is the item located?"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        ></input>
        <label id="deliver">
          Are you willing to deliver?
          <select onChange={(e) => setWillDeliver(e.target.value)}>
            <option value={true}>No</option>
            <option value={true}>Yes</option>
          </select>
        </label>

        <button>Submit</button>
      </form>
      <p>{error}</p>
    </>
  );
};

export default NewPost;
