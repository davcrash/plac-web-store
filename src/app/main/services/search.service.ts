import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private _globalService: GlobalService) {}

  getSearchPlacesProducts(
    queryText,
    orderByPrice,
    paymentTypeFilter
  ): Observable<any> {
    return new Observable((subscriber) => {
      const productsOne = [
        {
          product_id: "4",
          product: {
            product_name: "Correa para gato misifus talla S",
            product_price: 55300,
            product_images: [
              {
                url:
                  "/assets/img/product-images/productcol-out-mg4cd6dpc4e5a223f05f0l9.jpg",
              },
            ],
          },
        },

        {
          product_id: "6",
          product: {
            product_name: "Cama auto ferrari para cachorro talla xs",
            product_price: 100000,
            product_images: [
              {
                url:
                  "/assets/img/product-images/productferrari398960b050c20al255ep5c.jpg",
              },
            ],
          },
        },

        {
          product_id: "8",
          product: {
            product_name: "Comida chunky para perro adulto que ladra",
            product_price: 35000,
            product_images: [
              {
                url:
                  "/assets/img/product-images/product4fa5896c5al2216pddb00b.png",
              },
            ],
          },
        },
        {
          product_id: "9",
          product: {
            product_name: "Banana para perro cariñoso no tan grande",
            product_price: 6000,
            product_images: [
              {
                url:
                  "/assets/img/product-images/productJP101326bca592c0b2p20al5821.png",
              },
            ],
          },
        },
      ];
      const productsTwo = [
        {
          product_id: "5",
          product: {
            product_name: "Cama tibuton comelon para cachorro talla xs",
            product_price: 40250,
            product_images: [
              {
                url:
                  "/assets/img/product-images/producttiburon2p290c95b6badc062al250.jpg",
              },
            ],
          },
        },
        {
          product_id: "7",
          product: {
            product_name: "Peluche conejo BadBunny Brrr para conejos malos",
            product_price: 19900,
            product_images: [
              {
                url: "/assets/img/product-images/product1IMGixJ33z7owj.jpg",
              },
            ],
          },
        },
      ];
      const placesWithProducts = [
        {
          place_id: "1",
          place_location: {
            place_location_name: "Halari Cat Toys",
            place_description: "Tienda de juguetes para gato",
          },
          assessment: 5,
          path_image_logo: "/assets/img/place-imgs/logot08g3Scd9A.jpg",
          products: { data: productsOne },
          next_page_url: null,
        },
        {
          place_id: "1",
          place_location: {
            place_location_name: "Cato",
            place_description: "Tienda de gatos para gatos",
          },
          assessment: 4,
          path_image_logo: "/assets/img/place-imgs/logoTuNk3nd538.png",
          products: { data: productsTwo },
          next_page_url: null,
        },
      ];

      setTimeout(() => subscriber.next(placesWithProducts), 1000);
    });
  }

  getMorePlacesWithProducts(
    url,
    queryText,
    orderByPrice,
    paymentTypeFilter
  ): Observable<any> {
    return new Observable();
  }
}
