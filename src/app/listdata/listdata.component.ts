import { Component, OnInit, DoCheck } from '@angular/core';
import { MilkService } from '../milk.service';

@Component({
  selector: 'app-listdata',
  templateUrl: './listdata.component.html',
  styleUrls: ['./listdata.component.css'],
})
export class ListdataComponent implements OnInit, DoCheck {
  dataTable = [];
  isLoading;
  isAvailable = true;

  constructor(private milkService: MilkService) {}

  ngDoCheck(): void {
    //this.loadTable();
  }

  ngOnInit(): void {
    this.loadTable();
    this.sortData();
  }

  loadTable() {
    this.isLoading = true;
    this.milkService.getAllMilkAccountData().subscribe(
      (resData) => {
        this.dataTable = resData;
        this.isLoading = false;
        if (this.dataTable.length < 0) this.isAvailable = true;
      },
      (error) => {
        this.dataTable = ['error'];
        this.isLoading = false;
      }
    );
  }
  sortData() {
    this.dataTable.sort(this.compareTo);
    console.log(this.dataTable);
  }

  compareTo(a, b): number {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else return 0;
  }
}
