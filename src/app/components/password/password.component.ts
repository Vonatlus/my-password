import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Validators } from '@angular/forms';

interface Idicator {
  easy: string;
  medium: string;
  strong: string;
}

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  indicator: Idicator = {
    easy: '',
    medium: '',
    strong: '',
  };
  hide = true;
  password = new FormControl('', Validators.minLength(8));

  ngOnInit(): void {
    this.password.valueChanges.subscribe((value) => {
      this.calcStrength(value);
    });
  }

  private calcStrength(value: string): void {
    const hasLetters = /[a-zA-Z]/.test(value);
    const hasDigits = /\d/.test(value);
    const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

    const indicator = [hasLetters, hasDigits, hasSymbols];

    this.indicator = {
      easy: '',
      medium: '',
      strong: '',
    };

    if (indicator.some((v) => v)) {
      this.indicator.easy = 'red';
    }

    if (indicator.filter((v) => v).length === 2) {
      this.indicator.easy = 'yellow';
      this.indicator.medium = 'yellow';
    }

    if (indicator.every((v) => v)) {
      this.indicator = {
        easy: 'green',
        medium: 'green',
        strong: 'green',
      };
    }
  }

  onBlur(): void {
    if (this.password.hasError('minlength')) {
      this.indicator = {
        easy: 'red',
        medium: 'red',
        strong: 'red',
      };
    }
  }
}
