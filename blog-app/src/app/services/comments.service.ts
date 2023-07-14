import { Injectable, inject } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, getDoc, getDocs, query } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  firestore:Firestore = inject(Firestore);
  private reloadCommentsSubject = new Subject<void>();
  reloadComments$ = this.reloadCommentsSubject.asObservable();

  constructor(
    private toastr:ToastrService
  ) { }

  addComment(comment:Comment, postId:string):Observable<void>{
    const commentsCollectionRef = collection(this.firestore, `posts/${postId}/comments`);
    return new Observable<void>((subscriber) => {
      addDoc(commentsCollectionRef, comment)
      .then(() => {
        subscriber.next();
        subscriber.complete();
        this.toastr.success("Your comment is sent successfully");
      })
      .catch(error => {
        subscriber.error(error);
        this.toastr.error("Sorry! The comment couldn't be sent.");
      });
    });
  }

  getComments(postId:string):Observable<any[]>{
    const commentsRef = collection(this.firestore, `posts/${postId}/comments`);
    const commentsQuery = query(commentsRef);

    return new Observable<Comment[]>(subscriber => {
      getDocs(commentsQuery)
      .then((querySnapshot) => {
        const comments: Comment[] = [];
        querySnapshot.forEach((doc) => {
          comments.push(doc.data() as Comment);
        });
        subscriber.next(comments);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
      })
    })
  }

  reloadComments(){
    this.reloadCommentsSubject.next();
  }
}
