import { Component, OnInit } from '@angular/core';

interface Language {
  value: string;
  viewValue: string;
}

interface Theme {
  value: string;
  viewValue: string;
}

const defaults = {
  markdown:
    '# Heading\n\nSome **bold** and _italic_ text\nBy [Scott Cooper](https://github.com/scttcper)',
  'text/x-csrc': `int a = 1;`,
  'text/typescript': `const hello: string = 'typescript';`,
  'text/javascript': `const hello = 'javascript';`,
  'text/x-python': `for i in range(0,10): print i`,
  'text/x-java': `String java = "java";`
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {}

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
    console.log('ngModelChange', $event);
  }

  clear(): void {
    this.defaults[this.mode] = '';
  }

}
