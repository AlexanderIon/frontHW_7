import MyFormCreated from './formForTK.js';
import sendRequest from './sendRequest.js';

export default class ElementList {
  constructor(parentEl, port) {
    this.parentEl = parentEl;

    this.port = port;
    this.clickBtnReduct = this.clickBtnReduct.bind(this);
    this.clickBtnDelete = this.clickBtnDelete.bind(this);
    // this.mouseOvernameTk = this.mouseOvernameTk.bind(this);
    // this.clickContent = this.clickContent.bind(this);
  }

  static get getHtml() {
    return `
        <div class="element_list">
            <div class="element_list__content"></div>
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
    this.content.addEventListener('mouseover', this.mouseOvernameTk);
    this.content.addEventListener('click', this.clickContent);
    // this.content.textContent = new Date().toLocaleTimeString();
    this.content.textContent = TicketFull.name;

    this.btnReduct = this.elementList.querySelector(ElementList.btnReduct);
    this.btnDelete = this.elementList.querySelector(ElementList.btnDelete);
    this.btnReduct.addEventListener('click', this.clickBtnReduct);
    this.btnDelete.addEventListener('click', this.clickBtnDelete);
  }

  clickBtnReduct(e) {
    const activElement = e.currentTarget.closest(ElementList.selector);
    const form = document.querySelector('.for_form');
    const formForChange = new MyFormCreated(form, this.port, activElement, activElement.id);
    console.log(activElement.id);
    formForChange.addForm();
    formForChange.title.textContent = 'ИЗМЕНЕНИЕ ТИКЕТА';
    formForChange.nameTk.value = activElement.getAttribute('data-name');
    formForChange.discription.textContent = activElement.getAttribute('data-description');
    console.log('You are going to  Reduct e.target');
  }

  clickBtnDelete(e) {
    const activElement = e.currentTarget.closest(ElementList.selector);
    activElement.parentNode.removeChild(activElement);
    console.log('You pess on DELETE');
    console.log(activElement.id);
    sendRequest('DELETE', `http://localhost:${this.port}/?method=deleteId&id=${activElement.id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // mouseOvernameTk(e) {
  //     console.log(e.relatedTarget)
  // }

  // clickContent(e){
  //   console.log("Это елемент");
  //   console.log(e.target)
  // }
}
