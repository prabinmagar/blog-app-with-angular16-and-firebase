import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionGroup, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "@firebase/storage";
import { ToastrService } from 'ngx-toastr';
import { Observable, subscribeOn } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  firestore:Firestore = inject(Firestore);

  constructor(
    private toastr:ToastrService
  ) { }

  uploadImage(file:File):Observable<string>{
    const storage = getStorage();
    const fileName = `postIMG/${Date.now()}` + file.name;
    console.log(fileName);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytes(storageRef, file);

    return new Observable<string>((subscriber) => {
      uploadTask
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          subscriber.next(downloadURL);
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
        });
      })
      .catch((error) => {
        subscriber.error(error);
      })
    })
  }

  deleteImage(imagePath:string):Observable<void>{
    const storage = getStorage();
    const storageRef = ref(storage, imagePath);
    const delete$ = new Observable<void>(subscriber => {
      deleteObject(storageRef)
      .then(() => {
        subscriber.next();
        subscriber.complete();
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Image couldn't be deleted");
      });
    });
    return delete$;
  }

  addPost(post:Post):Observable<void>{
    const collectionRef = collection(this.firestore, 'posts');
    const add$ = new Observable<void>(subscriber => {
      addDoc(collectionRef, post)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Post added!");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Post couldn't be added.");
      });
    });
    return add$;
  }

  getPosts():Observable<Post[]>{
    const collectionRef = collection(this.firestore, 'posts');
    const latestPostsQuery = query(collectionRef, orderBy('createdAt', 'desc'));
    return new Observable<Post[]>((subscriber) => {
      getDocs(latestPostsQuery)
      .then((querySnapshot) => {
        const documents: Post[] = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = {
            id, ...doc.data()
          };
          documents.push(data as Post);
        });
        subscriber.next(documents);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
      });
    });
  }

  getPost(docId:string):Observable<Post>{
    const collectionRef = collection(this.firestore, "posts");
    const documentRef = doc(collectionRef, docId);
    const document$ = new Observable<any>(subscriber => {
      getDoc(documentRef)
      .then(documentSnapshot => {
        if(documentSnapshot.exists()){
          subscriber.next({ id: documentSnapshot.id,...documentSnapshot.data()});
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

  updateFeaturedStatus(docId:string):Observable<void>{
    const collectionRef = collection(this.firestore, 'posts');
    const documentRef = doc(collectionRef, docId);
    const update$ = new Observable<void>(subscriber => {
      updateDoc(documentRef, {
        ['isFeatured']:true
      })
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Post featured.");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.success("Post couldn't be featured.");
      });
    });
    return update$;
  }

  updatePublishStatus(docId:string):Observable<void>{
    const collectionRef = collection(this.firestore, 'posts');
    const documentRef = doc(collectionRef, docId);
    const update$ = new Observable<void>(subscriber => {
      updateDoc(documentRef, {
        ['status']:true
      })
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Post published.");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.success("Post couldn't be published.");
      });
    });
    return update$;
  }

  updatePost(docId:string, post:any):Observable<void>{
    const collectionRef = collection(this.firestore, 'posts');
    const documentRef = doc(collectionRef, docId);
    const update$ = new Observable<void>(subscriber => {
      updateDoc(documentRef, post)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Post updated!");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Post couldn't be updated.");
      });
    });

    return update$;
  }

  deletePost(docId:string):Observable<void>{
    const collectionRef = collection(this.firestore, "posts");
    const documentRef = doc(collectionRef, docId);
    const delete$ = new Observable<void>(subscriber => {
      deleteDoc(documentRef)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Post deleted");
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
        this.toastr.error("Post couldn't be deleted.");
      });
    });
    return delete$;
  }

  getComments(parentId:string):Observable<any[]>{
    const subCollectionRef = collection(doc(this.firestore, 'posts', parentId), 'comments');

    return new Observable<any[]>(subscriber => {
      getDocs(subCollectionRef)
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data()}
        });
        subscriber.next(data);
        subscriber.complete();
      })
      .catch(error => {
        subscriber.error(error);
        subscriber.complete();
      });
    });
  }
}
