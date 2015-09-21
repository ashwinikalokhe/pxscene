px.import("px:scene.1.js").then( function ready(scene) {
var root = scene.root;


//var bg = scene.createRectangle({fillColor:0xccccccff, parent:root});
function updateSize(w, h) {
//    bg.w = w;
//    bg.h = h;
}

scene.on("onResize", function(e){updateSize(e.w,e.h);});
updateSize(scene.getWidth(), scene.h);


// null or "" is the default face FreeSans.ttf
var faces = ["",
             "http://www.pxscene.org/examples/px-reference/fonts/DancingScript-Regular.ttf",
             "http://www.pxscene.org/examples/px-reference/fonts/DancingScript-Bold.ttf",
             "http://www.pxscene.org/examples/px-reference/fonts/DejaVuSans.ttf",
             "http://www.pxscene.org/examples/px-reference/fonts/DejaVuSerif.ttf",
             "http://www.pxscene.org/examples/px-reference/fonts/FontdinerSwanky.ttf",
             "http://www.pxscene.org/examples/px-reference/fonts/FreeSans.ttf",
             "http://www.pxscene.org/examples/px-reference/fonts/IndieFlower.ttf",
             "http://www.pxscene.org/examples/px-reference/fonts/Pacifico.ttf",
             "http://www.pxscene.org/examples/px-reference/fonts/PoiretOne-Regular.ttf",
            ];
console.log("Faces: " + faces);
console.log("faces: ", faces.length);

var scroll = scene.createImage({parent:root});
var scrollContent = scene.createImage({parent:scroll});

var rowcontainer = scene.createImage({parent:scrollContent});

var p = 0; 
for (var i=0; i < faces.length; i++)
{
    var row = scene.createImage({parent:rowcontainer,y:p});
    var faceName = faces[i]?faces[i]:"FreeSans.ttf";
    console.log(faceName);
    var t = scene.createText({text:"Enter in some text...", 
                              parent:row,x:10,
                              textColor:0xfaebd7ff, pixelSize:36,
                              faceURL:faces[i]});
    var t2 = scene.createText({text:faceName, 
                               parent:row,x:20,y:t.h,
                               textColor:0xeeeeeeff, pixelSize:14,a:0.6});
    
    row.h = t.h+t2.h;
    row.w = 800;
  //row.painting = false;
    p += row.h;
}
var select = scene.createRectangle({parent:scrollContent, fillColor:0x000000, 
                                    lineColor:0xffff00ff,
                                    lineWidth:4,w:scene.getWidth(),h:100});


function clamp(v, min, max) {
    return Math.min(Math.max(min,v),max);
}

var currentRow = 0;
function selectRow(i) {
    currentRow = i;
    var row = rowcontainer.children[i];
    select.animateTo({x:row.x,y:row.y,h:row.h},0.3,0,0);
    // animate to bring selection into view
    var t = -scrollContent.y;
    if (row.y < t) {
        t = -row.y
        console.log("one");
        scrollContent.animateTo({y:t},0.3, 0, 0);
    }
    else if (row.y+row.h-scene.getHeight() > t) {
        t = -(row.y+row.h-scene.getHeight());
        console.log("two");
        scrollContent.animateTo({y:t},0.3, 0, 0);
    }
}

selectRow(currentRow);

function scrollUp() {
    var numRows = rowcontainer.children.length;
//    selectRow(currentRow>0?currentRow-1:0);
    selectRow(clamp(currentRow-1, 0, numRows-1));
}

function scrollDn() {
    var numRows = rowcontainer.children.length;
    console.log("numRows", numRows);
    console.log(currentRow);
//    selectRow((currentRow<(numRows-1))?currentRow+1:numRows-1);
    selectRow(clamp(currentRow+1, 0, numRows-1));
}

function updateText(s) {
    for (var i = 0; i < rowcontainer.children.length; i++) {
        rowcontainer.children[i].children[0].text = s;
    }
}

var str = "";
scene.root.on("onKeyDown", function (e) {
    var keycode = e.keyCode; var flags = e.flags;
    if (keycode == 38) scrollUp();
    else if (keycode == 40) scrollDn();
    else if (keycode == 8) {
//        str = str.substr(0,str.length-1);
//        str = str.slice(0,str.length-2);
      str = str.slice(0,-1);
      updateText(str);
    }
});

scene.root.on("onChar", function(e) {
  if (e.charCode != 8) {
    str += String.fromCharCode(e.charCode);
    updateText(str);
  }
});


}).catch( function importFailed(err){
  console.error("Import failed for fonts.js: " + err)
});



