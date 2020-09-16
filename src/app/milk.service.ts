import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MilkService {
  private readonly api = 'https://milkaccounting.firebaseio.com/';
  private readonly MILK_PRICE = 55;

  constructor(private http: HttpClient) {}

  get price(): number {
    return this.MILK_PRICE;
  }

  storeDataIntoFirebase(qty: number, date?: string) {
    console.log('Print Date: ' + date);
    return this.http.post(this.api + 'Daily-Milk_Record.json', {
      quantity: qty,
      date: date == undefined ? new Date() : date,
      cost: this.MILK_PRICE * qty,
    });
  }

  getAllMilkAccountData() {
    return this.http.get(this.api + 'Daily-Milk_Record.json').pipe(
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

  deleteItem(data: Milk[]) {
    return this.http.put(this.api + 'Daily-Milk_Record.json', data);
  }

  //Below given code is not functional anymore
  changemilkPrice(newPrice: string) {
    return this.http.post(this.api + 'Milk-Price.json', {
      price: newPrice,
    });
  }

  /*getMilkPrice() {
    return this.http.get(this.api + 'Milk-Price.json').pipe(
      map((response: { [key: string]: Milk }) => {
        let price: string;
        for (const key in response) {
          console.log('KEY: ' + { ...response[key] }.price);
          price = { ...response[key] }.price;
        }
        return price;
      }, delay(2000))
    );
  }*/
}

export interface PostData {
  title: string;
  content: string;
  id?: string;
}

export interface Milk {
  key: string;
  cost: string;
  date: Date;
  quantity: string;
}
