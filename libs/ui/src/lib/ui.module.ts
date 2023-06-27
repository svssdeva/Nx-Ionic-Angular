import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class UiModule {}
