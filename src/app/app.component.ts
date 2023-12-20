import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from './components/footer/footer.component';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchByKeywordPipe } from './pipes/search-by-keyword.pipe';
import { SearchByTitlePipe } from './pipes/search-by-title.pipe';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule, 
      RouterOutlet, 
      NavbarComponent,
      FooterComponent,
      HttpClientModule,
      SearchByKeywordPipe,
      SearchByTitlePipe
    ],
    providers: [
      PostService
    ]
})
export class AppComponent {
  title = 'prueba_tecnica_angular';
}
