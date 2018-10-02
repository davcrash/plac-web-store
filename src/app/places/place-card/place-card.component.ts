import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceProfileService } from '../services/place-profile.service';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {

  @Input() placeId: string;
  @Input() placeDescription: string;
  @Input() placePathImageLogo: string;
  @Input() placeName: string;
  @Input() placeAssessment: number;


  @Input() placeToProfile?: any;
  @Input() categoryToProfile?: any;
  @Input() subcategoryNameToProfile?: any;
  @Input() subcategoryIdToProfile?: any;
  @Input() brandToProfile?: any;

  arrayAssessmentStars: Array<number>;
  arrayAssessmentNoStars: Array<number>;


  constructor(
    private _router: Router,
    private _placeProfileService: PlaceProfileService
  ) { }

  ngOnInit() {
    //para listar las estrellas
    this.arrayAssessmentStars = Array(Math.round(this.placeAssessment)).fill(0).map((x, i) => i);
    this.arrayAssessmentNoStars = Array(-this.arrayAssessmentStars.length + 5).fill(0).map((x, i) => i);

    let maxLength = 70;
    if (this.placeDescription.length > maxLength) {
      this.placeDescription = this.placeDescription.substring(0, maxLength).trim().concat('...');;
    }
  }

  selectPlace() {
    this._placeProfileService.place = this.placeToProfile;
    this._placeProfileService.category = this.categoryToProfile;
    this._placeProfileService.subcategoryId = this.subcategoryIdToProfile;
    this._placeProfileService.brand = this.brandToProfile;
    this._router.navigate(['/place/' + this.placeId]);
  }

}
