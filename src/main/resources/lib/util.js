/***
 * recursively remove the first segment ot the itemPath
 * e.g. in  = /hmdb/test/page1
 *      out = test/page1
 * @param item
 * @returns {*}
 */

exports.stripPath = function (item) {
    return _stripPath(item);
}

const _stripPath = function (item) {
    item.path = strip(item);
    if (item.children) {
        item.children.map(citem => {
            //log.info("citem: %s", citem)/*this.stripPath(citem)*/;
            _stripPath(citem);
        });
    }
}

const strip = (item) => {
    const pathArr = item.path.split("/");
    return pathArr.slice(2).join("/");
}
