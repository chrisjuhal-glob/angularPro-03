import { environment } from 'src/environments/environment';
import { vi } from 'vitest';
import { getCommentByIssue } from './get-comments-by-issue.action';

const mockComments = [
  {
    id: 1,
    number: 123,
    title: 'Test comment 1',
    body: 'Test body 1',
  },
  {
    id: 2,
    number: 223,
    title: 'Test comment 2',
    body: 'Test body 2',
  },
];

const BASE_URL = environment.baseUrl;

describe('getIssueCommentsByNumber', () => {
  const mockIssueNumber = '123';
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it('should fetch and return comments successfully', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockComments),
    });

    const result = await getCommentByIssue(mockIssueNumber);

    expect(window.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/issues/${mockIssueNumber}/comments`,
      {
        headers: {
          Authorization: `Bearer ${environment.githubToken}`,
        },
      }
    );

    expect(result).toEqual(mockComments);
  });

  it('should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    });

    await expect(getCommentByIssue(mockIssueNumber)).rejects.toBe(
      `Can't load comments`
    );
  });

  it('should throw an error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(getCommentByIssue(mockIssueNumber)).rejects.toBe(
      `Can't load comments`
    );
  });
});