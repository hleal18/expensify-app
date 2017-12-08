const path = require('path');
console.log(__dirname);

console.log(path.join(__dirname, 'public'));

module.exports = {
    entry: './src/playground/redux-expensify.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        //Se usan rules para definir como usar los loader.
        //Tomar un jsx y convertirlo ej es6.
        rules: [{
            loader: 'babel-loader',
            //Se usan regular expressions. (Consultar).
            //Se encarga de comprobar si el archivo analizado
            //es de extensión .js
            //solo cuando se cumple este criterio, se ejecuta babel.
            test: /\.js$/,
            //no se ejecuta para los archivos en node_modules.
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            //Permite especificar un arreglo de loaders.
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};

//loader
/**
 * permite modificar el comportamiento de webpack cada vez
 * que ve un archivo con extensión específica ej: (archivo js).
 * Cada vez que vea un archivo js, ejecute babel.
 * Despues de instalar babel-core y babel-loader. se agrega
 * la propiedad module al objeto exports.
 * Despues, hay que crear un archivo de configuración específico
 * para babel. Se llama .babelrc
 */
