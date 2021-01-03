import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MilkService, Milk } from '../milk.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  data: Milk[];
  deleteStatus;
  selectedrecord: Milk;
  collect: Milk = { key: '', cost: 0, date: '', quantity: 0 };
  modelDate: NgbDateStruct;
  today = this.calendar.getToday();

  constructor(
    private router: Router,
    private milkService: MilkService,
    private calendar: NgbCalendar
  ) {}

  ngOnInit(): void {
    this.modelDate = {
      day: new Date().getUTCDay(),
      month: new Date().getUTCMonth(),
      year: new Date().getUTCFullYear(),
    };
    if (!localStorage.getItem('cUser')) {
      this.router.navigate(['login']);
    }

    this.milkService.getAllMilkAccountData().subscribe((milkResponse) => {
      //console.table(milkResponse);
      this.data = milkResponse;
      this.sortData();
    });
  }

  deleteRecord(key: string) {
    this.milkService
      .deleteItem(key)
      .then((res) => {
        console.log(res);
        this.deleteStatus = 'Record Deleted';
      })
      .catch((error) => {
        this.deleteStatus = 'Unknown Error occured';
      });

    //this.sortData();
    setTimeout(() => {
      this.deleteStatus = null;
    }, 2000);
  }

  edit(index: string) {
    this.selectedrecord = this.data[index];
    this.collect.key = this.selectedrecord.key;
    this.collect.quantity = this.selectedrecord.quantity;
    this.collect.cost = this.selectedrecord.cost;
    this.collect.date = this.selectedrecord.date;
    this.sortData();
  }

  updateData() {
    this.collect.date = this.toStringDate(this.modelDate);
    this.milkService.updateSelectedMilkData(this.collect);
  }

  toStringDate(nModel: NgbDateStruct): string {
    return nModel.month + '-' + nModel.day + '-' + nModel.year;
  }

  sortData() {
    console.log(this.data);
    this.data.sort(this.compareTo);
  }

  compareTo(a, b): number {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else return 0;
  }
}
