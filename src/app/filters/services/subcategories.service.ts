import { Injectable } from "@angular/core";
import { GlobalService } from "../../global.service";
import { Observable } from "rxjs";
import { subcategories } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class SubcategoriesService {
  constructor(private _globalService: GlobalService) {}

  getSubCategories(category_name, pet_target): Observable<any> {
    const max = subcategories.length - 1;
    var randomnumber = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    const finalsub = subcategories.slice(randomnumber, randomnumber + 6);
    return new Observable((r) => r.next(finalsub));
  }
}
