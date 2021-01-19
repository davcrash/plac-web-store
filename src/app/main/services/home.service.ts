import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private _globalService: GlobalService) {}

  getFeaturedProducts(): Observable<any> {
    return new Observable((subscriber) => {
      const products = [
        {
          product_id: "1",
          product: {
            product_name: "Correa negra para perro Talla XS",
            product_price: 5000,
            product_images: [
              {
                url:
                  "/assets/img/product-images/producttrailla-12a30f2c0dfe0l7pc5c845.jpg",
              },
            ],
          },
        },
        {
          product_id: "2",
          product: {
            product_name: "Barf MasVital 6 barras de cerdo congeladas",
            product_price: 50000,
            product_images: [
              {
                url:
                  "/assets/img/product-images/productMVPAMIXS60c26dp082cc5l2cac47026.jpg",
              },
            ],
          },
        },
        {
          product_id: "2",
          product: {
            product_name: "Barf MasVital 1 barra de cerdo congelada",
            product_price: 4500,
            product_images: [
              {
                url:
                  "/assets/img/product-images/productMVSM5a09ld67aa1bbcp26a20d.jpg",
              },
            ],
          },
        },
        {
          product_id: "2",
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
          product_id: "2",
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
          product_id: "2",
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
          product_id: "2",
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
        {
          product_id: "2",
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
          product_id: "2",
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
      subscriber.next(products);
    });
  }

  getFeaturedPlaces(): Observable<any> {
    return new Observable((subscriber) => {
      const places = [
        {
          place_id: "1",
          place_location: {
            place_location_name: "MasVital",
            place_description: "Tienda de alimento organico para mascotas",
          },
          assessment: 3.5,
          path_image_logo:
            "/assets/img/place-imgs/productMVPAMIXS603256900lc62664cc6bapd.jpg",
        },
        {
          place_id: "1",
          place_location: {
            place_location_name: "Pawceros",
            place_description: "Tienda de gatos en medallo pa pa!",
          },
          assessment: 5,
          path_image_logo:
            "/assets/img/place-imgs/productMichi8054521215eeabpl0abd20c.png",
        },
        {
          place_id: "1",
          place_location: {
            place_location_name: "New Concept",
            place_description:
              "Tienda de nuevos conceptos para mascotas con alto intelecto",
          },
          assessment: 1,
          path_image_logo: "/assets/img/place-imgs/logo026M7d6z1o.png",
        },
        {
          place_id: "1",
          place_location: {
            place_location_name: "Vital pet",
            place_description:
              "Ni idea que venda esta tienda, pero siempre presente en our heart",
          },
          assessment: 3.5,
          path_image_logo: "/assets/img/place-imgs/logo6rbE82eG59.jpg",
        },
        {
          place_id: "1",
          place_location: {
            place_location_name: "Halari Cat Toys",
            place_description: "Tienda de juguetes para gato",
          },
          assessment: 5,
          path_image_logo: "/assets/img/place-imgs/logot08g3Scd9A.jpg",
        },
        {
          place_id: "1",
          place_location: {
            place_location_name: "Cato",
            place_description: "Tienda de gatos para gatos",
          },
          assessment: 4,
          path_image_logo: "/assets/img/place-imgs/logoTuNk3nd538.png",
        },
      ];
      subscriber.next(places);
    });
  }
}
