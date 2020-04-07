# backmatter

## Installation

```sh
yarn add backmatter
```

## Usage

```javascript
import {removeBackmatter, extractBackmatter} from 'backmatter';

const md = `# Hello world

\`\`\`backmatter
{"meta": "data"}
\`\`\`
`;

const backmatter = extractBackmatter(md);
// backmatter = {meta: "data"}
const removed = removeBackmatter(md);
// removed = "# Hello world\n\n"

```
