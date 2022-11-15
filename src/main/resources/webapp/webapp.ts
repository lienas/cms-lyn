const mustache = __non_webpack_require__('/lib/mustache');
const portalLib = __non_webpack_require__('/lib/xp/portal');
const view = resolve('../assets/index.html');

export function get() {
    log.info('Hello from transpiled Typescript server-side code');
    return {
        body: mustache.render(view, {
            staticAssetUrl: portalLib.serviceUrl({service: 'staticAsset'})
        })
    }
}
