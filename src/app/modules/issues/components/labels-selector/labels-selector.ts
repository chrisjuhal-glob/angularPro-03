import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubLabel } from '@modules/interfaces';

@Component({
  selector: 'labels-selector',
  imports: [NgStyle, CommonModule],
  template: `
    <div class="flex flex-wrap justify-center items-center gap-2">
      @for (label of labels(); track label.id) {
        <div
          class=" border p2 rounded-md hover:bg-slate-500"
          [ngStyle]="{ 'border-color': '#' + label.color }"
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
}
