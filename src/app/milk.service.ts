import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class MilkService {
  private readonly api = 'https://milkaccounting.firebaseio.com/';
  priceSubject = new Subject<any>();

  private dbPath = '/test';
  milkRef: AngularFireList<Milk> = null;

  constructor(private http: HttpClient, private fireDb: AngularFireDatabase) {
    this.milkRef = fireDb.list(this.dbPath);
  }

  fetchMimlkPrice() {
    return this.http.get(this.api + 'Milk-Price.json').pipe(
      map((response: { [key: string]: { price: number } }) => {
        let gotPrice: number;
        console.log(response);
        for (const key in response) {
          gotPrice = { ...response[key] }.price;
        }
        return gotPrice;
      })
    );
  }

  storeDataIntoFirebase(qty: number, date?: string) {
    return this.http.get(this.api + 'Milk-Price.json').pipe(
      map((response: { [key: string]: { price: number } }) => {
        let gotPrice: number;
        console.log(response);
        for (const key in response) {
          gotPrice = { ...response[key] }.price;
        }
        return gotPrice;
      }),
      take(1),
      exhaustMap((price) => {
        return this.milkRef.push({
          cost: +price * qty,
          date: date == undefined ? new Date().toString() : date,
          quantity: qty,
        });
      })
    );
  }

  getAllMilkAccountData() {
    /*return this.http.get(this.api + 'Daily-Milk_Record.json').pipe(
      map((response: { [key: string]: PostData }) => {
        const postArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postArray.push({ ...response[key], id: key });
          }
        }
        return postArray;
      })
    );*/
    return this.milkRef.snapshotChanges().pipe(
      map((response) => {
        console.log('------Fetching Data------');
        return response.map((r) => ({
          key: r.payload.key,
          ...r.payload.val(),
        }));
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
}

export interface PostData {
  title: string;
  content: string;
  id?: string;
}

export interface Milk {
  key?: string;
  cost: number;
  date: string;
  quantity: number;
}
