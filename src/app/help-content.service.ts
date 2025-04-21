import { Injectable } from '@angular/core';

type HelpType = 'search' | 'add';

@Injectable({
  providedIn: 'root'
})
export class HelpContentService {
  private contents = {
    search: {
      helpType: 'search',
      title: 'Search Feature Help',
      steps: [
        'Enter the keyword in the search bar, only support English, numbers',
        'Click enter on your keyboard to search for content',
      ],
    },
    add: {
      helpType: 'add',
      title: 'Add product help guides',
      steps: [
        'Fill in all required fields (items marked with *)',
        'Optional: A brief description of the item can be uploaded',
        'Check the Recommended Items check box to mark as Top recommendations',
        'Click "+" button to finish adding, the system will automatically save and update the list'
      ],
    },

  };

  getHelpContent(type: HelpType) {
    return this.contents[type];
  }
}
