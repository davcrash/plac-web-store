import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel-arrows',
  templateUrl: './carousel-arrows.component.html',
  styleUrls: ['./carousel-arrows.component.css']
})
export class CarouselArrowsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollRight(element) {
    var position = parseInt(element.getAttribute("position"));
    var maxScrollLeft = element.scrollWidth - element.clientWidth;
    var displacementScroll = 600;

    element.setAttribute("showLeft", "true");
    element.setAttribute("showRight", "true");

    element.scroll({
      left: position + displacementScroll, 
    behavior: 'smooth' });
    element.setAttribute("position", (parseInt(element.getAttribute("position")) + displacementScroll));
    //Si la posicion es mayor a max se esconde la flecha derecha
    if (position + displacementScroll >= maxScrollLeft) {
      element.setAttribute("showRight", "false");
    }
  }

  scrollLeft(element) {
    var position = parseInt(element.getAttribute("position"));
    var displacementScroll = 600;

    element.setAttribute("showRight", "true");
    element.setAttribute("showLeft", "true");

      element.scroll({
        left: position - displacementScroll,
        behavior:'smooth'
      });
      element.setAttribute("position", (parseInt(element.getAttribute("position")) - displacementScroll))
    //Si la posicion es menor a 0 se esconde la flecha izquierda
    if (position - displacementScroll <= 0) {
      element.setAttribute("showLeft", "false");
    } 

  }

}
