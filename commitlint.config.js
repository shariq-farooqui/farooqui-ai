export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 100],
    'subject-case': [0],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
  },
};
