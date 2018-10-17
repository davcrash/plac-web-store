import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { SellInService } from './sell-in.service';

@Component({
  selector: 'app-sell-in',
  templateUrl: './sell-in.component.html',
  styleUrls: ['./sell-in.component.css']
})
export class SellInComponent implements OnInit {

  @ViewChild('nav') nav: ElementRef;
  @Output() isInSellIn = new EventEmitter<any>();
  constructor(private _sellInService: SellInService) {


  }



  ngOnInit() {
    this.isInSellIn.emit(true);

    this._sellInService.scrollValue.subscribe(event => {
      //console.log(this.nav.nativeElement.getBoundingClientRect().top);
      if (this.nav.nativeElement.getBoundingClientRect().top <= 72) {
        if (!this.nav.nativeElement.classList.contains('navfixed')) {
          this.nav.nativeElement.className = 'row navmenu border-bottom navfixed';
        }
      }
      if (event < 707) {
        if (this.nav.nativeElement.classList.contains('navfixed')) {
          this.nav.nativeElement.className = 'row navmenu';
        }
      }
    });
  }


}
