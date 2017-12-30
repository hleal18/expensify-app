const path = require('path');
const webpack = require('webpack');
//Se usa un plugin de webpack que permita extraer texto del bundle.js
//para así filtrar los estilos css que se quieren poner en otro archivo.
//extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Comprueba se usa webpack en modo production, test o development.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
    //Automáticamente busca .env
    require('dotenv').config({ path: '.env.test' });
} else if(process.env.NODE_ENV === 'development'){
    require('dotenv').config({ path: '.env.development' });
}

//Devuelve la configuración del webpack.
//Se configura una función debido a que permite ser llamada
//con argumentos que permiten modificar el comportamiento
//de acuerdo a lo que se necesite.
/**
 * Se busca que haya una forma de identificar si webpack
 * se está ejecutando en production mode o no. 
 */
module.exports = (env) => {
    //Al ejecuta un comando que accione el webpack, se muestra en
    //consola los datos especificados por el comando.
    console.log('env', env);

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
                //Extrae cada scss y css.
                use: CSSExtract.extract({
                    use: [
                        //Permite especificar un arreglo de loaders.
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },{
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            //Se usa para decidir que env variables pasan al lado del cliente.
            //Se usa require desde le inicio del archivo para acceder a webpack.            
            new webpack.DefinePlugin({
                //Debido a que el uso de este plugin puede ser complicado, hay que agregar
                //Doble comillas para que la asignación del valor se haga con el valor que contiene
                //la variable y no el nombre de la variable.
                //Para ello se usa JSON.stringify que agrega automáticamente esas dobles comillas.
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)

            })
        ],
        //Los source maps, agregan mucho espacio al proyecto.
        //Se busca disminuirlo lo más posible, teniendo en cuenta que
        //aún en producción son útiles.
        //source-map es el propicio para producción. Toma más tiempo.
        //Permite que el bundle.js disminuya el espacio que ocupa.
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
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
};