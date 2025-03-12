module.exports = {
    extends: 'next/core-web-vitals',
    rules: {
      // Disable specific rules project-wide
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  };