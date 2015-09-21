px.import("px:scene.1.js").then( function ready(scene) {
  var root = scene.root;
  var appURLs = [/*"play.js","play2.js","playmask.js","playmask_star.js","playmask_star2.js",*/
    "dom.js", "events.js", "hello.js", "picturepile.js", "dynamics.js",
    "mousetest2.js", "fancy.js", "cliptest.js", "masktest.js", "fonts.js",
    "mousetest.js", "external.js"];

  var url;
  var basePackageUri = px.getPackageBaseFilePath();

  url = basePackageUri + "/images/skulls.png";
  var bg = scene.createRectangle({parent:root, url: url, xStretch: 2, yStretch: 2, fillColor: 0xe0e0e0ff});

  url = basePackageUri + "/images/status_bg.png";
  var bgShade = scene.createImage({parent:root, url: url, xStretch: 1, yStretch: 1});

  var childPad = 48;
  var childAppWidth = 1280;
  var childAppHeight = 720;
  var childAcross = 2;
  var selectWidth = 1280 + 2 * childPad;
  var selectHeight = 720 + 2 * childPad;

  var select;

  var apps = scene.createImage({parent:root, sx: 0.25, sy: 0.25, w: 1280, h: 720});
  //var apps = scene.createRectangle({sx: 0.25, sy: 0.25, w: 1280, h: 720});

  for (var i = 0; i < appURLs.length; i++) {
    var appUrl = basePackageUri + "/" + appURLs[i];
    var c = scene.createScene({
      url: appUrl, parent:apps,
      w: childAppWidth, h: childAppHeight, clip: true
    });
    console.log("TJC: c=" + c);

    c.on("onMouseDown", function (e) {
      var c = e.target;
      console.log("flags:", e.flags);
      if (e.flags == 4) {  // ctrl-mousedown
        c.cx = c.w / 2;
        c.cy = c.h / 2;
        c.animateTo({r: c.r + 360}, 3, scene.PX_STOP, scene.PX_END);
      }
      scene.setFocus(c);
      select.animateTo({x: (c.x - childPad) * 0.25, y: (c.y - childPad) * 0.25},
        0.3, scene.PX_STOP, scene.PX_END);
    });

    if (i == 0)
      scene.setFocus(c);

  }
console.log("Out of the for loop");

  var url = basePackageUri + "/images/select.png";
  select = scene.createImage9({
    parent: root, url: url, lInset: 16, tInset: 16, rInset: 16, bInset: 16,
    w: selectWidth * 0.25, h: selectHeight * 0.25, x: 0, y: 0, interactive: false
  });
  select.ready.then(function () {
    select.w = selectWidth * 0.25;
    select.h = selectHeight * 0.25;
  });

  scene.root.on('onKeyDown', function (e) {
    if (e.keyCode == 32) {
      root.painting = !root.painting;
    }
  });


  function positionApps() {
    console.log("position apps");
    for (var i = 0; i < apps.children.length; i++) {
      var c = apps.children[i];
      c.animateTo({
          x: ((i % childAcross) * (childAppWidth + childPad)) + childPad,
          y: (Math.floor(i / childAcross) * (childAppHeight + childPad)) + childPad
        },
        0.3, scene.PX_STOP, scene.PX_END);
    }
  }

  function updateSize(w, h) {
    bg.w = w;
    bg.h = h;
    bgShade.w = w;
    bgShade.h = h;
    root.w = w;
    root.h = h;
    childAcross = Math.floor(w / ((childAppWidth + childPad) * 0.25));
    if (childAcross < 1)
      childAcross = 1;
    positionApps();
    console.log("GALLERY.js: filePath= " + scene.filePath);

  }

  scene.on("onResize", function (e) {
    updateSize(e.w, e.h);
  });
  updateSize(scene.getWidth(), scene.getHeight());
}).catch( function importFailed(err){
  console.error("Import for gallery.js failed: " + err)
});



