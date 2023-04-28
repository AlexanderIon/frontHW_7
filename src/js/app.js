import ElementList from './elementList.js';
import MyFormCreated from './formForTK.js';

const port = 3300;

const parentElenemt = document.querySelector('.for_elements');
const parentForm = document.querySelector('.for_form');
const elememtList = new ElementList(parentElenemt, port);
const formTK = new MyFormCreated(parentForm, port, elememtList);

const btnAddTk = document.querySelector('.btn_add_Tk');
btnAddTk.addEventListener('click', (e) => {
  e.preventDefault();
  formTK.addForm();
});
