import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MilkService } from '../milk.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  listOfQ = ['1', '2', '3', '4', '5', '1.5', '2.5', '3.5', '4.5'];
  date: { year: number; month: number };
  model: NgbDateStruct;
  selectedQty: number;
  dateString: string;

  constructor(
    private calender: NgbCalendar,
    private milkService: MilkService
  ) {}

  ngOnInit(): void {}

  takeQ(qty: number) {
    this.selectedQty = qty;
  }

  selectToday() {
    this.model = this.calender.getToday();
    this.dateString =
      this.model.day + '-' + this.model.month + '-' + this.model.year;
  }

  pushData() {
    this.milkService
      .storeDataIntoFirebase(this.selectedQty, this.dateString)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
