import { User } from './../../../model/User';
import { Compilation } from './../../../model/Compilation';
import { CodeService } from './../../../service/code.service';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from './../../../model/Exercise';
import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/service/exercise.service';

interface Theme {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-game-saloon',
  templateUrl: './game-saloon.component.html',
  styleUrls: ['./game-saloon.component.css']
})
export class GameSaloonComponent implements OnInit {

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
  users: User[]

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

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService, private codeService: CodeService) { }

  ngOnInit(): void {
    this.getExercise();
  }

  changeTheme(): void {
    this.options = {
      ...this.options,
      theme: this.theme,
    };
  }

  changeLanguageCM(): void {
    this.options = {
      ...this.options,
      mode: this.languageCM,
    };
  }

  getExercise(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.exerciseService.getExercise(id).subscribe(exercise => {

      console.log('-----------------------');
      console.log(exercise);
      console.log('-----------------------');

      this.exercise = exercise;
      this.languageCM = this.getLanguageCM(exercise.language.toString());
      this.changeLanguageCM();
      this.content = exercise.code;
    });

  }

  handleChange($event: Event): void {
    this.content = $event as unknown as string;
  }

  compile(): void {
    console.log('content' + this.content);

    this.loading = true;

    if (this.exercise) {
      this.exercise.code = this.content;

      this.codeService.compile(this.exercise).subscribe((data: Compilation) => {
        console.log(data);

        this.result = data.output;
        this.loading = false;
      });
    }
  }

}
