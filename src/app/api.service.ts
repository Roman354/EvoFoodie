import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: HttpClient) { }

  getCookingBlog(params: HttpParams = new HttpParams()) {
    return this.http.get(`https://evo-academy.wckz.dev/api/cooking-blog/posts`, { params })
  }

  getOneRecipe(id: string) {
    return this.http.get(`https://evo-academy.wckz.dev/api/cooking-blog/posts/${id}`)
  }



  addComment(comment: { text: string; postId: string }): Observable<any> {
    return this.http.post(`https://evo-academy.wckz.dev/api/cooking-blog/posts/${comment.postId}/add-comment`, comment);
  }

}
