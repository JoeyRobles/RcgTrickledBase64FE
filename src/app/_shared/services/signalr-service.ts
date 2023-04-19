import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class SignalrService {
    private hubUrl: string = `${environment.apiUrl}/encoding`;

    public data: string[] = [];

    public hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .build();

    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl(this.hubUrl)
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
}