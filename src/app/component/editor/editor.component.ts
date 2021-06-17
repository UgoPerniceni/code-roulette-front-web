import { Component, OnInit } from '@angular/core';
import {CodeService} from '../../service/code.service';

interface Language {
  value: string;
  viewValue: string;
}

interface Theme {
  value: string;
  viewValue: string;
}

const defaults = {
  markdown: '', 'text/x-csrc': '',
  'text/typescript': '', 'text/javascript': '',
  'text/x-python': '', 'text/x-java': ''
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  result = '';
  mode: keyof typeof defaults = 'markdown';
  theme = 'default';

  readOnly = false;

  options = {
    lineNumbers: true,
    mode: this.mode,
    theme: this.theme
  };

  defaults = defaults;

  languages: Language[] = [
    {value: 'markdown', viewValue: 'Markdown'},
    {value: 'text/x-csrc', viewValue: 'C'},
    {value: 'text/x-python', viewValue: 'Python'},
    {value: 'text/javascript', viewValue: 'Javascript'},
    {value: 'text/typescript', viewValue: 'TypeScript'},
    {value: 'text/x-java', viewValue: 'Java'}
  ];

  themes: Theme[] = [
    {value: 'default', viewValue: 'Default'},
    {value: 'darcula', viewValue: 'Darcula'},
    {value: 'eclipse', viewValue: 'Eclipse'},
    {value: 'material', viewValue: 'Material'},
    {value: 'monokai', viewValue: 'Monokai'},
  ];

  constructor(private codeService: CodeService) { }

  ngOnInit(): void {}

  compile(): void {
    const input: string = this.defaults[this.mode];
  }

  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
  }

  changeTheme(): void {
    this.options = {
      ...this.options,
      theme: this.theme,
    };
  }

  handleChange($event: Event): void {
    this.defaults[this.mode] = $event as unknown as string;
  }

  clear(): void {
    this.defaults[this.mode] = '';
  }

}
