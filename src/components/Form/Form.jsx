import { useState } from "react";
import "./Form.styles.css";

function Form(props) {
  const [msgPrompt, setMsgPrompt] = useState("");
  const [toggleView, setToggleView] = useState(false);
  const [model, setModel] = useState("text-curie-001");
  const [tokens, setTokens] = useState(50);
  const [temperature, setTemperature] = useState(0.25);

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      props.handleSubmit(msgPrompt, model, tokens, temperature);
      setMsgPrompt("");
      setToggleView(false);
    }
  };

  const handleSend = (event) => {
    props.handleSubmit(msgPrompt, model, tokens, temperature);
    setMsgPrompt("");
    setToggleView(false);
  };

  const optionsList = () => {
    return (
      <>
        <label htmlFor="intelligence engine">Pick an intelligence: </label>
        <select
          name="engine"
          value={model}
          onChange={(event) => setModel(event.target.value)}
          className="model-select"
        >
          <option value="text-curie-001">Default Intelligence</option>
          <option value="text-ada-001">Less Intelligent</option>
          <option value="text-davinci-002">More Intelligent</option>
        </select>
        <label htmlFor="response length">How long of a response?</label>
        <input
          type="range"
          defaultValue={50}
          name="response-length"
          min={20}
          max={200}
          onChange={(event) => setTemperature(parseInt(event.target.value))}
        />
        <label htmlFor="creativity">How creative of a response?</label>
        <input
          type="range"
          name="creativity"
          defaultValue={0.25}
          step={0.01}
          min={0}
          max={1}
          onChange={(event) => setTokens(parseInt(event.target.value))}
        />
        <button
          className="save-options-btn"
          onClick={() => {
            setToggleView(!toggleView);
          }}
        >
          ⬆
        </button>
      </>
    );
  };
  return (
    <>
      <div className={toggleView ? "form-wrapper view" : "form-wrapper"}>
        <img src={require("../../assets/blue-robot.png")} />
        <input
          type="text"
          value={msgPrompt}
          placeholder="Try typing something to the robot!"
          onChange={(event) => {
            setMsgPrompt(event.target.value);
          }}
          onKeyPress={(event) => {
            handleKeyPress(event);
          }}
        />
        <button
          type="submit"
          className="send-btn"
          onClick={() => {
            handleSend();
          }}
        >
          Send
        </button>
        <button
          className={toggleView ? "options-btn options-active" : "options-btn"}
          onClick={() => {
            setToggleView(!toggleView);
          }}
        >
          Options
        </button>
      </div>
      <div className={toggleView ? "options-wrapper" : null}>
        {toggleView ? optionsList() : null}
      </div>
    </>
  );
}

export default Form;
