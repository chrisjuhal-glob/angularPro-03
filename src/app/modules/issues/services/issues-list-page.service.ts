import { Injectable, signal } from '@angular/core';
import { getIssues } from '@modules/actions/get-issues.actions';
import { getLabels } from '@modules/actions/get-labels.actions';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { State } from '../interfaces/github-issues.interface';

@Injectable({
  providedIn: 'root',
})
export class IssuesListPageService {
  selectedState = signal<State>(State.All);
  selectedLabels = signal(new Set<string>());
  public labelQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));
  public issuesQuery = injectQuery(() => ({
    queryKey: ['issues',{ state: this.selectedState(), labels: [...this.selectedLabels()]}],
    queryFn: () => getIssues(this.selectedState(), [...this.selectedLabels()]),
  }));

  setIssuesByState(state: State) {
    this.selectedState.set(state);
  }

  toggleLabels(label: string) {
    const labels = this.selectedLabels();
    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }
    this.selectedLabels.set(new Set(labels));
  }
}
