import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductModalService {
  constructor(private _globalService: GlobalService) {}

  getProductById(id): Observable<any> {
    return new Observable((subscriber) => {
      const random_boolean = Math.random() < 0.5;
      if (random_boolean) {
        subscriber.next({
          product_id: 1,
          product_name: "Cama tibuton comelon para cachorro talla xs",
          product_price: 40250,
          product_images: [
            {
              url:
                "/assets/img/product-images/producttiburon2p290c95b6badc062al250.jpg",
            },
          ],
          product_link_image:
            "/assets/img/product-images/producttiburon2p290c95b6badc062al250.jpg",
          place_location: {
            place_location_name: "MasVital",
            place_description: "Tienda de alimento organico para mascotas",
            place: {
              path_image_logo:
                "/assets/img/place-imgs/productMVPAMIXS603256900lc62664cc6bapd.jpg",
            },
            place_id: 1,
          },
          place_id: 1,
          product_description:
            "Cama super confortable para tu cachorro lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó",
          questions: [
            {
              question_txt: "Que tallas tienes disponibles?",
              answer_txt: "Hola, Tenemos en talla s talla m y talla este",
            },
          ],
        });
      } else {
        subscriber.next({
          product_id: 2,
          product_name: "Peluche conejo BadBunny Brrr para conejos malos",
          product_price: 19900,
          product_images: [
            {
              url: "/assets/img/product-images/product1IMGixJ33z7owj.jpg",
            },
          ],
          product_link_image:
            "/assets/img/product-images/product1IMGixJ33z7owj.jpg",
          place_location: {
            place_location_name: "Pawceros",
            place_description: "Tienda de gatos en medallo pa pa!",
            place: {
              path_image_logo:
                "/assets/img/place-imgs/productMichi8054521215eeabpl0abd20c.png",
            },
            place_id: 1,
          },
          place_id: 1,
          product_description:
            "Peluche super confortable para tu cachorro lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó",
          questions: [
            {
              question_txt: "Que tallas tienes disponibles?",
              answer_txt: "Hola, Tenemos en talla s talla m y talla este",
            },
            {
              question_txt: "Donde estan ubicados?",
              answer_txt:
                "ipsum es simplemente el texto de relleno de las ipsum es simplemente el texto de relleno de las",
            },
          ],
        });
      }
    });
  }

  sendNewQuestion(question): Observable<any> {
    return;
  }
}
