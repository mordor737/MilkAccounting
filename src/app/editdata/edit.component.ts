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
  constructor(private router: Router, private milkService: MilkService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('cUser')) {
      this.router.navigate(['login']);
    }

    this.milkService.getAllMilkAccountData().subscribe((milkResponse) => {
      //console.table(milkResponse);
      this.data = milkResponse;
    });
  }

  deleteRecord(index: number) {
    let newData = [];
    for (let row of this.data) {
      if (this.data[index] !== row) {
        newData.push(row);
      }
    }
    this.data = newData;
    this.milkService.deleteItem(newData).subscribe((res) => {
      console.log(res);
    });
  }

  edit() {}
}
