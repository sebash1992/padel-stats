import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadGamesPage } from './load-games.page';

describe('LoadGamesPage', () => {
  let component: LoadGamesPage;
  let fixture: ComponentFixture<LoadGamesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
