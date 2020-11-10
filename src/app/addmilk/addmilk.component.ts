import { Component, OnInit, ViewChild } from '@angular/core';
import { MilkService } from '../milk.service';

@Component({
  selector: 'app-addmilk',
  templateUrl: './addmilk.component.html',
  styleUrls: ['./addmilk.component.css'],
})
export class AddmilkComponent implements OnInit {
  quantityArray = ['1', '2', '3', '4', '5', '1.5', '2.5', '3.5', '4.5', '5.5'];
  selectedQty = null;

  constructor(private milkService: MilkService) {}

  ngOnInit(): void {}

  give(value: any) {
    this.selectedQty = value.target.value;
  }

  onAdd(): void {
    if (this.selectedQty != null) {
      this.milkService
        .storeDataIntoFirebase(+this.selectedQty)
        .subscribe((responseData) => {
          console.log('Daily Milk Recoreded Added');
        });
      this.selectedQty = null;
    } else {
      alert('Please select Milk Quantity');
    }
  }
}
