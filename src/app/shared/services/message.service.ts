import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpClient} from "@angular/common/http";

import {MessageModel} from "../models/Message";
import {URL_SERVER} from "../constants/urls";

@Injectable()
export class MessageService {

  public messageList$: BehaviorSubject<MessageModel[]>;

  private route = "/change-this-route-name-please";

  constructor(private http: HttpClient) {
    this.messageList$ = new BehaviorSubject([]);
  }

  getMessage() {
    this.http.get<MessageModel[]>(URL_SERVER + this.route).subscribe((messages) => this.messageList$.next(messages));
  }

}
