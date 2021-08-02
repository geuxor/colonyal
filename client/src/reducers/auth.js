//create user reducer function { type: 'LOGGEDINUSER', payload: {name: 'xx', role:'seller'}}

let initialUserState = { loggedIn: false, user: null, products: [{}] }

export const authReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      console.log('action.payload', action.payload)
      return {
        user: {...state.user, ...action.payload.user },
        loggedIn: true,
        stripe: { ...state.stripe, ...action.payload.stripe },
        balance: {...state.balance, ...action.payload.balance }
      }
    // action.payload //return { ...state, ...action.payload };
    case 'LOGOUT':
      return initialUserState;
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, email: action.payload}
      }
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