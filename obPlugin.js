module.exports = function () {
  return {
    visitor: {
      JSXElement(path) {
        const { name } = path.node.openingElement.name;
        if (name === 'Observer') {
          console.log(path.node);
          const { children } = path.node;
          console.log(children);
        }
      },
    },
  };
}

// 'parent',
//   'hub',
//   'contexts',
//   'data',
//   '_traverseFlags',
//   'state',
//   'opts',
//   'skipKeys',
//   'parentPath',
//   'context',
//   'container',
//   'listKey',
//   'key',
//   'node',
//   'scope',
//   'type' 