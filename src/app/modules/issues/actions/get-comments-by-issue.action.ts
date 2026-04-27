import { sleep } from '@helpers/sleep';
import { GithubIssues as GithubIssue, GithubLabel } from '@modules/interfaces';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const TOKEN = environment.githubToken;

export const getCommentByIssue = async (issueNumber: string): Promise<GithubIssue[]> => {
  await sleep(150);
  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' },
    });
    if (!resp.ok) throw 'Cant load comments';
    const labels: GithubIssue[] = await resp.json();
    return labels;
  } catch (error) {
    throw 'fallo';
  }
};
