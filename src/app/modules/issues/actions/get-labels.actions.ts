import { sleep } from '@helpers/sleep';
import { GithubLabel } from '@modules/interfaces';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const TOKEN = environment.githubToken;

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(150);
  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!resp.ok) throw 'Cant load labels';
    const labels: GithubLabel[] = await resp.json();
    return labels;
  } catch (error) {
    throw 'fallo';
  }
};
