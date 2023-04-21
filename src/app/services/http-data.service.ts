import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Medicamento } from '../models/medicamento.model';
import { catchError, Observable, pipe, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  base_Url = "http://localhost:3000/medicamentos";
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Default
      console.log(`An error occured ${error.status}, body was: ${error.error}`);
    }
    else {
      //Unsuccessfull response from Backend
      console.log(`An error occured ${error.status}, body was: ${error.error}`);
    }

    return throwError('Something happened with request, try again later...')
  }

  createItem(item: any): Observable<Medicamento> {
    return this.http
      .post<Medicamento>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  getList(): Observable<Medicamento> {
    return this.http
      .get<Medicamento>(this.base_Url)
      .pipe(retry(2), catchError(this.handleError))
  }

  getItem(id: string): Observable<Medicamento> {
    return this.http
      .get<Medicamento>(this.base_Url + '/' + id)
      .pipe(retry(2), catchError(this.handleError))
  }

  updateItem(id: string, item: any): Observable<Medicamento> {
    return this.http
      .put<Medicamento>(this.base_Url + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  deleteItem(id: string): Observable<Medicamento>{
    return this.http
      .delete<Medicamento>(`${this.base_Url}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
}
