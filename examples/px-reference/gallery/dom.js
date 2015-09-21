//"use strict";
console.log("\nDOM.js");
px.import("px:scene.1.js").then( function ready(scene) {
  var root = scene.root;
  var basePackageUri = px.getPackageBaseFilePath();

  var o = scene.create({t:"rect",parent:root,fillColor:0xffffffff,w:300,h:300,cx:150,cy:150,c:[
    {t:"rect",fillColor:0xff0000ff,w:100,h:100},
    {t:"rect",fillColor:0x00ff00ff,w:100,h:100,x:100,y:100,cx:50,cy:50,rx:1,rz:0},
    {t:"rect",fillColor:0x0000ffff,w:100,h:100,x:200,y:200}
  ]});

  console.log("o= " + o);

   scene.setFocus(o);
   scene.setFocus(o.children[0]);

  console.log("scene.PX_SEESAW= " + scene.PX_SEESAW);

   o.animateTo({r:360},2,scene.PX_LINEAR,scene.PX_LOOP);
   o.animateTo({sx:0.5,sy:0.5,a:0},2,scene.PX_LINEAR,scene.PX_SEESAW);
   o.children[1].animateTo({r:-360},1,scene.PX_LINEAR,scene.PX_LOOP);

  console.log("after animates");

  /**
   *
   * @constructor
   */
  function Element() {

  }

  /**
   *
   * @param nCoin
   * @param fOnChocAvailable
   * @param fOnError
   */
  Element.prototype.getChoc = function(nCoin, fOnChocAvailable, fOnError) {
  };

  /*
   setTimeout(function(){
   o.remove();
   }, 5000);
   */

  console.log("after animates5");
  console.log("DOM.js: filePath= " + scene.filePath);

  o.on('onKeyDown', function (e) {
    px.log.message(2, "dom.js - 2 keydown:" + e.keyCode);
  });
  console.log("after animates10");

}).catch( function importFailed(err){
  console.error("Import failed for dom.js: " + err)
});



