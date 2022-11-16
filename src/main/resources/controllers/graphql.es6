const guillotineLib = require('/lib/guillotine');
const libGraphQL = require('/lib/graphql');
const graphqlPlaygroundLib = require('/lib/graphql-playground');
const libGraphQlSchema = require('/lib/graphQlSchema');

//──────────────────────────────────────────────────────────────────────────────
// Schema
//──────────────────────────────────────────────────────────────────────────────
const schema = libGraphQlSchema.createCustomSchema();

//──────────────────────────────────────────────────────────────────────────────
// Constants
//──────────────────────────────────────────────────────────────────────────────
const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': '*'
};

//──────────────────────────────────────────────────────────────────────────────
// Methods
//──────────────────────────────────────────────────────────────────────────────
exports.options = function () {
    return {
        contentType: 'text/plain;charset=utf-8',
        headers: CORS_HEADERS
    };
};

exports.get = function (req) {
    if (req.webSocket) {
        return {
            webSocket: {
                data: guillotineLib.createWebSocketData(req),
                subProtocols: ['graphql-ws']
            }
        };
    }

    let body = graphqlPlaygroundLib.render();
    return {
        contentType: 'text/html; charset=utf-8',
        body: body
    };
};

exports.post = function (req) {
    let input = JSON.parse(req.body);

    let params = {
        query: input.query,
        variables: input.variables
    };

    const result = libGraphQL.execute(schema, params.query, params.variables);
    //log.info("result of graphQl :: %s", JSON.stringify(result, null, 2));

    return {
        contentType: 'application/json',
        headers: CORS_HEADERS,
        body: JSON.stringify(result)
    };
};

exports.webSocketEvent = guillotineLib.initWebSockets();
