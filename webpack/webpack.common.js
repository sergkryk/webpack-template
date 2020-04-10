const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const devMode = process.env.NODE_ENV !== `production`;

const PATHS = {
    src: path.resolve(__dirname, `../src`),
    dist: path.resolve(__dirname, `../dist`),
};

console.log(`${PATHS.src}/index.js`);

module.exports = {
    externals: {
        paths: PATHS,
        devmode: devMode
    },

    entry: {
        main: `${PATHS.src}/index.js`,
    },

    stats: {
        modules: false,
        hash: false,
        children: false,
        version: false,
        builtAt: false
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: `vendors`,
                    chunks: `all`,
                    test: /node_modules/,
                    enforce: true
                }
            }
        }
    },

    module: {
        rules: [
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(sa|sc)ss$/,
                use: 
                [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                            sourceMap: true,
                            publicPath: `../`
                        }
                    }, {
                        loader: `css-loader`,
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: `postcss-loader`,
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {}
                    },
                     {
                        loader: `sass-loader`,
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [`html-loader`]
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                use: {
                    loader: `file-loader`,
                    options: {
                        name: `img/[name].[ext]`
                    } 
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: `file-loader`,
                options: {
                  name: `[name].[ext]`,
                  outputPath: `./fonts`
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: `./index.html`,
            favicon: `${PATHS.src}/assets/static/favicon.ico`
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? `css/[name].[hash].css` : `css/[name].css`,
         })
    ]
};