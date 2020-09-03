import { Component, OnInit } from '@angular/core';
import { FoodsService } from './foods.service';
import { isNgTemplate } from '@angular/compiler';
import { IFood } from '../food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  constructor(private foodService: FoodsService) {
    this.foodService.getFoods().subscribe(response => this.foodService.allFoods.next(response));
    this.foodService.allFoods.subscribe((x: Array<IFood>) => {
      this.foods = x;
      this.selectedFoods = x.filter(y => y.selectedCount > 0);
    });
    this.foodService.selectedFoods.subscribe(x => this.selectedFoods = x);
    this.foodService.calculatePrice();
  }

  selectedCount;
  foods: Array<IFood> = [];
  food: IFood;
  selectedFoods: Array<IFood>;

  ngOnInit() { }

  plus(id: number) {
    this.food = this.foodService.allFoods.value.find(f => f.id === id);
    this.food.selectedCount += 1;
    this.foodService.calculatePrice();
    this.foodService.getSelectedItems();
  }
  minus(id: number ){
    this.food = this.foodService.allFoods.value.find(f => f.id === id);
    if (this.food.selectedCount > 0 ) {
      this.food.selectedCount -= 1;
    }
    this.foodService.calculatePrice();
    this.foodService.getSelectedItems();
  }
}
