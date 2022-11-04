export const ADD_USER = "ADD_USER";
export const ADD_USER_FOR_LOCALSTORAGE = "ADD_USER_FOR_LOCALSTORAGE";
export const EXIT_USER = "EXIT_USER";
export const ONLINE = "ONLINE";
export const OFFLINE = "OFFLINE";
export const ADD_TAG = "ADD_TAG";
export const DELETE_TAG = "DELETE_TAG";
export const SET_DATE = "SET_DATE";
export const EDIT = "EDIT";
export const CREATE_ARTICLE = "CREATE_ARTICLE";
export const EDIT_USER = "EDIT_USER";

export const editeUser = (newUser) => {
  return {
    type: EDIT_USER,
    newUser: localStorage.setItem('user', JSON.stringify(newUser))
  };
}

export const addUser = (userInfo) => {
  return {
    type: ADD_USER,
    userInfo: userInfo,
    status: true,
  };
};

export const createArticle = (data) => {
  return {
    type: CREATE_ARTICLE,
    data: data,
  }
}
export const exitUser = (user) => {
  return {
    type: EXIT_USER,
    status: !true,
  };
};

export const userAddForLocalStorage = () => {
  return {
    type: ADD_USER_FOR_LOCALSTORAGE,
    userForLocal: localStorage.getItem('username')
  }
}

export const addTags = (params) => {
  return {
    type: ADD_TAG,
    value: params
  }
}
export const deleteTags = (params) => {
  return {
    type: DELETE_TAG,
    value: params
  }
}

export const online = (params) => {
  return {
    type: ONLINE,
    boolean: params
  }
}
export const offline = (params) => {
  return {
    type: OFFLINE,
    boolean: params
  }
}

export const onEdited = (params) => {
  return {
    type: EDIT,
    payload: params
  }
}

export const installDate = (date) => {
  return function(dispatch) {
    dispatch({
      type: SET_DATE,
      payload: date,
    })
  }
}

export const currentDateReducer = (state = '', action) => {
  switch (action.type) {
    case SET_DATE:
      return action.payload
    default:
      return state
  }
}

export const addUserReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [action.userInfo]
    case EXIT_USER:
      return { ...state, ...action };
    default:
      return state;
  }
};

export const userForLocalStorage = (state = '', action) => {
  switch (action.type) {
    case ADD_USER_FOR_LOCALSTORAGE:
      return action.userForLocal;
    default:
      return state;
  }
}

export const userLogIn = (state = false, action) => {
  switch (action.type) {
    case ONLINE:
      return action.boolean;
    case OFFLINE:
      return action.boolean
    default:
      return state;
  }
}

export const tagListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TAG:
      return [action.value];
    default:
      return state;
  }
}
export const onEditReducer = (state = false, action) => {
  switch (action.type) {
    case EDIT:
      return action.payload;
    default:
      return state;
  }
}

export const articleReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {...action.data};
    default:
      return state;
  }
}

export const newUserReducer = (state = {}, action) => {
  console.log(action.newUser)
  switch (action.type) {
    case EDIT_USER:
      return action.newUser;
    default:
      return state;
  }
}

export const reducer = (state, action) => {
  return {
    user: addUserReducer(state, action),
    userForLocalStorage: userForLocalStorage(state, action),
    booleanLogin: userLogIn(state, action),
    tagList: tagListReducer(state, action),
    currentDate: currentDateReducer(state, action),
    onEdit: onEditReducer(state, action),
    article: articleReducer(state, action),
    newUser: newUserReducer(state, action)
  };
};
