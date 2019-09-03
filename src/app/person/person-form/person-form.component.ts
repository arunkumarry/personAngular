import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<string>();
  personForm: FormGroup;
  editMode = false;
  index: number;
  countryList: Array<any> = [
    { name: 'Germany', states: [{'name': 'Bavaria', 'cities': ['Munich', 'Passau']}, {'name': 'Saxony', 'cities': ['Plauen', 'Pirna']}]},
    { name: 'Spain', states: [{'name': 'Barcelona', 'cities': ['Barcelona', 'Palma']}]},
    { name: 'USA', states: [{'name': 'California', 'cities': ['LA', 'San Jose', 'Fremont', 'San Fransisco']}, {'name': 'Florida', 'cities': ['Miami', 'Orlando']}, {'name': 'Texas', 'cities': ['Houston', 'Dallas']}]},
    { name: 'Mexico', states: [{'name': 'Sonora', 'cities': ['Caborca']}]},
    { name: 'India', states: [{'name': 'Karnataka', 'cities': ['Bengaluru', 'Mysore']}, {'name': 'Andhra Pradesh', 'cities': ['Hyderabad', 'Vizag']}]},
  ];
  cities: Array<any>;
  states: Array<any>;

  constructor(private fb: FormBuilder, private personService: PersonService) { }

  ngOnInit() {
    let pers = this.personService.editPerson;
    this.personForm = this.fb.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    })

    this.personForm.valueChanges.subscribe(console.log);
    if ((pers !== undefined) && (JSON.stringify(pers) !== '{}')){
      this.editMode = true;
      this.index = this.personService.index;
      this.personForm.setValue({
        first_name: pers['first_name'],
        last_name: pers['last_name'],
        email: pers['email'],
        phone_number: pers['phone_number'],
        country: pers['country'],
        state: pers['state'],
        city: pers['city']
      })
    }
  }

  changeCountry(count) {
    this.states = this.countryList.find(con => con.name == count).states;
    this.cities = this.states[0].cities;
  };
  changeState(count) {
    this.cities = this.states.find(state => state.name == count).cities;
  }

  onSubmit() {
    console.log(this.personForm.value);
    let a = this.personForm.value;
    if (this.editMode === true){
      console.log(this.index, a);
      this.personService.updatePerson(this.index, a);
    } else {
      this.personService.addPerson(a);
    }
    this.submitted.emit('complete');
    
  }

}
