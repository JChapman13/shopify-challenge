import React from "react";
import "./Message.styles.css";

function Message(props) {
  return (
    <article className="message-wrapper">
      <h4>Prompt: </h4>
      <p className="prompt-message">{props.msg.msgPrompt}</p>
      <h4>Response: </h4>
      <p className="response-message">{props.msg.aiResponse}</p>
    </article>
  );
}

export default Message;
