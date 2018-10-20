import { Component, OnInit } from '@angular/core';
import { PressService } from './press.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {

  constructor(private _pressService: PressService) { }

  info;

  ngOnInit() {
    this._pressService.getInfo().subscribe(result => this.info = result);
  }

}
