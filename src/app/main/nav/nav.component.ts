import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() public showElement = true;
  @Output() public opened = new EventEmitter<any>();
  _opened = true;

  constructor() { }

  ngOnInit() {
  }

  showSideMenu(){
    this.opened.emit(!this._opened);
  }

}
