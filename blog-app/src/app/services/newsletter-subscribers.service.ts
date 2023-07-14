import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';

@Injectable({
  providedIn: 'root'
})
export class NewsletterSubscribersService {
  firestore:Firestore = inject(Firestore);
  constructor(private toastr: ToastrService) { }

  addSubscription(subsData:NewsletterSubscriber): Observable<void> {
    const collectionRef = collection(this.firestore, 'subscriptions');

    const add$ = new Observable<void>(subscriber => {
      addDoc(collectionRef, subsData)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Subscription added.");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Subscription failed");
      });
    });
    return add$;
  }

  checkSubscription(subsEmail:any):Observable<any[]>{
    const collectionRef = collection(this.firestore, 'subscriptions');
    const subsCheckQuery = query(collectionRef, where("email", "==", subsEmail));

    return new Observable<any[]>((subscriber) => {
      getDocs(subsCheckQuery)
      .then((querySnapshot) => {
        const subs:any[] = [];
        querySnapshot.forEach((doc) => {
          subs.push({ id: doc.id, ...doc.data()});
        });
        subscriber.next(subs);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
        subscriber.complete();
      })
    })
  }
}
