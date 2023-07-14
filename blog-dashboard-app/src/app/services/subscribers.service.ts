import { Injectable, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  firestore:Firestore = inject(Firestore);

  constructor(
    private toastr:ToastrService
  ) { }

  getSubscribers():Observable<any[]>{
    const collectionRef = collection(this.firestore, 'subscriptions');
    return new Observable<any[]>((subscriber) => {
      getDocs(collectionRef)
      .then((querySnapshot) => {
        const documents: any[] = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = {
            id, ...doc.data()
          };
          documents.push(data as any);
        });
        subscriber.next(documents);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
      });
    });
  }

  deleteSubscriber(docId:string):Observable<void>{
    const collectionRef = collection(this.firestore, "subscriptions");
    const documentRef = doc(collectionRef, docId);
    const delete$ = new Observable<void>(subscriber => {
      deleteDoc(documentRef)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Subscriber deleted");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Subscriber couldn't be deleted.");
      });
    });
    return delete$;
  }
}
