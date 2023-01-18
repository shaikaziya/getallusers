import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetUsers, asyncRemoveUser } from "./actions/getUserAction";
function App() {
  const dispatch = useDispatch();

  const users = useSelector((state) => {
    return state.users;
  });
  console.log(users);
  // useEffect(() => {});

  const handleChange = (type, id) => {
    console.log({ type });
    if (type === "GET_USERS") dispatch(asyncGetUsers());
    if (id && type === "REMOVE_USERS") dispatch(asyncRemoveUser(id));
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          handleChange("GET_USERS");
        }}
      >
        Click here
      </button>
      {users.map((ele) => {
        return (
          <li>
            {ele.name}
            {ele.email}
            <button onClick={() => handleChange("REMOVE_USERS", ele.id)}>
              Delete
            </button>
          </li>
        );
      })}
      {/* <button onClick={()=>{dispatch(asyncRemoveUser(ele.id))}}>Delete</button> */}
    </div>
  );
}

export default App;
