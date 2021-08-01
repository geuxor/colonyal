//create user reducer function { type: 'LOGGEDINUSER', payload: {name: 'xx', role:'seller'}}

let initialUserState = { loggedIn: false, user: null, products: [{}] }

export const authReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        loggedIn: true,
        ...action.payload
      }
    // action.payload //return { ...state, ...action.payload };
    case 'LOGOUT':
      return initialUserState;
    default:
      return state;
  }
}


//  case "LOGGED_IN_USER":
// return {
//   ...state,
//   loggedIn: true,
//   user: action.payload
// }