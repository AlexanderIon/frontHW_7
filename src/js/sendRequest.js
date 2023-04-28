export default function sendRequest(anyMethod, anyUrl, dataForServer = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(anyMethod, anyUrl);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => {
      reject(xhr.response);
    };

    xhr.send(dataForServer);
  });
}
