import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RefreshService {
    private subject = new Subject<any>();

    refreshProductList() {
        this.subject.next(1);
    }

    getClickEvent(): Observable<any> {  
        return this.subject.asObservable();
    }
}