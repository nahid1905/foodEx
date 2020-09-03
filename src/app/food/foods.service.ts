import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IFood } from '../food';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  food;
  foods: BehaviorSubject<Array<IFood>> = new BehaviorSubject<Array<IFood>>([]);
  allFoods: BehaviorSubject<Array<IFood>> = new BehaviorSubject<Array<IFood>>([]);
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedFoods: BehaviorSubject<Array<IFood>> = new BehaviorSubject<Array<IFood>>([]);
  private url = '/assets/data/foods.json';

  constructor(private http: HttpClient) {
  }

  getFoods(): Observable<IFood[]> {
    return this.http.get<IFood[]>(this.url);
  }

  calculatePrice() {
    let tot = 0;
    this.allFoods.value.forEach(value => {
      tot += (value.price * value.selectedCount);
    });
    this.totalPrice.next(tot);
    return tot;
  }
  getSelectedItems(){
    let selectedItems = [];
    selectedItems = this.allFoods.value.filter(x => x.selectedCount > 0);
    return selectedItems;
  }
}
