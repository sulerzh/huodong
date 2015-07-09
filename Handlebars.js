// JavaScript source code

!function () {
    Handlebars.registerHelper("urlIs", function (r, e) {
        var l = Router.current().url.indexOf("?");
        return -1 == l && (l = 999), Logger.log("Checking url: " + r), Logger.log("Current url: " + Router.current().url.substring(0, l).replace("http://localhost:3000", "").replace("http://plenry.com", "")), Router.current().url.substring(0, l).replace("http://localhost:3000", "") === r
    }),
    Handlebars.registerHelper("breaklines", function (r) {
        return r = Handlebars._escape(r), r = r.replace(/(\r\n|\n|\r)/gm, "<br>"),
            new Handlebars.SafeString(r)
    }),
    Handlebars.registerHelper("urlPrefixIs", function (r, e) {
        Logger.log("Checking url: " + r),
        Logger.log("Current url: " +
            Router.current().url.replace("http://localhost:3000", ""));
        var l = r.length;
        return Router.current().url.replace("http://localhost:3000", "").
            replace("http://plenry.com", "").substr(0, l) === r
    }),
    Handlebars.registerHelper("urlHas", function (r, e) {
        return Logger.log("Checking string: " + r),
            Logger.log("Current url: " + Router.current().
            url.replace("http://localhost:3000", "").replace("http://plenry.com", "")),
            Router.current().url.indexOf(r) >= 0
    }),
    Handlebars.registerHelper("breaklines", function (r) {
        return r = Handlebars._escape(r), r = r.replace(/(\r\n|\n|\r)/gm, "<br>"),
            new Handlebars.SafeString(r)
    })
}();
