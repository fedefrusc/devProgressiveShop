

/* const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config-aws.json'); */
var dynamoDb = require('serverless-dynamodb-client').doc;
/* var dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
}) */
//new AWS.DynamoDB.DocumentClient();
var exports = module.exports = {};


exports.getProduct =
    function getProduct() {
        return dynamoDb.scan({ TableName: "products" }).promise()
            .then(response => response.Items);
    }
exports.getProductById =
    function getProductById(id) {
        return dynamoDb.get({ TableName: 'products', Key: { "id": id } }).promise()
            .then(response => response.Item);
    }
exports.getCategory =
    function getCategory() {
        return dynamoDb.scan({ TableName: 'categories' }).promise()
            .then(response => response.Items);
    }

exports.getShoppingCart =
    function getCategory() {
        return dynamoDb.scan({ TableName: 'shoppingCart' }).promise()
            .then(response => response.Items);
    }

exports.getShoppingCartProductById =
    function getShoppingCartProductById(id) {
        return dynamoDb.get({ TableName: 'shoppingCart', Key: { "id": id } }).promise()
            .then(response => {
                if (response.Item) {
                    return response.Item
                }
                throw new Error('not found product');
            });
    }

exports.updateQuantityInShoppingCart =
    function updateQuantityInShoppingCart(id, quantity) {
        return dynamoDb.update(updateQuantityParams(id, quantity)).promise();
    }

function updateQuantityParams(id, quantity) {
    var params = {
        TableName: 'shoppingCart',
        Key: {
            "id": id
        },
        UpdateExpression: "set quantity = quantity + :q",
        ExpressionAttributeValues: {
            ":q": quantity,
        },
        ReturnValues: "UPDATED_NEW"
    }
    return params;
}

exports.putProductInShoppingCart =
    function putProductInShoppingCart(product, quantity) {
        return dynamoDb.put(generateParams(product, quantity)).promise();
    }

function generateParams(product, quantity) {
    return {
        TableName: 'shoppingCart',
        Item: {
            id: product.id,
            name: product.name,
            price: product.price,
            inStock: product.inStock,
            src: product.src,
            quantity: quantity,
        }
    }
}

exports.deleteProductFromShoppingCart =
    function deleteProductFromShoppingCart(id) {
        return dynamoDb.delete({ TableName: 'shoppingCart', Key:{"id" : id }}).promise()
}