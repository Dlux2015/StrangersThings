import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Posts = ({ posts, setPosts, refreshPosts, token }) => {
  const history = useHistory();
  const [searchTerm, setsearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    setsearchTerm(e.target.value);
    const filteredResults = refreshPosts.filter((post) => {
      return (
        post.description.includes(e.target.value) ||
        post.title.includes(e.target.value) ||
        post.price.includes(e.target.value) ||
        post.location.includes(e.target.value)
      );
    });
    setFilteredPosts(filteredResults);
  };
  if (localStorage.getItem("token") !== null) {
    return (
      <>
        {/* <body id="post-main"> */}
        <div id="beforepost">
          <h1 id="post-header-1">Posts</h1>
          <form id="search-1">
            <input
              id="search-form-1"
              type="text"
              placeholder="Search Posts"
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
          <button
            onClick={() => {
              setPosts(filteredPosts);
            }}
          >
            Search!
          </button>
          <Link id="new-post" to="/newpost">
            <button>NewPost</button>
          </Link>
        </div>
        {posts.map((post) => (
          <div id="user-posts" key={post._id}>
            <Link to={`/posts/${post._id}`}>
              <h2>{post.title}</h2>{" "}
            </Link>
            <p>{post.description}</p>
            <h3>{post.price}</h3>
            <h3>{post.location}</h3>
            <h3>{post.willDeliver}</h3>

            <hr></hr>
          </div>
        ))}
        {/* </body> */}
      </>
    );
  }

  //Logged Out
  else
    return (
      <>
        {" "}
        {/* <body id="post-main"> */}
        <div id="beforepost">
          <h1 id="post-header">Posts</h1>
          <div>
            <form id="search">
              <input
                id="search-form"
                type="text"
                placeholder="Search Posts"
                value={searchTerm}
                onChange={handleChange}
              />
              <button
                onClick={() => {
                  setPosts(filteredPosts);
                }}
              >
                Search!
              </button>
            </form>
          </div>
        </div>
        {posts.map((post) => (
          <div id="user-posts" key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <h3>{post.price}</h3>
            <h3>{post.location}</h3>
            <h3>{post.willDeliver}</h3>

            <hr></hr>
          </div>
        ))}
        {/* </body> */}
      </>
    );
};

export default Posts;
