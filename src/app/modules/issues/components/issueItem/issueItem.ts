import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubIssue, State } from '../../interfaces/github-issues.interface';
import { RouterLink } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import { IssueServices } from '@modules/services/issues.service';

@Component({
  selector: 'issue-item',
  imports: [NgStyle, CommonModule, RouterLink],
  template: `
    <div
      class="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
      (mouseenter)="prefetchData()"
    >
      @if (isOpen) {
        <i class="fa-regular fa-folder-open text-green-500"></i>
      } @else {
        <i class="fa-regular fa-folder-closed text-red-500"></i>
      }

      <div class="flex flex-col flex-grow px-2">
        <a [routerLink]="['/issue', issue().number]" class="hover:underline">
          {{ issue().title }}
        </a>
        <span class="text-gray-500">
          <!-- #{{ issue().number }} opened {{ since }} by -->
          <span class="font-bold">{{ issue().user.login }}</span>
        </span>

        <div class="flex flex-wrap mt-4">
          @for (label of issue().labels; track label.id) {
            <span
              class="px-2 py-1 mr-2 text-xs text-white rounded-md"
              [ngStyle]="{ border: '1px solid #' + label.color }"
            >
              {{ label.name }}
            </span>
          }
        </div>
      </div>

      <img
        [src]="issue().user.avatar_url"
        width="32"
        height="32"
        alt="User Avatar"
        class="w-8 h-8 rounded-full"
      />
      <div class="flex flex-col mx-2 items-center">
        <i class="fa-regular fa-message text-gray-400"></i>
        <span class="px-4 text-gray-400">{{ issue().comments }}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItem {
  issue = input.required<GithubIssue>();
  issueService = inject(IssueServices);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  prefetchData() {
    /* this.issueService.prefetchIssue(this.issue().number.toString()) */
    this.issueService.setIssueData(this.issue());
  }
}
