import React, { useEffect } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Register from "./Register";
import NewPost from "./NewPost";
import PostEdit from "./ToEdit";
import Login from "./Login";
import Profile from "./Profile";
import { useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import MessageForm from "./Messages";
import PostSingle from "./SinglePost";

export const API_URL =
  "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";

const App = () => {
  const [userPost, setUserPost] = useState([]);
  const [refreshPosts, setRefreshPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const lstoken = localStorage.getItem("token");

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
    }

    try {
      const resp = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const info = await resp.json();

      if (info.success) {
        setUser(info.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchPosts() {
    if (lstoken) {
      const resp = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
      });
      console.log(resp);
      const info = await resp.json();
      setPosts(info.data.posts);
      setRefreshPost(info.data.posts);
      setUserPost(info.data.posts);
    } else {
      const resp = await fetch(`${API_URL}/posts`);
      const info = await resp.json();
      setPosts(info.data.posts);
      setRefreshPost(info.data.posts);
      setUserPost(info.data.posts);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <div id="container">
          <div id="navbar">
            {
              <div id="navbar-sub">
                <Navbar
                  user={user}
                  setToken={setToken}
                  setUser={setUser}
                  lstoken={lstoken}
                />
              </div>
            }
          </div>

          <div id="main-section">
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/posts">
              <Posts
                posts={posts}
                refreshPosts={refreshPosts}
                setPosts={setPosts}
                token={token}
              />
            </Route>

            <Route exact path="/register">
              <Register setToken={setToken} />
            </Route>

            <Route exact path="/newpost">
              <NewPost lstoken={lstoken} />
            </Route>

            <Route exact path="/posts/:id">
              <PostSingle
                token={token}
                setPosts={setPosts}
                posts={posts}
                lstoken={lstoken}
              />
            </Route>

            <Route exact path="/posts/edit/:id">
              <PostEdit posts={posts} lstoken={lstoken} />
            </Route>

            <Route exact path="/login">
              <Login setToken={setToken} />
            </Route>

            <Route exact path="/posts/message/:id">
              <MessageForm posts={posts} lstoken={lstoken} />
            </Route>

            <Route exact path="/Profile">
              <Profile
                user={user}
                posts={posts}
                setPosts={setPosts}
                userPost={userPost}
              />
            </Route>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
