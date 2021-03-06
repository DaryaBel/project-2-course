import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../shared/services/main.service';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  filename="";
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    uploadAPI:  {
      url: `${environment.url}/upload-photo`,
    },
    replaceTexts: {
      selectFileBtn: 'Выберите файл',
      resetBtn: 'Удалить',
      uploadBtn: 'Загрузить',
      attachPinBtn: 'Прикрепите файл',
      afterUploadMsg_success: 'Успешно загружено!',
      afterUploadMsg_error: 'Загрузка прервана!'
    }
};
  form: FormGroup;
  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading=false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях 
  isEmpty=true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
  succes=false;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      artikul: new FormControl("", [Validators.required]),
      price: new FormControl("", [
        Validators.required,
        Validators.min(1),
      ]),
      number: new FormControl(``, [
        Validators.required,
        Validators.min(0),
      ]),
      weight: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      ingredients: new FormControl("", [Validators.required]),
      // 'photo': new FormControl('', [Validators.required]),
    });
  }

  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAdd(){   
    if ((this.form.value.name=="")||(this.form.value.artikul=="")||(this.filename=="")||(this.form.value.price=="")||(this.form.value.weight=="")||(this.form.value.description=="")||(this.form.value.num=="")||(this.form.value.ingredients=="")) {
      this.isEmpty=false;
    } else {
      this.loading=true;
      this.isEmpty=true;
      let product = {
        name: this.form.value.name,
        filename: this.filename,
        artikul: this.form.value.artikul,
        number: this.form.value.number,
        price: this.form.value.price,
        weight: this.form.value.weight,
        description: this.form.value.description,
        ingredients: this.form.value.ingredients
      }
      // console.log(product);
      this.filename = "";
      try {;
        let result = await this.mainService.post(JSON.stringify(product), "/add");
        let obj = {
          idproduct: result,
          operation: "+",
          different: this.form.value.number,
        };
        let res = await this.mainService.post(JSON.stringify(obj), `/history`);
      } catch (err) {
        console.log(err);
      }
      this.form.reset();
      this.loading=false;
      this.succes=true;
    }   
  }
// Функция, скрывающая сообщения о незаполненности полей и успешном добавлении товара (вызвается при фокусировке на одном из полей формы)
  onSucces(){
    this.succes=false;
    this.isEmpty=true;
  }

  // Функция, возвращение имени загруженного файла
  fileUpload(event){
    // console.log(JSON.parse(event.response).filename);
    this.filename = JSON.parse(event.response).filename;
  }

}
