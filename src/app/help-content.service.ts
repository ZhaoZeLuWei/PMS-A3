import { Injectable } from '@angular/core';

type HelpType = 'search' | 'add';

@Injectable({
  providedIn: 'root'
})
export class HelpContentService {
  private contents = {
    search: {
      helpType: 'search',
      title: '搜索功能帮助',
      steps: [
        '在搜索栏输入关键词,仅支持英文、数字',
        '点击键盘的enter来搜索内容',
      ],
    },
    add: {
      helpType: 'add',
      title: '添加信息帮助',
      steps: [
        '点击底部"+添加"按钮',
        '填写所有必填字段（标记*号）',
        '上传相关附件',
        '提交审核'
      ],
      examples: [
        '正确格式：名称使用「品牌+型号」',
        '图片要求：JPG/PNG格式，小于5MB'
      ],
      tips: [
        '每个项目最多添加10个附件',
        '提交后不可修改',
        '审核通常需要1-2个工作日'
      ]
    },
    updateDelete: {
      helpType: 'update-delete',
      title: '更新与删除商品帮助',
      steps: [
        '1. 在搜索栏输入商品名称查找目标记录',
        '2. 点击要修改的记录进入编辑模式',
        '3. 修改信息后点击"保存"更新记录',
        '4. 长按记录或点击垃圾桶图标删除商品'
      ],
      tips: [
        '删除操作不可逆，请谨慎操作',
        '批量选择记录可同时删除多个',
        '修改价格时保留两位小数',
        '更新库存状态需同步仓库数据'
      ]
    },
  };

  getHelpContent(type: HelpType) {
    return this.contents[type];
  }
}
