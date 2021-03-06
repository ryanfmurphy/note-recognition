'use strict'

var path = require('path')
var reworkLoader = require('rework-webpack-loader');
var reworkVars = require('rework-vars');
var reworkCalc = require('rework-calc');
var reworkCustomMedia = require('rework-custom-media');
var varMap = reworkLoader.makeVarMap('src/index.css');

module.exports =
  { entry: path.join(__dirname, 'src/index.es6.js')

  , resolve:
      { packageMains:
          ['webpack', 'browser', 'web', 'browserify', ['jam', 'main']
          ,'style' ,'main']
      , alias:
          { rx: path.join(__dirname, 'node_modules/rx/dist/rx.all.min.js')
          , react: path.join(__dirname, 'node_modules/react/dist/react.min.js')
          }
      }

  , output:
      { path: path.join(__dirname, 'dist')
      , filename: 'index.[hash].js'
      }

  , devServer:
      { contentBase: path.join(__dirname, 'src') }

  , module:
      { loaders:
          [ {test: /\.es6\.js$/, loader: 'webpack-traceur'}
          , {test: /\.css$/, loader: 'style-loader!rework-webpack-loader'}
          ]
      }

  , rework:
      { use:
        [ reworkLoader.plugins.imports,
        , reworkLoader.plugins.urls,
        , reworkLoader.plugins.stripLocalDefs(varMap),
        , reworkCustomMedia({map: varMap}),
        , reworkVars({map: varMap}),
        , reworkCalc
        ]
      }
  }
