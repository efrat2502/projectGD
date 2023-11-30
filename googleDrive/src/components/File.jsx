import React, { useState } from "react";

const File = (props) => {
  const [clickedRename, setClickedRename] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submittedEdit, setSubmittedEdit] = useState(false);
  const [fileName, setFileName] = useState(props.file.name);
  async function renameFile() {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputValue }),
      };
      console.log("requestOptions: ", requestOptions);
      const response = await fetch(
        `http://localhost:3001/users/${props.userId}/${fileName}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // const data = response.data;
      // console.log("Data:", data);
      console.log("response: ", response);
      setFileName(inputValue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // renameFile();
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmitEdit = () => {
    setSubmittedEdit((prev) => !prev);
    setClickedRename((prev) => !prev);
    renameFile();
  };
  return (
    <div>
      <h1>{fileName}</h1>
      <p>{props.file.content}</p>
      <button onClick={() => setClickedRename((prev) => !prev)}>✏️</button>
      <>
        {clickedRename ? (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              style={{ width: "10vw", height: "10vh" }}
            />
            <button onClick={handleSubmitEdit}>submit</button>
            <button onClick={() => setClickedRename((prev) => !prev)}>
              cancel
            </button>
          </>
        ) : null}

        <br />
      </>
    </div>
  );
};

export default File;
