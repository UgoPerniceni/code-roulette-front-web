import { Component, OnInit } from '@angular/core';

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

  readOnly = false;
  mode: keyof typeof defaults = 'markdown';
  options = {
    lineNumbers: true,
    mode: this.mode,
  };
  defaults = defaults;

  constructor() { }

  ngOnInit(): void {
  }

  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
  }

  handleChange($event: Event): void {
    console.log('ngModelChange', $event);
  }

  clear(): void {
    this.defaults[this.mode] = '';
  }

}
