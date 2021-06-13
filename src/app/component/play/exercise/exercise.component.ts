import { Exercise } from './../../../model/Exercise';
import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../../service/exercise.service';
import { ActivatedRoute } from '@angular/router';
import { CodeService } from '../../../service/code.service';

interface Theme {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercise: Exercise | undefined;

  languageCM = 'markdown';
  theme = 'default';

  themes: Theme[] = [
    { value: 'default', viewValue: 'Default' },
    { value: 'darcula', viewValue: 'Darcula' },
    { value: 'eclipse', viewValue: 'Eclipse' },
    { value: 'material', viewValue: 'Material' },
    { value: 'monokai', viewValue: 'Monokai' },
  ];

  options = {
    theme: this.theme,
    mode: this.languageCM,

    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    extraKeys: { 'Ctrl-Space': 'autocomplete' }
  };
  readOnly = false;

  loading = false;
  content = '';
  result = '';

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService, private codeService: CodeService) { }

  ngOnInit(): void {
    this.getExercise();
  }

  getExercise(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.exerciseService.getExercise(id).subscribe(exercise => {
      this.exercise = exercise;
      this.languageCM = this.getLanguageCM(exercise.language.toString());
      this.changeLanguageCM();
      this.content = exercise.code;
    });

  }

  private getLanguageCM(language: string): string {
    const languagesCM = new Map();

    languagesCM.set('Markdown', 'markdown');
    languagesCM.set('C', 'text/x-csrc');
    languagesCM.set('Python', 'text/x-python');
    languagesCM.set('javascript', 'text/javascript');
    languagesCM.set('TypeScript', 'text/typescript');
    languagesCM.set('Java', 'text/x-java');

    return languagesCM.get(language);
  }

  changeLanguageCM(): void {
    this.options = {
      ...this.options,
      mode: this.languageCM,
    };
  }

  changeTheme(): void {
    this.options = {
      ...this.options,
      theme: this.theme,
    };
  }

  handleChange($event: Event): void {
    this.content = $event as unknown as string;
  }

  clear(): void {
    this.content = '';
  }

  compile(): void {
    console.log('content' + this.content);

    this.loading = true;

    this.codeService.compile(this.content).subscribe((data: any) => {
      console.log(data);

      this.result = data.output;
      this.loading = false;
    });
  }
}
