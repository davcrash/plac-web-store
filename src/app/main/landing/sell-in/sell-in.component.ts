import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { SellInService } from './sell-in.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sell-in',
  templateUrl: './sell-in.component.html',
  styleUrls: ['./sell-in.component.css']
})
export class SellInComponent implements OnInit {

  @ViewChild('nav') nav: ElementRef;


  @Output() isInSellIn = new EventEmitter<any>();


  destination: string;
  constructor(
    private _sellInService: SellInService,
    private _scrollToService: ScrollToService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {


  }

  scrollToInto(destination) {

    const config: ScrollToConfigOptions = {
      target: destination
    };
    this._scrollToService.scrollTo(config)
      .toPromise()
      .catch(err => this._router.navigate(['vende-en-plac']));
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

    this._route.params.subscribe(routeParam => {
      this.destination = routeParam.destination;
      this.scrollToInto(routeParam.destination);
    });
  }


}
