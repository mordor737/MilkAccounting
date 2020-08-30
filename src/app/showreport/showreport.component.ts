import { Component, OnInit } from '@angular/core';
import { MilkService, PostData } from '../milk.service';

@Component({
  selector: 'app-showreport',
  templateUrl: './showreport.component.html',
  styleUrls: ['./showreport.component.css'],
})
export class ShowreportComponent implements OnInit {
  data = [];

  constructor(private milkService: MilkService) {}

  ngOnInit(): void {
    this.milkService.getAllMilkAccountData().subscribe((resData) => {
      this.data = resData;
    });
    this.processData();
  }
  processData(): void {
    let qtyArray = [];
    let dayCount = 0;
    for (let row of this.data) {
      console.log(row.title);
    }
  }
}
