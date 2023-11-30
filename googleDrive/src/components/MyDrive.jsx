import React from "react";
import { Outlet } from "react-router-dom";

const MyDrive = ({ user }) => {
  //fetch get
  async function getFolders() {
    try {
      const response = await fetch("http://localhost:3001/users/1");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  getFolders();
  async function renameFile() {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("hi"),
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

  renameFile();
  return (
    <div>
      myDrive
      <Outlet />
    </div>
  );
};
export default MyDrive;
