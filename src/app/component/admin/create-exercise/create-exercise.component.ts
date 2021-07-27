import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/app/enum/Language';
import { NewCode } from 'src/app/model/NewCode';
import { CodeService } from 'src/app/service/code.service';
import { ExerciseService } from 'src/app/service/exercise.service';
import { CodeExampleDialogComponent } from './code-example-dialog/code-example-dialog.component';
import { CompilationFailedDialogComponent } from './compilation-failed-dialog/compilation-failed-dialog.component';
import { SaveNewcodeSuccessComponent } from './save-newcode-success/save-newcode-success.component';
import { TestExampleDialogComponent } from './test-example-dialog/test-example-dialog.component';

interface Theme {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

  languages: string[] = ['Java', 'Python', 'C'];
  formGroup: FormGroup;
  isSubmitBtnDisabled: boolean = true;
  isLanguageSet = false;
  isTitleSet = false;
  isTestSet = false;

  newCode: NewCode;
  selection: any;

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
    indentWithTabs: true,
    smartIndent: true,
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
  testContent = '';

  public testForm: FormGroup;
  public testList: FormArray;
  testArea: string;
  testValues: any[];
  testArray: Array<any>;

  get testFormGroup() {
    return this.testForm.get('testsArray') as FormArray;
  }

  checkCompileEnable(): boolean {
    return !(this.testFormGroup.dirty && this.formGroup.dirty);
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      testArea: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });
  }

  gettestFormGroup(index): FormGroup {
    const formGroup = this.testList.controls[index] as FormGroup;
    return formGroup;
  }

  addTest() {
    this.testList.push(this.createForm());
  }

  removeTest(index) {
    this.testList.removeAt(index);
  }


  constructor(private route: ActivatedRoute, private formBuild: FormBuilder, private codeService: CodeService, private formBuilder: FormBuilder, public dialog: MatDialog, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.newCode = new NewCode("", "", "", Language.Java, [""], "", 0, "");
    this.formGroup = this.formBuild.group({
      title: [this.newCode.title, Validators.required],
      description: [this.newCode.description, Validators.required],
      language: Language
    });
    this.testForm = this.formBuilder.group({
      testsArray: this.formBuilder.array([this.createForm()])
    });
    this.testList = this.testForm.get('testsArray') as FormArray;
  }

  setLanguage(filterValue: any): void {
    this.newCode.language = filterValue;

    this.languageCM = this.getLanguageCM(this.newCode.language.toString());
    this.changeLanguageCM();
    this.isLanguageSet = true;
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

  handleTestChange($event: Event): void {
    this.testContent = $event as unknown as string;
    this.isTestSet = true;
  }

  compile(): void {

    if (this.formGroup.value.title != '' && this.isTestSet && this.isLanguageSet) {
      this.loading = true;

      this.newCode.code = this.content;
      this.newCode.title = this.formGroup.value.title;
      this.newCode.description = this.formGroup.value.description;
      this.newCode.language = this.selection;
      var counter = 0;
      this.testList.value.forEach(element => {
        this.newCode.tests[counter] = element['testArea'];
        counter++;
      })

      console.log('newCode' + this.newCode.code + this.newCode.description + this.newCode.language + this.newCode.tests);

      this.codeService.compileNewCode(this.newCode).subscribe((data: NewCode) => {
        console.log(data);
        this.result = data.compilationOutput;
        this.newCode.compilationScore = data.compilationScore


        this.loading = false;
        if (data.status == "SUCCESS") {
          this.isSubmitBtnDisabled = false;
        } else {
          this.openDialog(new CompilationFailedDialogComponent());
          this.isSubmitBtnDisabled = true;
        }
      });
    }
  }

  openDialog(dialogType: Object) {
    if (dialogType instanceof CompilationFailedDialogComponent)
      this.dialog.open(CompilationFailedDialogComponent);
    else
      this.dialog.open(SaveNewcodeSuccessComponent);
  }
  submit(): void {
    this.exerciseService.saveNewExercise(this.newCode).subscribe((data: NewCode) => {
      this.openDialog(new SaveNewcodeSuccessComponent());
    })
  }
  showCodeExample(): void {
    this.dialog.open(CodeExampleDialogComponent);
  }
  showTestExample(): void {
    this.dialog.open(TestExampleDialogComponent);
  }
}
