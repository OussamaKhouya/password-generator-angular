import { Component } from '@angular/core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  copyIcon = faCopy;
  refrechIcon = faRotate;
  copiedmsg = false;

  length = 12;
  includeLettersm = true;
  includeLettersM = true;
  includeNumbers = true;
  includeSymbols = true;
  password = "9Ww25XJ7uL4bVU";

  onChangeLength(value: string) {
    const parsedValue = parseInt(value);

    if(!isNaN(parsedValue)) {
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

    if(!this.includeLettersm &&
      !this.includeLettersM &&
      !this.includeNumbers &&
      !this.includeSymbols){
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
    setTimeout(()=> this.copiedmsg = false, 500);
  }

}
