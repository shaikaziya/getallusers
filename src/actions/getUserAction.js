import axios from "axios";

export const asyncGetUsers = () => {
  return (dispatch) => {
    axios
      .get("https://63650a617b209ece0f558d28.mockapi.io/userinfo")
      .then((response) => {
        const result = response.data;
        dispatch(getUserAction(result));
      })
      .catch((error) => {
        console.log(error.message);
        // alert(error.message)
      });
  };
};
export const getUserAction = (result) => {
  return {
    type: "GET_USERS",
    payload: result,
  };
};

export const asyncRemoveUser = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://63650a617b209ece0f558d28.mockapi.io/userinfo/${id}`)
      .then((response) => {
        const result = response.data;
        dispatch(removeUser(result));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const removeUser = (result) => {
  return {
    type: "REMOVE_USERS",
    payload: result,
  };
};

export const asyncEditUser = (payload, handleClose) => {
  return (dispatch) => {
    axios
      .put(
        `https://63650a617b209ece0f558d28.mockapi.io/userinfo/${payload.id}`,
        payload
      )
      .then((response) => {
        const result = response.data;
        dispatch(editUser(result));
        handleClose();
      })

      .catch((error) => {
        alert(error.message);
      });
  };
};

export const editUser = (result) => {
  return {
    type: "EDIT_USERS",
    payload: result,
  };
};

export const asyncCreateUser = (values) => {
  console.log(values);
  return (dispatch) => {
    axios
      .post("https://63650a617b209ece0f558d28.mockapi.io/userinfo", values)
      .then((response) => {
        const result = response.data;
        dispatch(createUser(result));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const createUser = (result) => {
  return {
    type: "CREATE_USER",
    payload: result,
  };
};
