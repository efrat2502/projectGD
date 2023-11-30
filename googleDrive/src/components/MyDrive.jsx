import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import File from "./File";

const MyDrive = ({ user }) => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState({});
  const navigate = useNavigate();
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

  async function getFile(url, itemName) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userFile = await response.json();
      console.log("userFile: ", userFile);
      setFile({ name: itemName, content: userFile });
      // navigate("/myDrive/file");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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

  if (JSON.stringify(file) !== "{}") {
    console.log("file: ", file);
    return (
      <>
        <File file={file} userId={user.id} />
      </>
    );
  } else {
    return (
      <>
        <h1>myDrive</h1>
        {/* {data.length > 0 ? data : <h2>loading...</h2>} */}
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.name}>
              {item.isDir ? (
                <>
                  <button
                    onClick={() =>
                      getFolders(
                        `http://localhost:3001/users/${user.id}/${item.name}`,
                        item
                      )
                    }
                  >
                    {item.name}📁
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      getFile(
                        `http://localhost:3001/users/${user.id}/${item.name}`,
                        item.name
                      )
                    }
                  >
                    {item.name}📝
                  </button>
                </>
              )}
              <button onClick={() => handleDelete(item.name)}>🗑️</button>
              {/* <button onClick={() => handleRename(item.name)}>✏️</button> */}

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
