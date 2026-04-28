import { sleep } from '@helpers/sleep';
import { GithubIssues, GithubLabel } from '@modules/interfaces';
import { environment } from 'src/environments/environment.development';
import { State } from '../interfaces/github-issues.interface';

const BASE_URL = environment.baseUrl;
const TOKEN = environment.githubToken;

export const getIssues = async (
  state: State = State.All,
  labels: string[],
): Promise<GithubIssues[]> => {
  const params = new URLSearchParams();
  params.append('state', state);
  if (labels.length > 0) {
    params.append('labels', labels.join(','));
  }
  await sleep(150);
  try {
    const resp = await fetch(`${BASE_URL}/issues?${params}`, {
      headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' },
    });
    if (!resp.ok) throw 'Cant load issues';
    const labels: GithubIssues[] = await resp.json();
    return labels;
  } catch (error) {
    throw 'fallo';
  }
};
