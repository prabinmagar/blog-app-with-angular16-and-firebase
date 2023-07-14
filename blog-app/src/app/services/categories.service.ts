import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  firestore:Firestore = inject(Firestore);

  constructor() { }

  getCategories():Observable<any[]>{
    const collectionRef = collection(this.firestore, 'categories');
    return new Observable<any[]>((subscriber) => {
      getDocs(collectionRef)
      .then((querySnapshot) => {
        const documents:any[] = [];
        querySnapshot.forEach((doc) => {
          documents.push({id: doc.id, ...doc.data()});
        });
        subscriber.next(documents);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
      })
    })
  }

  getCategory(docId:string):Observable<any>{
    const collectionRef = collection(this.firestore, 'categories');
    const documentRef = doc(collectionRef, docId);
    const document$ = new Observable<any>(subscriber => {
      getDoc(documentRef)
      .then(documentSnapshot => {
        if(documentSnapshot.exists()){
          subscriber.next({ id: documentSnapshot.id, ...documentSnapshot.data() });
        } else{
          subscriber.next(null);
        }
        subscriber.complete();
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
      });
    });

    return document$;
  }
}
