function createContainer(t, elem) {
  return t.JSXExpressionContainer(
    t.arrowFunctionExpression([],
      t.JSXElement(
        t.JSXOpeningElement(t.JSXMemberExpression(t.JSXIdentifier('React'), t.JSXIdentifier('Fragment')), []),
        t.JSXClosingElement(t.JSXMemberExpression(t.JSXIdentifier('React'), t.JSXIdentifier('Fragment'))),
        elem,
      )
    )
  );
}

module.exports = function ({ types: t }, state) {
  return {
    visitor: {
      JSXElement(path) {
        const { name } = path.node.openingElement.name;
        if (name === state.tagName) {
          const { children } = path.node;
          const noneEmptyTextChildren = children.filter((child) => {
            if (child.type === "JSXText" && child.value.trim() === '') {
              return false;
            }
            return true;
          });
          // is container and expression is function
          if (noneEmptyTextChildren.length === 1) {
            const [elem] = noneEmptyTextChildren;

            if (elem.type === 'JSXExpressionContainer' && elem.expression && (elem.expression.type === 'ArrowFunctionExpression' || elem.expression.type === 'FunctionExpression')) {
              // do nothing
            } else {
              path.node.children = [createContainer(t, [elem])];
            }
          } else {
            path.node.children = [createContainer(t, noneEmptyTextChildren)];
          }
        }
      },
    },
  };
}