import { Component, OnInit } from '@angular/core';
import { MilkService, PostData } from '../milk.service';

@Component({
  selector: 'app-showreport',
  templateUrl: './showreport.component.html',
  styleUrls: ['./showreport.component.css'],
})
export class ShowreportComponent implements OnInit {
  totalQuantity: number = 0;
  dayCount: number = 0;
  dataTable = [];

  constructor(private milkService: MilkService) {}

  ngOnInit(): void {
    this.milkService.getAllMilkAccountData().subscribe((resData) => {
      this.processData(resData);
    });
  }
  processData(data: any[]): void {
    for (let row of data) {
      this.totalQuantity += row.quantity;
      this.dayCount++;
    }
    console.log(
      'Quantity: ' + this.totalQuantity + ' Total Days :' + this.dayCount
    );
  }
}
