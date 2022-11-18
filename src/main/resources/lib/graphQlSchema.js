const libGraphQlTypes = require("./graphQlTypes");
const libGraphQL = require('/lib/graphql');
const guillotineLib = require('/lib/guillotine');
const libMenu = require('/lib/menu');
const libContent = require('/lib/xp/content');
const libUtil = require("./util");

exports.createCustomSchema = function () {
    return guillotineLib.createSchema({
        creationCallbacks: {
            HeadlessCms: function (context, params) {
                params.fields.getMenuItems = {
                    type: libGraphQL.list(libGraphQlTypes.createMenuType(context)),
                    args: {
                        level: libGraphQL.GraphQLInt,
                        currentContent: libGraphQL.GraphQLID
                    },
                    resolve: function (env) {
                        const menu = libMenu.getMenuTree(env.args.level ? env.args.level : 2, {
                            currentContent: env.args.currentContent ? env.args.currentContent : undefined,
                            urlType: 'Server'
                        });
                        menu.menuItems.map(item => libUtil.stripPath(item));
                        //log.info("menu == %s", JSON.stringify(menu, null, 2));
                        return menu ? menu.menuItems : [];
                    }
                };
                params.fields.getSubMenu = {
                    type: libGraphQL.list(libGraphQL.reference('Menu_Item')),
                    args: {
                        key: libGraphQL.nonNull(libGraphQL.GraphQLID)
                    },
                    resolve: function (env) {
                        const menu = libMenu.getSubMenus(libContent.get({key: env.args.key}), 1);
                        //log.info("submenu == %s", JSON.stringify(menu, null, 2));
                        //log.info("envelope in callback %s", JSON.stringify(env, null, 2));
                        return menu ? menu : [];
                    }
                };
                params.fields.getBreadcrumbMenu = {
                    type: libGraphQlTypes.createBreadcrumbMenuType(context),
                    args: {
                        homepageTitle: libGraphQL.GraphQLString,
                        currentContent: libGraphQL.nonNull(libGraphQL.GraphQLID)
                    },
                    resolve: function (env) {
                        //log.info("breadcrumb == %s", JSON.stringify(menu, null, 2));
                        return libMenu.getBreadcrumbMenu({
                            currentContent: env.args.currentContent,
                            homepageTitle: env.args.homepageTitle ? env.args.homepageTitle : undefined
                        })
                    }
                }
            }
        }

    });
}
