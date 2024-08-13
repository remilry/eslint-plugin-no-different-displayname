const { RuleTester } = require("eslint");
const noDifferentDisplayname = require("./no-different-displayname");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  languageOptions: { ecmaVersion: 2015 }
});

ruleTester.run("display-name-matches-component-name", noDifferentDisplayname, {
  valid: [
    // Valid cases where displayName matches the component name
    {
      code: `
        const MyComponent = () => {};
        MyComponent.displayName = "MyComponent";
      `,
    },
    {
      code: `
        class MyComponent extends React.Component {}
        MyComponent.displayName = "MyComponent";
      `,
    },
    {
      code: `
        const MyComponent = function() {};
        MyComponent.displayName = "MyComponent";
      `,
    },
    {
      code: `
        function MyComponent() {}
        MyComponent.displayName = "MyComponent";
      `,
    },
  ],

  invalid: [
    // Invalid cases where displayName does not match the component name
    {
      code: `
        const MyComponent = () => {};
        MyComponent.displayName = "WrongName";
      `,
      errors: [{ message: "DisplayName does not match the component name" }],
      output: `
        const MyComponent = () => {};
        MyComponent.displayName = "MyComponent";
      `,
    },
    {
      code: `
        class MyComponent extends React.Component {}
        MyComponent.displayName = "AnotherName";
      `,
      errors: [{ message: "DisplayName does not match the component name" }],
      output: `
        class MyComponent extends React.Component {}
        MyComponent.displayName = "MyComponent";
      `,
    },
    {
      code: `
        const MyComponent = function() {};
        MyComponent.displayName = "NotMyComponent";
      `,
      errors: [{ message: "DisplayName does not match the component name" }],
      output: `
        const MyComponent = function() {};
        MyComponent.displayName = "MyComponent";
      `,
    },
    {
      code: `
        function MyComponent() {}
        MyComponent.displayName = "DifferentName";
      `,
      errors: [{ message: "DisplayName does not match the component name" }],
      output: `
        function MyComponent() {}
        MyComponent.displayName = "MyComponent";
      `,
    },
  ],
});
