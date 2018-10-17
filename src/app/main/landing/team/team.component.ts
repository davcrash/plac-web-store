import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor() { }
  team = [
    { firstName: 'Jose', lastName: 'Otero', workPosition: 'Chief Executive Officer', description: 'a' },
    { firstName: 'Carlos', lastName: 'Arango', workPosition: 'Chief Executive Officer', description: 'b' },
    { firstName: 'Daniela', lastName: 'Casas', workPosition: 'Chief Executive Officer', description: 'c' },
    { firstName: 'Sylvia', lastName: 'Karkles', workPosition: 'Chief Executive Officer', description: 'd' },
    { firstName: 'Kevin', lastName: 'Vargas', workPosition: 'Chief Executive Officer', description: 'e' },
    { firstName: 'David', lastName: 'Morales', workPosition: 'Chief Executive Officer', description: 'f' },
    { firstName: 'Jose', lastName: 'Agilar', workPosition: 'Chief Executive Officer', description: 'g' },
    { firstName: 'Patricia', lastName: 'López', workPosition: 'Chief Executive Officer', description: 'h' },
  ];

  personSelected = this.team[0];

  ngOnInit() {
  }

  selectPerson(person) {
    this.personSelected = person;
  }
}
