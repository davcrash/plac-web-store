import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {

  @Input() private placeId: string;
  @Input() private placeDescription: string;
  @Input() private placePathImageLogo: string;
  @Input() private placeName: string;

  constructor() { }

  ngOnInit() {
    let maxLength = 70;
    if (this.placeDescription.length > maxLength) {
      this.placeDescription = this.placeDescription.substring(0, maxLength).trim().concat('...');;
      
    }
  }

}
