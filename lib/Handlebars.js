Handlebars.registerHelper("urlIs", function (url, e) {
  var l = Router.current().url.indexOf("?");
  if (l == -1)
    l = 999;
  Logger.log("Checking url: " + url);
  Logger.log("Current url: " +
    Router.current().url.substring(0, l).
    replace("http://localhost:3000", "").
    replace("http://plenry.com", ""));
  return Router.current().url.substring(0, l).replace("http://localhost:3000", "") === url;
});

Handlebars.registerHelper("breaklines", function (lines) {
  lines = Handlebars._escape(lines);
  lines = lines.replace(/(\r\n|\n|\r)/gm, "<br>");
  return new Handlebars.SafeString(lines);
});

Handlebars.registerHelper("urlPrefixIs", function (url, e) {
  Logger.log("Checking url: " + url),
    Logger.log("Current url: " +
    Router.current().url.replace("http://localhost:3000", ""));
  var l = url.length;
  return Router.current().url.
    replace("http://localhost:3000", "").
    replace("http://plenry.com", "").substr(0, l) === url;
});

Handlebars.registerHelper("urlHas", function (url, e) {
  Logger.log("Checking string: " + url);
  Logger.log("Current url: " +
    Router.current().url.
    replace("http://localhost:3000", "").
    replace("http://plenry.com", ""));
  return Router.current().url.indexOf(url) >= 0;
});


