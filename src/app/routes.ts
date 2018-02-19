import {Routes} from "@angular/router";
import {MessageListComponent} from "./message-list/message-list.component";

export const routes: Routes = [
  {path: "", component: MessageListComponent},
  {path: "messages", component: MessageListComponent}
];
