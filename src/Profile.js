import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = ({ user, lstoken, fetchPosts, fetchUser }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    setPosts(user.posts);
  }, [user]);

  return (
    <div id="profile-main">
      <h1 className="page-title">Your Profile, {user.username}</h1>
      <div className="profile-body">
        {user.messages && user.messages.length ? (
          <div>
            <div id="inbox-span">
              <h3 id="inbox">Inbox ({user.messages.length})</h3>

              {user.messages.map((message) => {
                return (
                  <div id="message" key={message._id}>
                    <div id="post-message">From Post:{message.post.title}</div>
                    <label id="sender">
                      Sender:{message.fromUser.username}
                    </label>
                    <p id="message-content">{message.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h3>There are no messages to display</h3>
        )}
        {posts && posts.length ? (
          <div id="user-posts">
            <h2>Listings you've created: </h2>
            {posts.map((post) => {
              return (
                <div key={post._id} id="profile-posts">
                  <Link to={`/posts/${post._id}`}>
                    <h4>{post.title}</h4>
                  </Link>
                  <div>
                    <h5>Active: {post.active ? "true" : "false"}</h5>
                  </div>

                  <div>
                    <h5>Description:</h5> {post.description}
                  </div>
                  <div>
                    <h5></h5>Location: {post.location}
                  </div>

                  {/* <button onClick={() => handleSubmitDelete(post._id)}>
                    Delete
                  </button> */}
                  <Link id="send-message" to={`/posts/edit/${post._id}`}>
                    <button>Edit</button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <h2>You haven't created any posts yet.</h2>
        )}
      </div>
    </div>
  );
};

export default Profile;
