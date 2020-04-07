import unified from 'unified';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import unistRemove from 'unist-util-remove';

function isBackmatter(node) {
  return node.type === 'code' && node.lang === 'backmatter';
}

function visitBackmatter(node, fn) {
  if (isBackmatter(node)) {
    fn(node);
  }
  if (node.children && node.children.length) {
    for (const child of node.children) {
      visitBackmatter(child, fn);
    }
  }
}

function extractBackmatterFromAst(ast) {
  const backmatter = {};
  visitBackmatter(ast, node => {
    try {
      Object.assign(backmatter, JSON.parse(node.value));
    } catch (e) {}
  });
  return backmatter;
}

function extractBackmatter(markdown) {
  const ast = unified()
    .use(parse)
    .parse(markdown);
  return extractBackmatterFromAst(ast);
}

function removeBackmatterNodes(node) {
  return unistRemove(node, isBackmatter);
}

function remove() {
  return function transformer(tree) {
    return removeBackmatterNodes(tree);
  };
}

function removeBackmatter(markdown) {
  const ast = unified()
    .use(parse)
    .use(remove)
    .use(stringify)
    .processSync(markdown);
  return ast.toString();
}

export default {
  extractBackmatter,
  removeBackmatter,
};
