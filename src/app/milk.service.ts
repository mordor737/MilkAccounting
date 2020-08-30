import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { registerLocaleData } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class MilkService {
  private readonly api =
    'https://milkaccounting.firebaseio.com/Daily-Milk_Record.json';

  constructor(private http: HttpClient) {}

  storeDataIntoFirebase(qty: number) {
    return this.http.post(this.api, {
      quantity: qty,
      date: new Date(),
    });
  }

  getAllMilkAccountData() {
    return this.http.get(this.api).pipe(
      map((response: { [key: string]: PostData }) => {
        const postArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postArray.push({ ...response[key], id: key });
          }
        }
        return postArray;
      })
    );
  }
}

export interface PostData {
  title: string;
  content: string;
  id?: string;
}
