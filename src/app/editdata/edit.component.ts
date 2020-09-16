import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MilkService } from '../milk.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  data;
  deleteStatus;
  selectedrecord;
  collect = { date: '', quantity: '', cost: '' };
  constructor(private router: Router, private milkService: MilkService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('cUser')) {
      this.router.navigate(['login']);
    }

    this.milkService.getAllMilkAccountData().subscribe((milkResponse) => {
      //console.table(milkResponse);
      this.data = milkResponse;
    });
    this.sortData();
  }

  deleteRecord(index: number) {
    let newData = [];
    for (let row of this.data) {
      if (this.data[index] !== row) {
        newData.push(row);
      }
    }
    this.data = newData;
    this.milkService.deleteItem(newData).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.deleteStatus = 'Unknown Error occured';
      },
      () => {
        this.deleteStatus = 'Record Deleted';
      }
    );
    this.sortData();
    setTimeout(() => {
      this.deleteStatus = '';
    }, 3000);
  }

  edit(index: string) {
    this.selectedrecord = this.data[index];
    this.collect.quantity = this.selectedrecord.quantity;
    this.collect.cost = this.selectedrecord.cost;
    this.collect.date = this.selectedrecord.date;
    this.sortData();
  }

  sortData() {
    this.data.sort(this.compareTo);
    console.log(this.data);
  }

  compareTo(a, b): number {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else return 0;
  }
}
