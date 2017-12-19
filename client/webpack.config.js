const path = require('path');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, ""),
        compress: true,
        port: 8081,
       
        
    },
   
};
