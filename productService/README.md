1) Create getProductsList - https://9aj51mlxlc.execute-api.eu-west-1.amazonaws.com/dev/products
2) Create getProductsById - https://9aj51mlxlc.execute-api.eu-west-1.amazonaws.com/dev/product
2.1) Usage https://9aj51mlxlc.execute-api.eu-west-1.amazonaws.com/dev/product?id=0
3)serverless contains 2 lambdas
4)getProductsList lambda function returns a correct response
5)getProductsById AND getProductsList lambda functions return a correct response code
6)Frontend application is integrated with product service
7)Async/await is used in lambda functions
8)ES6 modules are used for product-service
9)Webpack is configured
10)SWAGGER documentation is created(file inside)
11)Lambda handlers are covered by basic UNIT tests
12)Lambda handlers are written not in 1 single module
13)Product not found case exists
14)FE MR - https://github.com/TGreyW/nodejs-aws-fe/pull/2
