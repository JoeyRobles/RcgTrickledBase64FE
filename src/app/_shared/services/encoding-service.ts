import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
    providedIn: 'root'
  })
export class EncodingService {
    constructor(private http: HttpClient) {}

    encodeMessage(connectionId: string, message: string): Observable<string> {
        const response = this.http.post<string>(`${environment.apiUrl}/api/encoding`, { 'connectionId': connectionId, 'message': message});
        return response;
    }
}