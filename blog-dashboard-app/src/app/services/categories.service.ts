import { query } from '@angular/animations';
import { Injectable, OnInit, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, deleteDoc, where, DocumentData, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit {
  firestore:Firestore = inject(Firestore);

  constructor(
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

  }

  addCategory(category:Category): Observable<void> {
    const collectionRef = collection(this.firestore, 'categories');
    const add$ = new Observable<void>(subscriber => {
      addDoc(collectionRef, category)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Category added.");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Category couldn't be added");
      });
    });
    return add$;
  }

  getCategories():Observable<Category[]>{
    const collectionRef = collection(this.firestore, 'categories');
    return new Observable<Category[]>((subscriber) => {
      getDocs(collectionRef)
      .then((querySnapshot) => {
        const documents: Category[] = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = {
            id, ...doc.data()
          };
          documents.push(data as Category);
        });
        subscriber.next(documents);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
      });
    });
  }

  updateCategory(docId:string, category:any):Observable<void>{
    const collectionRef = collection(this.firestore, 'categories');
    const documentRef = doc(collectionRef, docId);
    const update$ = new Observable<void>(subscriber => {
      updateDoc(documentRef, category)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Category updated!");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Category couldn't be udpated.");
      });
    });

    return update$;
  }

  getCategory(docId:string):Observable<Category>{
    const collectionRef = collection(this.firestore, "categories");
    const documentRef = doc(collectionRef, docId);
    const document$ = new Observable<any>(subscriber => {
      getDoc(documentRef)
      .then(documentSnapshot => {
        if(documentSnapshot.exists()){
          subscriber.next({
            id: documentSnapshot.id,
            ...documentSnapshot.data()
          });
        } else {
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

  deleteCategory(docId:string):Observable<void>{
    const collectionRef = collection(this.firestore, "categories");
    const documentRef = doc(collectionRef, docId);
    const delete$ = new Observable<void>(subscriber => {
      deleteDoc(documentRef)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Category deleted!");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Category couldn't be deleted.");
      });
    });
    return delete$;
  }
}
