import { Component, inject } from '@angular/core';
import { IssueComment } from '@modules/components/issue-comment/issue-comment';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IssueServices } from '@modules/services/issues.service';

@Component({
  selector: 'issue-page',
  imports: [IssueComment, CommonModule, RouterLink],
  template: `
    <a routerLink="/" class="text-white 2xl">Regresar</a>
    @if (!issueQuery.data()) {
      <p>Cargando data...</p>
    } @else {
      <issue-comment [issue]="issueQuery.data()!" />
      <div class="ml-5">
        @for (comment of commentQuery.data(); track comment.id) {
          <issue-comment [issue]="comment" />
        } @empty {
          <p>Sin comentarios para este issue</p>
        }
      </div>
    }
    <!-- issue comments -->
  `,
  styles: ``,
})
export default class IssuePage {
  public route = inject(ActivatedRoute);
  private issueService = inject(IssueServices);
  public issueQuery = this.issueService.issueQuery;
  public commentQuery = this.issueService.commentQuery;

  issue = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((id) => this.issueService.setIssueNumber(id)),
    ),
  );
}
