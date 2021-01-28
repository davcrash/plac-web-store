import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { brands } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class BrandsService {
  constructor(private _globalService: GlobalService) {}

  getBrands(
    category_id,
    pet_target,
    subcategory_id,
    place_id?,
    search?
  ): Observable<any> {
    return new Observable((r) => {
      r.next(brands);
    });
  }
}
