import { inject, Injectable, signal } from '@angular/core';
import { getCommentByIssue } from '@modules/actions/get-comments-by-issue.action';
import { getIssueByNumber } from '@modules/actions/get-issue-by-number.actions';
import { getIssues } from '@modules/actions/get-issues.actions';
import { getLabels } from '@modules/actions/get-labels.actions';
import { GithubIssue } from '@modules/interfaces/github-issues.interface';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root',
})
export class IssueServices {
  private issueId = signal<string>('');
  private queryClient = inject(QueryClient);
  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId()],
    queryFn: () => getIssueByNumber(this.issueId()),
    enabled: !!this.issueId(),
    staleTime: 1000 * 60 * 5,
  }));

  public commentQuery = injectQuery(() => ({
    queryKey: ['comments', this.issueId()],
    queryFn: () => getCommentByIssue(this.issueId()),
    enabled: !!this.issueId(),
  }));

  setIssueNumber(id: string) {
    this.issueId.set(id);
  }

  prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5,
    });
  }

  setIssueData(issue: GithubIssue) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  }



}
