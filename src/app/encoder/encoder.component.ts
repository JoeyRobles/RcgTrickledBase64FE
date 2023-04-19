import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../_shared/services/signalr-service';
import { EncodingService } from '../_shared/services/encoding-service';

@Component({
  selector: 'app-encoder',
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.scss']
})
export class EncoderComponent implements OnInit {
  public encodedText: string = '';
  public inputText: string = '';
  public errors: string = '';

  isEncoding: boolean = false;

  constructor(
    private signalR: SignalrService,
    private encodingService: EncodingService) {
  }

  ngOnInit(): void {
    this.signalR.startConnection();
    this.signalR.hubConnection.on('ReceiveMessage', (message: string) => {
      if (message === 'end') {
        this.isEncoding = false;
      }
      else {
        this.encodedText += message;
      }
    });
  }

  submit(): void {
    this.isEncoding = true;
    this.errors = '';
    this.encodingService.encodeMessage(this.signalR.hubConnection.connectionId ?? '', this.inputText)
    .subscribe({
      next: () => {}, 
      error: () => {
        this.errors = "There was a problem with connecting to the server. Once the server is up again, please refresh the page.";
        this.isEncoding = false;
      }});
  }

  cancel(): void {
    this.isEncoding = false;
    this.errors = '';
  }
}
