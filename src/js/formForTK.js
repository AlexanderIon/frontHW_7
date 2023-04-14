export default class MyFormCreated {
  constructor(parentEl, portForSend, xhr) {
    this.parentEl = parentEl;
    this.portForSend = portForSend;
    this.xhr = xhr;
    this.method = 'POST';
    this.response = {};
    this.formTkSubmit = this.formTkSubmit.bind(this);
    this.closeFrom = this.closeFrom.bind(this);
    this.delForm = this.delForm.bind(this);
    // this.btnForm = this.clickBtnForm.bind(this);
    // this.delForm = this.delForm.bind(this);
    // this.submitForm = this.submitForm.bind(this);
  }

  static get getHtlm() {
    return `
        <form class="form_add_ticket" id="formTicketFull">
        <h2 class="title-forlm"> ДОБАВИТЬ ТИКЕР</h2>
        <div class="form_add_ticket_data">
            <div class="ticketfull" >
                <label class="title_input">Кратое описание</label>
                <input class="ticketfull__data" id="newNameTk" name="name" class="input" placeholder="Ticket">
            </div>
            <div class="ticketfull" >
                <label class="title_input">Описание задачи</label>
                <!-- <input class="ticketfull__data" name="descreption" class="input" placeholder="description"> -->
                 <textarea class="ticketfull__data" id="description"  name="descreption" rows="4"></textarea>
            </div>
            <div class="form_add_ticket_btns" >
                <button class="btnCreate" id="create_ticket" >CREATE</button>
                <button class="btnCancel" id="close_form">CANCEL</button>
    
            </div>
        </div>            
        </form>
        `;
  }

  static get selectorForm() {
    return '.form_add_ticket';
  }

  static get title() {
    return '.title-forlm';
  }

  static get closeBtnForm() {
    return '.btnCancel';
  }

  static get inputName() {
    return 'newNameTk';
  }

  static get inputDescrp() {
    return 'description';
  }

  delForm() {
    const myForm = document.querySelector(MyFormCreated.selectorForm);
    myForm.parentNode.removeChild(myForm);
  }

  addForm() {
    this.parentEl.innerHTML = MyFormCreated.getHtlm;
    this.elememt = this.parentEl.querySelector(MyFormCreated.selectorForm);
    this.title = this.elememt.querySelector(MyFormCreated.title);
    this.nameTk = document.getElementById(MyFormCreated.inputName);
    this.discription = document.getElementById('description');
    this.elememt.addEventListener('submit', this.formTkSubmit);

    this.btnCloseFrom = this.elememt.querySelector(MyFormCreated.closeBtnForm);
    this.btnCloseFrom.addEventListener('click', this.closeFrom);
  }

  formTkSubmit(e) {
    e.preventDefault();

    if (this.method !== 'POST') {
      console.log('This is not a POST');
      const put = document.querySelector(MyFormCreated.selectorForm);

      console.log(put);
      this.xhr.open('PUT', `http://localhost:${this.portForSend}/?method=changeTicket`);
      this.xhr.send(put);
      // this.delForm();
      return;
    }
    if (this.nameTk.value === '') return;

    // const xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState !== 4) return;
    //   console.log(xhr.responseText);
    //     // this.response = xhr.responseText
    //     // console.log(data)
    // };
    const dataForm = new FormData(this.elememt);
    this.xhr.open('POST', `http://localhost:${this.portForSend}/?method=createTicket`);
    this.xhr.send(dataForm);

    console.log('FORM was Fulled data spent SERVER');

    this.delForm();
  }

  closeFrom(e) {
    e.preventDefault();
    console.log('you are press Close');
    this.delForm();
  }
}
