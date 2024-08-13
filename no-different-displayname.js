module.exports = {
  meta: {
    type: "problem",
    hasSuggestions: true,
    fixable: "code",
  },

  create(context) {
    return {
      'Program > ExpressionStatement > AssignmentExpression:has(Identifier[name="displayName"])'(
        node
      ) {
        if (node.left.object.name !== node.right.value) {
          context.report({
            node,
            message: "DisplayName does not match the component name",
            fix(fixer) {
              return fixer.replaceText(
                node.right,
                `"${node.left.object.name}"`
              );
            },
          });
        }
      },
    };
  },
};
