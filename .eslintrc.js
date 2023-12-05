module.exports = {
    extends: ['standard-with-typescript'],
    parserOptions: {
      project: './tsconfig.eslint.json',
    },
    rules: {
      "@typescript-eslint/strict-boolean-expressions" : 'off',
      "@typescript-eslint/consistent-type-imports" : 'off',
      "@typescript-eslint/method-signature-style" : 'off',
      "@typescript-eslint/return-await" : 'off',
      "@typescript-eslint/no-confusing-void-expression" : 'off',
      "@typescript-eslint/no-namespace": 'off',
    ,
    
    }

    
  };