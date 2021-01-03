import { Component, OnInit } from '@angular/core';
import { MilkService, PostData } from '../milk.service';

@Component({
  selector: 'app-showreport',
  templateUrl: './showreport.component.html',
  styleUrls: ['./showreport.component.css'],
})
export class ShowreportComponent implements OnInit {
  totalQuantity: number;
  dayCount: number;
  dataTable = [];
  milkPrice: number;

  constructor(private milkService: MilkService) {}

  ngOnInit(): void {
    this.milkService.fetchMimlkPrice().subscribe((price) => {
      this.milkPrice = +price;
      console.log('Milk Price: ' + this.milkPrice);
    });

    this.milkService.getAllMilkAccountData().subscribe((resData) => {
      console.table(resData);
      this.dayCount = 0;
      this.totalQuantity = 0;
      this.processData(resData);
    });
  }
  processData(data: any[]): void {
    for (let row of data) {
      this.totalQuantity += +row.quantity;
      this.dayCount++;
    }
    console.log(
      'Quantity: ' + this.totalQuantity + ' Total Days :' + this.dayCount
    );
  }
}
