import { sleep } from '@helpers/sleep';
import { GithubIssues, GithubLabel } from '@modules/interfaces';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const TOKEN = environment.githubToken;

export const getIssues = async (): Promise<GithubIssues[]> => {
  await sleep(150);
  try {
    const resp = await fetch(`${BASE_URL}/issues`, {
      headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' },
    });
    if (!resp.ok) throw 'Cant load issues';
    const labels: GithubIssues[] = await resp.json();
    return labels;
  } catch (error) {
    throw 'fallo';
  }
};
