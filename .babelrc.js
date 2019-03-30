module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": false,
        "loose": true,
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "UIStream.createElement",
        "pragmaFrag": "UIStream.Fragment",
        "throwIfNamespace": true
      }
    ]
  ],
  "overrides": [{
    test: /\.test.jsx?$/,
    presets: [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": false,
          "loose": true,
          "targets": {
            "node": "current"
          }
        }
      ]
    ]
  }]
};
