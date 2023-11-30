import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MyDrive = ({ user }) => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [clickedRename, setClickedRename] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submittedEdit, setSubmittedEdit] = useState(false);

  //fetch get
  async function getFolders(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = await response.json();
      console.log("Data:", userData);
      setData(userData);
      // showFolders(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getFolders(`http://localhost:3001/users/${user.id}`);
  }, []);

  async function getFile(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userFile = await response.json();
      console.log("userFile: ", userFile);
      setFile(userFile);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function renameFile() {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: "hi" }),
      };
      console.log("requestOptions: ", requestOptions);
      const response = await fetch(
        "http://localhost:3001/users/1/folder1",
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // renameFile();

  // async function handleDelete(fname) {
  //   console.log("entered");
  //   try {
  //     const response = await fetch(`http://localhost:3001/users/1/${fname}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     setFile((prev) => {
  //       const copyFiles= ...prev
  //       const filtered = copyFiles.filter((file) => file.name !== fname);
  //       return filtered;
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  async function handleDelete(fname) {
    console.log("entered");
    try {
      const response = await fetch(
        `http://localhost:3001/users/${user.id}/${fname}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setData((prevData) => {
        const updatedData = prevData.map((folder) => {
          if (folder.name === fname) {
            return folder;
          }
          return folder;
        });
        return updatedData.filter((folder) => folder.name !== fname);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmitEdit = () => {
    setSubmittedEdit((prev) => !prev);
    setClickedEdit((prev) => !prev);
    editPost();
  };
  if (file != "") {
    return (
      <>
        <p>{file}</p>
      </>
    );
  } else {
    return (
      <>
        <h1>myDrive</h1>
        {/* {data.length > 0 ? data : <h2>loading...</h2>} */}
        {data.length > 0 ? (
          data.map((f) => (
            <div key={f.name}>
              {f.isDir ? (
                <>
                  <button
                    onClick={() =>
                      getFolders(
                        `http://localhost:3001/users/${user.id}/${f.name}`
                      )
                    }
                  >
                    {f.name}📁
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      getFile(
                        `http://localhost:3001/users/${user.id}/${f.name}`
                      )
                    }
                  >
                    {f.name}📝
                  </button>
                </>
              )}
              <button onClick={() => handleDelete(f.name)}>🗑️</button>
              {/* <button onClick={() => handleRename(f.name)}>✏️</button> */}
              {/* <button onClick={() => setClickedRename((prev) => !prev)}>
                ✏️
              </button> */}
              {/* <>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  style={{ width: "10vw", height: "10vh" }}
                />
                <br />
              </> */}
              {/* {clickedRename ? (
              ) : null} */}
              <br />
            </div>
          ))
        ) : (
          <h2>your folder is empty</h2>
        )}
        <Outlet />
      </>
    );
  }
};

export default MyDrive;
