import "./App.css";
import { useEffect, useState } from "react";
import Message from "./components/Messages/Message";
import Form from "./components/Form/Form";
import { FlagSpinner } from "react-spinners-kit";

function App() {
  const [aiMessages, setAIMessages] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("aiMessages"));
    return storage || [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("aiMessages", JSON.stringify(aiMessages));
  }, [aiMessages]);

  async function handleSubmit(prompt, model, tokens, temperature) {
    try {
      setIsLoading(true);
      const apiBody = {
        prompt: prompt,
        max_tokens: tokens || 50,
        temperature: temperature || 0.25,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      const res = await fetch(
        `https://api.openai.com/v1/engines/${model}/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          body: JSON.stringify(apiBody),
        }
      );
      const data = await res.json();
      setAIMessages([
        { msgPrompt: prompt, aiResponse: data.choices[0].text },
        ...aiMessages,
      ]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main-wrapper">
      <h1>Robo-Reply</h1>
      <Form handleSubmit={handleSubmit} />
      {isLoading ? (
        <div className="loading-banner">
          <FlagSpinner size={200} color="#2196C0" loading={isLoading} />
        </div>
      ) : (
        aiMessages.map((msg, idx) => {
          return (
            <div className="scollable" key={"message" + idx}>
              <Message msg={msg} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
