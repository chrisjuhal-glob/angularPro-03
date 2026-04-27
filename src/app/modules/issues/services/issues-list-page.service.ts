import { Injectable } from '@angular/core';
import { getIssues } from '@modules/actions/get-issues.actions';
import { getLabels } from '@modules/actions/get-labels.actions';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root',
})
export class IssuesListPageService {
  public labelQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));
  public issuesQuery = injectQuery(() => ({
    queryKey: ['issues'],
    queryFn: () => getIssues(),
  }));
}
