// app.component.ts

import { Component } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import Adapter from './ckeditorAdapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public Editor = ClassicEditor;
  htmlData: any = null
  public componentEvents: string[] = [];

  config: EditorConfig = {
    toolbar: ['heading', '|',
      'fontfamily', 'fontsize',
      'alignment',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'custombutton', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'code', 'codeBlock', '|',
      'insertTable', '|',
      'imageUpload', 'blockQuote', '|',
      'undo', 'redo', '|',
      'youtube',
      'mediaEmbed'
    ],

    language: 'en',
    placeholder: "Type the content here!"

  };
  customAdapterPlugin(editor: { plugins: { get: (arg0: string) => { (): any; new(): any; createUploadAdapter: (loader: any) => any; }; }; config: any; }) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }
  onReady(editor: { plugins: { get: (arg0: string) => { (): any; new(): any; createUploadAdapter: (loader: any) => Adapter; }; }; config: any; getData: () => any; }) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {

      return new Adapter(loader, editor.config);;
    }; 
  }

  onFocus(event: FocusEvent): void {
    this.componentEvents.push('Focused the editing view.');
  }

  onChange({ editor }: ChangeEvent) {
    this.htmlData = editor?.getData();
    console.log(this.htmlData);
  }


}
