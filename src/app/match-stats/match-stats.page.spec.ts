import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchStatsPage } from './match-stats.page';

describe('MatchStatsPage', () => {
  let component: MatchStatsPage;
  let fixture: ComponentFixture<MatchStatsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MatchStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
