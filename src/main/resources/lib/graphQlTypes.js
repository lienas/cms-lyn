const libGraphQL = require('/lib/graphql');

/***
 *
 * @param context context Object of Guillotine Lib
 * @returns {*} schema with new ObjectType for a Menu Item
 */
exports.createMenuType = function (context) {
    return context.schemaGenerator.createObjectType({
        name: context.uniqueName("Menu_Item"),
        description: "An entry in the menu",
        fields: {
            title: {
                type: libGraphQL.GraphQLString,
            },
            path: {
                type: libGraphQL.GraphQLString,
            },
            name: {
                type: libGraphQL.GraphQLString,
            },
            id: {
                type: libGraphQL.GraphQLString,
            },
            hasChildren: {
                type: libGraphQL.GraphQLString,
            },
            inPath: {
                type: libGraphQL.GraphQLBoolean,
            },
            isActive: {
                type: libGraphQL.GraphQLBoolean,
            },
            newWindow: {
                type: libGraphQL.GraphQLBoolean,
            },
            type: {
                type: libGraphQL.GraphQLString,
            },
            url: {
                type: libGraphQL.GraphQLString,
            },
            children: {
                type: libGraphQL.list(libGraphQL.reference("Menu_Item")),
            },
        }
    })
}

exports.createBreadcrumbMenuType = function (context) {
    return context.schemaGenerator.createObjectType({
        name: context.uniqueName("Breadcrumbs"),
        description: "A breadcrumbs menu",
        fields: {
            divider: {
                type: libGraphQL.GraphQLString,
            },
            ariaLabel: {
                type: libGraphQL.GraphQLString,
            },
            items: {
                type: libGraphQL.list(this.createBreadcrumbMenuItem(context)),
            },
        },
    })
}

exports.createBreadcrumbMenuItem = function (context) {
    return context.schemaGenerator.createObjectType({
        name: context.uniqueName("BreadcrumbMenuItem"),
        description: "A breadcrumbs menu -item",
        fields: {
            title: {
                type: libGraphQL.nonNull(libGraphQL.GraphQLString),
            },
            text: {
                type: libGraphQL.nonNull(libGraphQL.GraphQLString),
            },
            active: {
                type: libGraphQL.nonNull(libGraphQL.GraphQLBoolean),
            },
            url: {
                type: libGraphQL.GraphQLString,
            },
            type: {
                type: libGraphQL.nonNull(libGraphQL.GraphQLString),
            },
        },
    })
}
