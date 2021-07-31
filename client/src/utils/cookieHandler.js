export function get_cookie() {
  // console.log("document.cookie=>", document.cookie);
  
  return document.cookie.split(';').some(c => {
    return c.trim().startsWith(process.env.REACT_APP_KUK + '=');
  });
}
// sid%colon=s%3AWTbHYErCa2PiHDVkTV2t8GLUEy9dzRCL.
// 6Q5ZvgdgzQcxA%2BgLLBUrUupVpn%2BOby%2FbomDRgOQfo0c; 
// Path=/; Expires=Sat, 31 Jul 2021 17:31:57 GMT;

export function delete_cookie(path, domain) {
  document.cookie = get_cookie() + '=; Max-Age=-99999999;';
  console.log('xxxxxxx', document.cookie);
  
  // if (get_cookie()) {
  //   document.cookie = process.env.REACT_APP_KUK + "=" +
  //     ((path) ? ";path=" + path : "") +
  //     ((domain) ? ";domain=" + domain : "") +
  //     ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  // }
}

