import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
// import {UpdateUser} from "./UpdateUser"
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncGetUsers,
  asyncRemoveUser,
  asyncEditUser,
} from "./actions/getUserAction";

function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const users = useSelector((state) => {
    return state.users;
  });
  const handleClickOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
 

  const handleChange = (type, id, payload) => {
    if (type === "GET_USERS") dispatch(asyncGetUsers());
    if (id && type === "REMOVE_USERS") dispatch(asyncRemoveUser(id));
    if (id && type === "EDIT_USERS") dispatch(asyncEditUser(payload,handleClose));
    console.log(payload)

  };

  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    const data = { id: user.id, name: user.name, email: user.email };
    setUser(data);
    handleClickOpen()
  };

  return (
    <div className="App">
      <Button
        onClick={() => {
          handleChange("GET_USERS");
        }}
      >
        Click here
      </Button>
      {users.map((ele) => {
        return (
          <li key={ele.id}>
            {ele.name}
            {ele.email}
            <Button onClick={() => handleChange("REMOVE_USERS", ele.id)}>
              Delete
            </Button>

          <Button onClick={() => handleEdit(ele.id)}>Update</Button>
            
          </li>
        );
      })}

      <Dialog open={show}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              label="Enter name"
              variant="standard"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <TextField
              label="Enter email"
              variant="standard"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <Button
              variant="contained"
              onClick={() => {
                handleChange("EDIT_USERS", user.id, user);
              }}
            >
              save
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default App;
