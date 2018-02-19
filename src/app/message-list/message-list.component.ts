import {Component, OnInit} from "@angular/core";
import {MessageService} from "../shared/services/message.service";
import {MessageModel} from "../shared/models/Message";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {

  public messageList: MessageModel[] = [];

  constructor(private messageService: MessageService) {
    this.messageService.messageList$.subscribe(
      (messageList) => this.messageList = messageList
    );
    this.messageService.getMessage();
  }

  ngOnInit() {
  }
}
