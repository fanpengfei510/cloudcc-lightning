/**
 * @class fetch封装网络请求
 * Created by fanpf on 2017/6/28.
 */

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  else {
    return Promise.reject(new Error(response.statusText));
  }
}
function json(response) {
  return response.json();
}

export default function request(url){
  return fetch(url)
    .then(status)
    .then(json)
    .then((data)=>{
      return data
    })
}