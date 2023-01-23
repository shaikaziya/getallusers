/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
  asyncCreateUser,
} from "./actions/getUserAction";

function App() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const [newUser, setNewUser] = useState({name: '', email: ''});


  // Get users 
  useEffect(() => {
    dispatch(asyncGetUsers())
  },[])

  const users = useSelector((state) => {
    return state.users;
    // console.log(state.users+"state.users")
  });
  const handleClickOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };


  // handling text field inputs
  const handleChange= (field, e) => {
    const { value } = e.target
    if(field === 'userName'){
      setNewUser({...newUser, name: value})
    } else if(field ==='email'){
      setNewUser({...newUser, email: value})
    }
  }


  const handleClick = (type, id, payload) => {
    if (id && type === "REMOVE_USERS") dispatch(asyncRemoveUser(id));
    if (id && type === "EDIT_USERS")
      dispatch(asyncEditUser(payload, handleClose));
    if (type === "CREATE_USERS"){
      dispatch(asyncCreateUser(newUser))
      setNewUser({name: '', email: ''})
    } 

  };

  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    const data = { id: user.id, name: user.name, email: user.email };
    setUser(data);
    handleClickOpen();
  };
  
  return (
    <div className="App">
      {users.map((ele) => {
        return (
          <li key={ele.id}>
            {ele.name}
            {ele.email}
            <Button onClick={() => handleClick("REMOVE_USERS", ele.id)}>
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
              name="userName"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <TextField
              label="Enter email"
              variant="standard"
              name="email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <Button
              variant="contained"
              onClick={() => {
                handleClick("EDIT_USERS", user.id, user);
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

      <form>
        <TextField
          label="Enter name"
          variant="standard"
          value={newUser?.name}
          onChange={(e) => handleChange('userName', e)}
        />
        <TextField
          label="Enter email"
          variant="standard"
          value={newUser?.email}
          onChange={(e) => handleChange('email', e)}
        />
        <Button onClick={() => handleClick("CREATE_USERS")}>Add User</Button>
      </form>
    </div>
  );
}
export default App;
