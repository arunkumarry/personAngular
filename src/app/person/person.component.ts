import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService]
})
export class PersonComponent implements OnInit {
  public loadPersonList:boolean = false;
  public loadForm:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  loadPersonListComponent() {
    this.loadPersonList = !this.loadPersonList;
  }

  loadPersonFormComponent(){
    this.loadForm = !this.loadForm;
  }

  formSubmitted() {
    this.loadForm = false;
  }

}
