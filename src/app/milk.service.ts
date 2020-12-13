import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class MilkService {
  private readonly api = 'https://milkaccounting.firebaseio.com/';
  totalPriceSubject = new BehaviorSubject<number>(0);

  private dbMilkListPath = '/Milk-Record';
  private dbMilkBillPath = '/total-bill';
  milkRef: AngularFireList<Milk> = null;
  billRef: AngularFireList<{ total: number }> = null;

  constructor(private http: HttpClient, private fireDb: AngularFireDatabase) {
    this.milkRef = fireDb.list(this.dbMilkListPath);
    this.billRef = fireDb.list(this.dbMilkBillPath);
  }

  fetchMimlkPrice() {
    return this.http.get(this.api + 'Milk-Price.json').pipe(
      map((response: { [key: string]: { price: number } }) => {
        let gotPrice: number;
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
      exhaustMap((price: number) => {
        let totalPrice = price * qty;
        this.calculateTotalBill(totalPrice).subscribe((res) => {
          console.log('Total Amount Calculated');
        });
        return this.milkRef.push({
          cost: +totalPrice,
          date: date == undefined ? new Date().toString() : date,
          quantity: qty,
        });
      })
    );
  }

  calculateTotalBill(cost: number) {
    let keyEle: string;
    console.log('Reading Total Amount');
    return this.http.get(this.api + 'total-bill.json').pipe(
      map((res: { [key: number]: { total: number } }) => {
        for (const key in res) {
          console.log({ ...res[key] }.total);
          keyEle = key;
          return { ...res[key] }.total;
        }
        return 0;
      }),
      take(1),
      exhaustMap((total) => {
        console.log('Key: ', keyEle);
        this.totalPriceSubject.next(cost + total);
        return this.billRef.update(keyEle, { total: cost + total });
      })
    );
  }

  getTotalBill() {
    return this.totalPriceSubject;
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

  updateSelectedMilkData(data: Milk): Promise<void> {
    return this.milkRef.update(data.key, data);
  }

  deleteItem(key: string): Promise<void> {
    return this.milkRef.remove(key);
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
