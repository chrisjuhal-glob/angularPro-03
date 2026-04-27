import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubIssue } from '../../interfaces/github-issues.interface';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  template: `
    <div class="w-full">
      <div class="border border-gray-200 mt-2 rounded-md shado-sm">
        <div class="flex items-center bg-blue-500 text-white p-2 rounded-t-md">
          <img [src]="issue().user.avatar_url" alt="User avatar" class="w-8 h-8 rounded-full" />
          <span class="mx-2">{{ issue().user.login }}</span>
        </div>
        <div class="border border-gray-200 mt-2 rounded-md shado-sm">
          <markdown>{{ issue().body }}</markdown>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComment {
  public issue = input.required<GithubIssue>();
}
