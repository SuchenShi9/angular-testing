import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { data } from './data';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    component.characters = data;
    fixture.detectChanges();
  });

  it('show fields for "name" and "culture"', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const charNameDe = debugElement.queryAll(By.css('.charname'));
    const charNameDiv = charNameDe.map((div) => div.nativeElement);
    const cultureDe = debugElement.queryAll(By.css('.culture'));
    const cultureDiv = cultureDe.map((div) => div.nativeElement);

    for (let i = 0; i < component.characters.length; i++) {
      if (component.characters[i].name)
        expect(charNameDiv[i].textContent.trim()).toBe(
          `name  ${component.characters[i].name}`
        );
      else
        expect(charNameDiv[i].textContent.trim()).toBe(
          `name  ${component.characters[i].aliases[0]}`
        );

      expect(cultureDiv[i].textContent.trim()).toBe(
        `culture ${component.characters[i].culture}`
      );
    }
  });

});