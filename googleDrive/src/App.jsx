import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MyDrive from "./components/MyDrive";
import Folder from "./components/Folder";
import File from "./components/File";

function App() {
  const user = { name: "efrat", id: 1 };
  return (
    <>
      <BrowserRouter>
        {/* <UserProvider> */}
        <Routes>
          {/* <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} /> */}
          <Route path="/myDrive">
            <Route index element={<MyDrive user={user} />} />
            <Route path="folder" element={<Folder />} />
            <Route path="file" element={<File />} />
          </Route>
        </Routes>
        {/* </UserProvider> */}
      </BrowserRouter>
    </>
  );
}

export default App;
