import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: HttpClient) { }

  getCookingBlog(params: HttpParams = new HttpParams()) {
    return this.http.get(`https://evo-academy.wckz.dev/api/cooking-blog/posts`, { params })
  }


}
