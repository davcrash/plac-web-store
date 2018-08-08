import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Output() public navBarMode = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
    this.navBarMode.emit('over');

  }

}
