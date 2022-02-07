import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "./App";

const MessageForm = ({ posts, lstoken }) => {
  const { id } = useParams();
  const post = posts.find((post) => id === post._id);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/posts/${post._id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lstoken}`,
      },
      body: JSON.stringify({
        message: {
          content,
        },
      }),
    });
    const info = await response.json();

    if (info.error) {
      return setError(info.error.message);
    }
    console.log(content);
    history.push(`/profile`);
  };

  return (
    <>
      {lstoken ? (
        <div id="message-format">
          <form id="message-form" onSubmit={handleSubmit}>
            <h2>Message Form</h2>
            <label id="comment-input">Message </label>
            <input
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              id="comment-input"
            />
            <button>submit</button>
          </form>
        </div>
      ) : (
        <div> Please login to message other users</div>
      )}
    </>
  );
};

export default MessageForm;
