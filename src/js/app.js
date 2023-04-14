import ElementList from './elementList.js';
import MyFormCreated from './formForTK.js';

const port = 3500;
const appXhr = new XMLHttpRequest();
const parentElenemt = document.querySelector('.for_elements');
const parentForm = document.querySelector('.for_form');
const formTK = new MyFormCreated(parentForm, port, appXhr);
const elememtList = new ElementList(parentElenemt, appXhr, port);

// console.log(document.querySelector('.body'))
// formTK.addForm()
// document.addEventListener('click', (e) =>{
//     console.log("Click body")

// })
appXhr.onreadystatechange = function () {
  if (appXhr.readyState !== 4) return;
  const responceServer = JSON.parse(appXhr.responseText);
  console.log(responceServer);
  if (responceServer.method === 'DELETE') {
    return;
  }

  elememtList.addElement(responceServer);
};

const btnAddTk = document.querySelector('.btn_add_Tk');
btnAddTk.addEventListener('click', (e) => {
  e.preventDefault();
  formTK.addForm();
});
