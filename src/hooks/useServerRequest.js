export default function useServerRequest() {
  function serverRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.responseType = 'json'
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onload = function() {
        resolve(xhr.response)
      }
      xhr.send(JSON.stringify(body))
    })
  }
  return {
    serverRequest: serverRequest
  }
}
