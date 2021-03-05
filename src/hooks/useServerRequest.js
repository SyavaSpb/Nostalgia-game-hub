export default function useServerRequest() {
  function serverRequest(method, url, body = null, resHead = "json", reqHead = "application/json") {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.responseType = resHead
      xhr.setRequestHeader('Content-Type', reqHead)
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
