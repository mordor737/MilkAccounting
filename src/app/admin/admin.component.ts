import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MilkService } from '../milk.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  listOfQ = ['1', '2', '3', '4', '5', '1.5', '2.5', '3.5', '4.5'];
  model: NgbDateStruct;
  date: { month: string; year: string };
  selectedQty: number = 1;
  dateString: string;
  totalBill: number = 0;

  constructor(
    private calender: NgbCalendar,
    private milkService: MilkService
  ) {}

  ngOnInit(): void {
    this.milkService.getTotalBill().subscribe((res) => {
      this.totalBill = +res;
      console.log('Total Bill-->: ', +res);
    });
  }

  takeQ(qty: number) {
    this.selectedQty = qty;
  }

  toStringDate(nModel: NgbDateStruct): string {
    return nModel.month + '-' + nModel.day + '-' + nModel.year;
  }

  selectToday() {
    this.model = this.calender.getToday();
  }

  pushData() {
    this.dateString = this.toStringDate(this.model);
    console.log(this.dateString);
    this.milkService
      .storeDataIntoFirebase(this.selectedQty, this.dateString)
      .subscribe((data) => {
        console.log(data);
      });
  }

  changePrice(price: HTMLInputElement) {
    console.log(price.value);
    this.milkService.changemilkPrice(price.value).subscribe((resp) => {
      console.log('Price Changed: ' + resp);
    });
  }
}
