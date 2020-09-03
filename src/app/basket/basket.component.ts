import { Component, OnInit } from '@angular/core';
import { FoodsService } from '../food/foods.service';
import { IFood } from '../food';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private foodService: FoodsService) {
    this.foodService.getFoods().subscribe(response => this.foodService.allFoods.next(response));
    this.foodService.totalPrice.subscribe((z: number) => {
      this.totalPrice = z;
    });
    this.foodService.allFoods.subscribe((x: Array<IFood>) => {
      this.foods = x;
      this.selectedFoods = x.filter(y => y.selectedCount > 0);
    });
    this.foodService.selectedFoods.subscribe(x => this.selectedFoods = x);
  }

  foods: Array<IFood> = [];
  food: IFood;
  selectedFoods: Array<IFood> = [];
  basket: Array<IFood> = [];
  totalPrice = 0;
  showMsg = false;
  clicked = false;

  ngOnInit() {
    // this.selectedFoods = this.foodService.foods.value;
    this.totalPrice = 36; // hard code. change later;
  }


  delete(id){
    this.food = this.foods.find(f => f.id === id);
    this.food.selectedCount = 0;
    this.foodService.calculatePrice();
    this.foodService.getSelectedItems();
  }
  check() {
    if (this.foods.find(x => x.selectedCount > 0) ) {
      this.showMsg = true;
    }
  }

}
