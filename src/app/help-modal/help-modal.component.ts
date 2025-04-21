import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  standalone: false,
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent {
  // 输入参数
  @Input() helpType: 'search' | 'add' | 'default' = 'default';
  @Input() title: string = '使用帮助';
  @Input() steps: string[] = [];
  @Input() examples: string[] = [];
  @Input() tips: string[] = [];

  constructor(private modalCtrl: ModalController) {}

  // 关闭弹窗
  dismiss() {
    this.modalCtrl.dismiss();
  }

  // 获取类型图标
  get helpIcon(): string {
    return {
      'search': 'search',
      'add': 'add-circle',
      'default': 'help-circle'
    }[this.helpType];
  }
}
