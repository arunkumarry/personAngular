import { Person } from './person.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PersonService {
    public index: number;
    public editPerson: {};
    private persons: Person[] = [];
    personsChanged = new Subject<Person[]>();

    getPersons() {
        return this.persons.slice();
    }

    addPerson(person){
        this.persons.push(person);
        this.personsChanged.next(this.persons.slice());
    }

    getPerson(index: number){
        this.index = index;
        let person = this.persons[index];
        this.editPerson = person;
        return person;
    }

    updatePerson(index: number, person){
        this.persons[index] = person;
        this.index = null;
        this.editPerson = {};
        this.personsChanged.next(this.persons.slice());
    }

    deletePerson(index: number){
        this.persons.splice(index);
        this.personsChanged.next(this.persons.slice());
    }
}