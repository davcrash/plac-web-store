import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor() { }
  team = [
    { firstName: 'Jose', lastName: 'Otero', workPosition: 'Chief Executive Officer', description: 'a', img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' },
    { firstName: 'Carlos', lastName: 'Arango', workPosition: 'Chief Executive Officer', description: 'b', img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' },
    { firstName: 'Daniela', lastName: 'Casas', workPosition: 'Chief Executive Officer', description: 'c', img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' },
    { firstName: 'Sylvia', lastName: 'Karkles', workPosition: 'Chief Executive Officer', description: 'd', img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' },
    { firstName: 'Kevin', lastName: 'Vargas', workPosition: 'Chief Executive Officer', description: 'e', img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' },
    { firstName: 'David', lastName: 'Morales', workPosition: 'Chief Executive Officer', description: 'f', img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' },
    { firstName: 'Jose', lastName: 'Agilar', workPosition: 'Chief Executive Officer', description: 'g', img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' },
    { firstName: 'Patricia', lastName: 'López', workPosition: 'Chief Executive Officer', description: 'h', img: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' },
  ];

  personSelected = this.team[0];

  ngOnInit() {
  }

  selectPerson(person) {
    this.personSelected = person;
  }
}
