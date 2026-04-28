import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import LabelsSelector from '@modules/components/labels-selector/labels-selector';
import { IssuesListPageService } from '@modules/services/issues-list-page.service';
import { IssueItem } from '@modules/components/issueItem/issueItem';
import { State } from '../../interfaces/github-issues.interface';

@Component({
  selector: 'issue-list',
  imports: [RouterLink, LabelsSelector, CommonModule, IssueItem],
  template: ` <h1>Github Issues</h1>
    <hr class="my-5 border-b-2 border-blue-600" />
    <section class="grid grid-cols-5 sm:grid-cols-3 gap-2">
      <div class="col-span-3 flex flex-col">
        <div class="flex gap-2">
          <button
            (click)="onChangeState('all')"
            [class.active]="issuesService.selectedState() === 'all'"
            class="btn"
          >
            All
          </button>
          <button
            (click)="onChangeState('open')"
            [class.active]="issuesService.selectedState() === 'open'"
            class="btn"
          >
            Open
          </button>
          <button
            (click)="onChangeState('closed')"
            [class.active]="issuesService.selectedState() === 'closed'"
            class="btn"
          >
            Closed
          </button>
        </div>
      </div>

      <div class="mt-4 flex flex-col col-span-2">
        <h2>issues</h2>
        @for (issue of issuesQuery.data(); track issue.id) {
          <issue-item [issue]="issue" />
        } @empty {
          @if (issuesQuery.isLoading()) {
            <p>Cargando data...</p>
          } @else {
            <p>No se encontraron issues</p>
          }
        }
        <!-- listado de issues -->
        <!-- empty -->
        <!-- spinner -->
      </div>

      <div class="mt-4 flex flex-col">
        <h2>labels</h2>
        @if (labelsQuery.isLoading()) {
          <p>Cargando data...</p>
        } @else {
          <labels-selector [labels]="labelsQuery.data() ?? []"></labels-selector>
        }
        <!-- spinner -->
        <!-- label selector -->
      </div>
    </section>`,
  styles: ``,
})
export default class IssueList {
  public issuesService = inject(IssuesListPageService);

  get labelsQuery() {
    return this.issuesService.labelQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  onChangeState(newState: string) {
    const _state =
      {
        all: State.All,
        open: State.Open,
        closed: State.Closed,
      }[newState] ?? State.All;

    this.issuesService.setIssuesByState(_state);
  }
}
