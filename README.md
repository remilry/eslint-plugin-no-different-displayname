# `eslint-plugin-react-displayname`

## Installation

```bash
yarn add --dev eslint-plugin-react-displayname

npm install --save-dev eslint-plugin-react-displayname
```

## Usage

Add no-different-displayname to the plugins section of your ESLint configuration file. You can omit the eslint-plugin- prefix:

```json
{
  "plugins": ["no-different-displayname"]
}
```

Then, enable the rule under the rules section.

```json
{
  "rules": {
    "no-different-displayname": "error"
  }
}
```

## Rule Details

This rule enforces that the displayName of a React component matches the component's name.

Examples of **incorrect** code for this rule :

## Examples

```jsx
const MyComponent = () => {
  /* ... */
};

MyComponent.displayName = "NotMyComponent";
```

After autofix:

```jsx
const MyComponent = () => {
  /* ... */
};

MyComponent.displayName = "MyComponent";
```
