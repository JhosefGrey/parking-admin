import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { io } from 'socket.io-client';
import { Solicitud } from './content/home/models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // private socket = io('http://localhost:3500');
  constructor() { }

  // sendMessage(message: Solicitud) {
  //   this.socket.emit('message', message);
  // }

  getMessages() {
    // let observable = new Observable<Solicitud>(observer => {
    //   this.socket.on('message', (data: Solicitud) => {
    //     console.log(data, 'holaa')
    //     observer.next(data);
    //   });
    //   return () => { this.socket.disconnect(); };
    // });
    // return observable;
  }
}
