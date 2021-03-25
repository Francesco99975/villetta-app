
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
})
export class SharedModule {}