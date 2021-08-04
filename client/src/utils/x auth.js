// class Auth {
//   constructor() {
//     this.authenticated = false;
//   }

//   login(cb) {
//     this.authenticated = true;
//     cb();
//   }

//   logout(cb) {
//     this.authenticated = false;
//     cb();
//   }

//   isAuthenticated() {
//     return this.authenticated;
//   }
// }

export const isLogin = () => {
  console.log('document.cookie', document.cookie)
  return ('document.cookie', document.cookie)

}

// export default new Auth();
