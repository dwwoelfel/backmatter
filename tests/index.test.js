import expect from 'expect';

import Backmatter from 'src/index';

describe('extractBackmatter', () => {
  it('returns empty object when no backmatter present', () => {
    expect(Backmatter.extractBackmatter(`# hello world`)).toEqual({});
  });
  it('extracts backmatter', () => {
    const md = `# hello world

\`\`\`backmatter
{"a": 1}
\`\`\`
`;
    expect(Backmatter.extractBackmatter(md)).toEqual({a: 1});
  });

  it('merges multiple backmatter blocks', () => {
    const md = `# hello world

\`\`\`backmatter
{"a": 1}
\`\`\`

\`\`\`backmatter
{"b": 2}
\`\`\`
`;
    expect(Backmatter.extractBackmatter(md)).toEqual({a: 1, b: 2});
  });
});

describe('removeBackmatter', () => {
  it('removes backmatter', () => {
    const md = `# hello world
\`\`\`backmatter
{"a": 1}
\`\`\`
`;
    expect(Backmatter.removeBackmatter(md)).toEqual('# hello world\n');
  });
});
