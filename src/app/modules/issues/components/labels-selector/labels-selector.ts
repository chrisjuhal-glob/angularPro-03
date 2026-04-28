import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubLabel } from '@modules/interfaces';
import { IssuesListPageService } from '@modules/services/issues-list-page.service';
import { IssueServices } from '@modules/services/issues.service';

@Component({
  selector: 'labels-selector',
  imports: [NgStyle, CommonModule],
  template: `
    <div class="flex flex-wrap justify-center items-center gap-2">
      @for (label of labels(); track label.id) {
        <div
          (click)="toggleLabel(label.name)"
          class=" border p2 rounded-md hover:bg-slate-500"
          [ngStyle]="{ 'border-color': '#' + label.color }"
          [class.selected-label]="isSelected(label.name)"
        >
          {{ label.name }}
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LabelsSelector {
  public labels = input.required<GithubLabel[]>();
  private issuesService = inject(IssuesListPageService);

  isSelected(labelName: string) {
    return this.issuesService.selectedLabels().has(labelName);
  }

  toggleLabel(name: string) {
    this.issuesService.toggleLabels(name);
  }
}
