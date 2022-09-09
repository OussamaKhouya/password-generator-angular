import { Component, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Passord
  copyIcon = faCopy;
  refrechIcon = faRotate;
  copiedmsg = false;

  length = 12;
  includeLettersm = true;
  includeLettersM = true;
  includeNumbers = true;
  includeSymbols = true;
  password = '';

  onChangeLength(value: string) {
    const parsedValue = parseInt(value);

    if (!isNaN(parsedValue)) {
      this.length = parsedValue;
      this.onButtonClick();
    }
  }

  onChangeUseLettersm() {
    this.includeLettersm = !this.includeLettersm;
    this.onButtonClick();
  }

  onChangeUseLettersM() {
    this.includeLettersM = !this.includeLettersM;
    this.onButtonClick();
  }

  onChangeUseNumbers() {
    this.includeNumbers = !this.includeNumbers;
    this.onButtonClick();
  }

  onChangeUseSymbols() {
    this.includeSymbols = !this.includeSymbols;
    this.onButtonClick();
  }

  onButtonClick() {
    if (this.optionsA) {
      this.generatePassword();
    } else {
      this.generatePassphrase();
    }
  }
  generatePassword() {
    if (
      !this.includeLettersm &&
      !this.includeLettersM &&
      !this.includeNumbers &&
      !this.includeSymbols
    ) {
      this.includeLettersm = true;
    }
    const numbers = '1234567890';
    const lettersm = 'abcdefghijklmnopqrstuvwyz';
    const lettersM = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';
    const symbols = '!@#$%^&*()';

    let validChars = '';
    if (this.includeLettersm) {
      validChars += lettersm;
    }
    if (this.includeLettersM) {
      validChars += lettersM;
    }
    if (this.includeNumbers) {
      validChars += numbers;
    }
    if (this.includeSymbols) {
      validChars += symbols;
    }

    let generatedPassword = '';
    for (let i = 0; i < this.length && i < 120; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }
    this.password = generatedPassword;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.password);
    this.copiedmsg = true;
    setTimeout(() => (this.copiedmsg = false), 500);
  }

  // Passphrase
  optionsA = false;
  words: any;
  numWords = 3;
  separator = '-';
  capitalize = false;
  includNum = false;

  onChangNumWords(value: string) {
    const parsedValue = parseInt(value);

    if (!isNaN(parsedValue)) {
      this.numWords = parsedValue;
      this.onButtonClick();
    }
  }

  onChangSeparator(value: string) {
    this.separator = value;
    this.onButtonClick();
  }
  onChangeCapitalize() {
    this.capitalize = !this.capitalize;
    this.onButtonClick();
  }
  onChangeIncludNumb() {
    this.includNum = !this.includNum;
    this.onButtonClick();
  }
  onChangeType(flag: boolean) {
    this.optionsA = flag;
    this.onButtonClick();
  }

  generatePassphrase() {
    let generatedPassword = '';
    const WhereIncludNumb = Math.floor(Math.random() * this.numWords);
    for (let i = 0; i < this.numWords && i < 20; i++) {
      const index = Math.floor(Math.random() * 1950);
      let word: string = this.words[`${index}`];
      if (this.capitalize) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (this.includNum && WhereIncludNumb === i) {
        word += Math.floor(Math.random() * 10);
      }
      generatedPassword += word;
      generatedPassword += this.separator;
    }
    // delete the last separator in password
    this.password = generatedPassword.slice(0, -1);
  }

  constructor(private http: HttpClient) {
    this.http.get('assets/words.json').subscribe((data) => {
      this.words = { ...data };
      this.onButtonClick();
    });
  }
  ngOnInit() {}
}
