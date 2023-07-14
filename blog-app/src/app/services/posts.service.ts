import { Injectable, inject } from '@angular/core';
import { DocumentData, FieldValue, Firestore, collection, doc, getDoc, getDocs, getFirestore, increment, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  firestore:Firestore = inject(Firestore);

  constructor() { }

  getLatestPost():Observable<any>{
    const collectionRef = collection(this.firestore, 'posts');
    const latestPostsQuery = query(collectionRef, orderBy('createdAt', 'desc'), limit(6));

    return new Observable<any>((subscriber) => {
      getDocs(latestPostsQuery)
      .then((querySnapshot) => {
        const documents:any[] = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data()});
        });
        subscriber.next(documents);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
      });
    });
  }

  getFeaturedPosts():Observable<any[]>{
    const collectionRef = collection(this.firestore, 'posts');
    const featauredPostQuery = query(collectionRef, where("isFeatured", "==", true), limit(1));

    return new Observable<any[]>((subscriber) => {
      getDocs(featauredPostQuery)
      .then((querySnapshot) => {
        const documents:any[] = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });

        subscriber.next(documents);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
        subscriber.complete();
      })
    })
  }

  getAllPosts():Observable<any[]>{
    const collectionRef = collection(this.firestore, 'posts');
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

  getSinglePost(docId:string):Observable<any>{
    const collectionRef = collection(this.firestore, 'posts');
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

  getSimilar(categoryId:string){
    const collectionRef = collection(this.firestore, 'posts');
    const categoryPosts = query(collectionRef, where('category.categoryId', '==', categoryId), limit(4));

    return new Observable<any[]>((subscriber) => {
      getDocs(categoryPosts)
      .then((querySnapshot) => {
        const posts:any[] = [];
        querySnapshot.forEach((doc) => {
          posts.push({id: doc.id, ...doc.data()});
        });

        subscriber.next(posts);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
        subscriber.complete();
      })
    });
  }

  getCategoryPosts(categoryId:string){
    const collectionRef = collection(this.firestore, 'posts');
    const categoryPosts = query(collectionRef, where('category.categoryId', '==', categoryId));

    return new Observable<any[]>((subscriber) => {
      getDocs(categoryPosts)
      .then((querySnapshot) => {
        const posts:any[] = [];
        querySnapshot.forEach((doc) => {
          posts.push({id: doc.id, ...doc.data()});
        });

        subscriber.next(posts);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
        subscriber.complete();
      })
    });
  }

  countViews(postId:string):Observable<void>{
    const collectionRef = collection(this.firestore, 'posts');
    const postRef = doc(collectionRef, postId);

    return new Observable<void>((subscriber) => {
      updateDoc(postRef, {
        views: increment(1)
      })
      .then(() => {
        subscriber.next();
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
        subscriber.complete();
      })
    });
  }

  searchPosts(keyword:string):Observable<any[]>{
    console.log(keyword);
    let searchTerm = keyword.toString().toLowerCase();
    console.log(searchTerm);
    const collectionRef = collection(this.firestore, 'posts');
    return new Observable<any[]>(subscriber => {
      getDocs(collectionRef)
      .then((querySnapshot) => {
        const posts: any[] = [];
        querySnapshot.docs.map(doc => {
          const data = doc.data();
          if(data['title'].toLowerCase().includes(searchTerm) || data['content'].toLowerCase().includes(searchTerm)){
            posts.push({ id:doc.id, ...data });
          }
        });
        subscriber.next(posts);
        subscriber.complete();
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
      });
    });
  }
}
