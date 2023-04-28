import sendRequest from './sendRequest.js';

export default class MyFormCreated {
  constructor(parentEl, portForSend, elemForShow, change = false) {
    this.parentEl = parentEl;
    this.portForSend = portForSend;
    this.elemForShow = elemForShow;
    this.change = change;

    this.response = {};
    this.formTkSubmit = this.formTkSubmit.bind(this);
    // this.closeFrom = this.closeFrom.bind(this);
    // this.delForm = this.delForm.bind(this);
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

  static delForm() {
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
    this.btnCloseFrom.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('you are press Close');
      MyFormCreated.delForm();
    });
  }

  formTkSubmit(e) {
    e.preventDefault();
    if (this.nameTk.value === '') return;
    const dataForm = new FormData(this.elememt);
    if (this.change === false) {
      sendRequest('POST', `http://localhost:${this.portForSend}/?method=createTicket`, dataForm)
        .then((data) => {
          console.log('все хорошо');
          this.elemForShow.addElement(data);
        })
        .catch((err) => {
          // console.log('ОШИБКА ');
          console.log(err);
        });
    } else {
      console.log(`THis is Change ${this.change}`);
      console.log(this.elemForShow);
      sendRequest('POST', `http://localhost:${this.portForSend}/?method=changeTicketId&id=${this.change}`, dataForm)
        .then((data) => {
          console.log('Замена');
          this.elemForShow.dataset.name = data.name;
          this.elemForShow.dataset.description = data.description;
          this.elemForShow.querySelector('.element_list__content').textContent = data.name;
        })
        .catch((err) => {
          // console.log('ОШИБКА ');
          console.log(err);
        });
    }
    // sendRequest('POST', `http://localhost:${this.portForSend}/?method=createTicket`, dataForm)
    //   .then((data) => {
    //     console.log('все хорошо');
    //     this.elemForShow.addElement(data);
    //   })
    //   .catch((err) => {
    //     console.log('ОШИБКА ');
    //     this.elemForShow.addElement(dataForm);
    //   });

    MyFormCreated.delForm();
  }
}
