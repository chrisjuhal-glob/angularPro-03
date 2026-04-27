import { Injectable, signal } from '@angular/core';
import { getCommentByIssue } from '@modules/actions/get-comments-by-issue.action';
import { getIssueByNumber } from '@modules/actions/get-issue-by-number.actions copy';
import { getIssues } from '@modules/actions/get-issues.actions';
import { getLabels } from '@modules/actions/get-labels.actions';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root',
})
export class IssueServices {
  private issueId = signal<string>('');
  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId()],
    queryFn: () => getIssueByNumber(this.issueId()),
    enabled: !!this.issueId,
  }));

  public commentQuery = injectQuery(() => ({
    queryKey: ['comments', this.issueId()],
    queryFn: () => getCommentByIssue(this.issueId()),
    enabled: !!this.issueId,
  }));

  setIssueNumber(id: string) {
    this.issueId.set(id);
  }
}
