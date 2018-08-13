import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {

  @Input() private placeId:string;
  @Input() private placeDescription:string;
  @Input() private placePathImageLogo:string;

  constructor() { }

  ngOnInit() {
  }

}
