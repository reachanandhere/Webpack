Webpack is a bundler!

Need of bundler: Lets say if we have 100 javascript files to be imported in a web application, let order matters. If any of the order is mismatched, it can impact the application. 

To fix this issue, webpacks are used. Webpacks creates a dependency graph and handles the execution of dependencies on its end.

In webpack.config.js

```jsx
module.exports = {
    entry : "./src/index.js", //This is the entry point for the application
    output : {
        filename: 'bundle.js', //this is the place where the output file is placed
        path: path.resolve(__dirname, "./dist") //this takes absolute path
    },
    mode: 'none',
    module: {
        rules: [ 
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource', //rules are associated when assets are to be imported
		parser: {
                    dataUrlCondition: {
                        maxSize : 3*1024 //3kb
                    }
                }
            },
            {
		test: /\.css/,
		use: [
			'style-loaded', 'css-loader'
 		]
            },
            {
		test: /\.scss/,
		use: [
            		'style-loader', 'css-loader', 'sass-loader'
			]
	     },
             {
		test: /\.js$/,
		exclude : /node_modules/,
		use: {
	            loader: 'babel-loader',
	            options: {
	                presets: ['@babel/env'],
	                plugins: ['@babel/plugin-proposal-class-properties']
	            }
		}
		}
	]
    },
    plugins: [
	    new TerserPlugin(),
	    new MiniCssExtractPlugin({
        	filename: 'styles.css'
    		})
	  ]
}
```

In asset/inline resource type, it stores the content of the resource as base64 and store it in the bundle.

When you have 20 big images, the browser have to make 20 different HTTP calls to get these images which is a cost intensive task. If they are small, its better to make them asset/inline 

If we only give type: ‘asset’, webpack will automatically choose between resource and inline based on the size of the file. If the file size is less than 8kb then webpack chooses inline

This 8kb can be changed using Parser - dataUrlCondition -  maxSize

Loaders in webpack allows you to import all other kinds of file that you cannot handle using Asset modules

The css-loaded reads the content of the css file but doesn’t do anything. The style-loader takes the loader takes the css and injects in the code.

When loading the scss file, same rule has to be created.

Babel Loader transiler all new JS code into existing browser supported code. 

@babel/env converts ECMA script 6,7,8 9 to ECMA script 5.

@babel/plugin-proposal-class-properties is needed to use classes inside javscript files.

Plugins: Plugins do what loaders cannot do. They also modify how the bundles themselves are created. 

TerserPlugin is used to compress the bundle size. 

MiniCssExtractPlugin is used to create minified css

```jsx
 {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
```

We put packages in Dev dependencies when we need them during development

Some of the plugins are not needed in production so we don’t add them to Dev dependencies.

To support browser cache, a good approach is if the content of the file is changed, you create a new file and append the MD5 hash to the name

```jsx
output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
  },
```

We. use CleanWebpackPlugin() to clean the dist folder everytime we run npm run build.

Same thing can be achieved through:

```jsx
output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: 'dist/',
    clean: true
  },
```

HtmlWebpackPlugin is used to create index.html inside dist folder. As it will always point to correct bundle.js and styles.css having MD5

```
new HtmlWebpackPlugin({
        title: 'Hello World',
        filename: 'index.html',
        template: 'src/index.hbs',
        description: 'Some Description' 
    })
```

Handlebars is used a template engine in webpack. It is used inside HtmlWebpackPlugin and creates the html file in dist folder

—> mode changes the environment for production and developement

When we use production, we only see the minified version of the code and it is harder to debug it

mode = ‘production’

In production, TerserPlugin is added by default
Webpack-dev-server is used to keep the dev server running. HMR

```jsx
devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist")
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    }
  },
```