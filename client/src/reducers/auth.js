let initialUserState = { loggedIn: false, user: null, product: null }

export const authReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      console.log('action.payload changed')
      return {
        user: {...state.user, ...action.payload.user },
        loggedIn: true,
        stripe: { ...state.stripe, ...action.payload.stripe },
        balance: {...state.balance, ...action.payload.balance },
        product: { ...action.payload.product }
      }
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
