import { Component } from '@angular/core';
import { ApiService } from 'src/Service/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'make-up';

  constructor(){
  }


}
