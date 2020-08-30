import { Component, OnInit } from '@angular/core';
import { MilkService } from '../milk.service';

@Component({
  selector: 'app-listdata',
  templateUrl: './listdata.component.html',
  styleUrls: ['./listdata.component.css'],
})
export class ListdataComponent implements OnInit {
  dataTable = [];
  constructor(private milkService: MilkService) {}

  ngOnInit(): void {
    this.milkService.getAllMilkAccountData().subscribe(
      (resData) => {
        this.dataTable = resData;
      },
      (error) => {
        this.dataTable = ['error'];
      }
    );
  }
}
