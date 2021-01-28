import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { places, products } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class ProductModalService {
  constructor(private _globalService: GlobalService) {}

  getProductById(id): Observable<any> {
    return new Observable((s) => {
      const product = products.find((product) => product.product_id == id);
      const place = places[1];
      s.next({
        ...product.product,
        product_id: product.product_id,
        product_link_image: product.product.product_images[0].url,
        place_id: place.place_id,
        place_location: {
          place_location_name: place.place_location.place_location_name,
          place_description: place.place_location.place_description,
          place: {
            path_image_logo: place.path_image_logo,
          },
          place_id: place.place_id,
        },
        product_description:
          "Super confortable para tu cachorro lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó",
        questions: [
          {
            question_txt: "Que tallas tienes disponibles?",
            answer_txt: "Hola, Tenemos en talla s talla m y talla este",
          },
          {
            question_txt: "Es confiable?",
            answer_txt: "Hola, Somos re confiables pana",
          },
          {
            question_txt:
              "un impresor (N. del T. persona que se dedica a la imprent los mezcló de tal manera que logró hacer un?",
            answer_txt:
              "lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando ",
          },
        ],
      });
    });
  }

  sendNewQuestion(question): Observable<any> {
    return;
  }
}
