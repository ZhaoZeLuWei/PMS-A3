import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // 确保导入 IonicModule
import { HelpModalComponent } from './help-modal.component';

@NgModule({
  declarations: [HelpModalComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot() // 确保 IonicModule 已正确导入
  ],
  exports: [HelpModalComponent]
})
export class HelpModalModule {}

