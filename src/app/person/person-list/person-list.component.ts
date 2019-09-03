import { Component, OnInit, Input, Output } from '@angular/core';
import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[];
  loadedForm = false; 

  constructor(private personService: PersonService) { }

  ngOnInit() {

  }

  ngDoCheck() {
    this.persons = this.personService.getPersons();
  }

  editPerson(person){
    console.log(person);
    let personEdited = this.personService.getPerson(person);
    this.loadedForm = true;
    console.log(personEdited);
  }

  formSubmitted() {
    this.loadedForm = false;
  }

  deletePerson(person){
    this.personService.deletePerson(person);
  }

}
