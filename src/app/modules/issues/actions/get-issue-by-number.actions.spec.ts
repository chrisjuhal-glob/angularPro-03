import { environment } from 'src/environments/environment.development';
import { getIssueByNumber } from './get-issue-by-number.actions';
import { vi } from 'vitest';
const mock = {
  id: 1,
  number: 123,
  title: 'title',
  body: 'body',
};

const $BASE_URL = environment.baseUrl;
const $TOKEN = environment.githubToken;

describe('getIssuesByNumber', () => {
  const mockIssueNumber = '123';
  it('should fetch and return an issue successfully', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mock),
    });

    const result = await getIssueByNumber(mockIssueNumber);
    expect(window.fetch).toHaveBeenCalledWith(`${$BASE_URL}/issues/${mockIssueNumber}`, {
      headers: { Authorization: `Bearer ${$TOKEN}`, Accept: 'application/vnd.github+json' },
    });

    expect(result).toEqual(mock);
  });

  it('should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: () => {},
    });

    await expect(getIssueByNumber(mockIssueNumber)).rejects.toBe('Cant load issue');
  });
});
