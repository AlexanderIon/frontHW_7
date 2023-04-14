import MyFormCreated from './formForTK.js';

export default class ElementList {
  constructor(parentEl, xhr, port) {
    this.parentEl = parentEl;
    this.xhr = xhr;
    this.port = port;
    this.clickBtnReduct = this.clickBtnReduct.bind(this);
    this.clickBtnDelete = this.clickBtnDelete.bind(this);
  }

  static get getHtml() {
    return `
        <div class="element_list">
            <div class="element_list__content"> </div>
            <div class="element_list__btns">
                <button class='element_list__btn_reduct' >
                <button class='element_list__btn_del'>
            </div>
         </div>
            `;
  }

  static get selector() {
    return '.element_list';
  }

  static get content() {
    return '.element_list__content';
  }

  static get btnReduct() {
    return '.element_list__btn_reduct';
  }

  static get btnDelete() {
    return '.element_list__btn_del';
  }

  addElement(TicketFull) {
    this.parentEl.insertAdjacentHTML('afterbegin', ElementList.getHtml);

    this.elementList = this.parentEl.querySelector('.element_list');

    const idElement = TicketFull.id;
    this.elementList.id = `${idElement}`;
    this.elementList.dataset.description = TicketFull.description;
    this.elementList.dataset.name = TicketFull.name;
    this.content = this.elementList.querySelector(ElementList.content);

    // this.content.textContent = new Date().toLocaleTimeString();
    this.content.textContent = TicketFull.name;
    this.btnReduct = this.elementList.querySelector(ElementList.btnReduct);
    this.btnDelete = this.elementList.querySelector(ElementList.btnDelete);
    this.btnReduct.addEventListener('click', this.clickBtnReduct);
    this.btnDelete.addEventListener('click', this.clickBtnDelete);
  }

  // findElement(idElement) {
  //     this.xhr.open('GET', `http://localhost:${activePorst}/?method=ticketById&id=${idElement}`);

  // }

  clickBtnReduct(e) {
    const activElement = e.currentTarget.closest(ElementList.selector);
    const form = document.querySelector('.for_form');
    const putForm = new MyFormCreated(form);
    console.log(activElement);
    putForm.addForm();
    putForm.method = {
      method: 'PUT',
      data: {
        name: activElement.getAttribute('data-name'),
        description: activElement.getAttribute('data-description'),
        id: activElement.id,

      },
    };
    putForm.title.textContent = 'ИЗМЕНЕНИЕ ТИКЕТА';
    putForm.nameTk.value = activElement.getAttribute('data-name');
    putForm.discription.textContent = activElement.getAttribute('data-description');
    console.log('You are going to  Reduct e.target');
  }

  clickBtnDelete(e) {
    const activElement = e.currentTarget.closest(ElementList.selector);
    activElement.parentNode.removeChild(activElement);
    console.log('You pess on DELETE');
    console.log(activElement.id);
    this.xhr.open('DELETE', `http://localhost:${this.port}/?method=deleteId&id=${activElement.id}`);
    this.xhr.send();
  }
}
