function XChart(id, size, pcent, colorX) {
    var color = TColor(colorX);
    var pi = Math.PI;
    var startR = pi * 3 / 2, endR = pToR(pcent) * pi;
    if (pcent == "1") { endR = pi * 7 / 2; }
    var rx = size / 2, ry = rx;
    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    function TColor(rgbColor) {
        rgbColor = rgbColor.replace(/\s/g, "");
        var arrRGB = new Array(3);
        if (rgbColor.indexOf("rgb") > -1) {
            var colorReg = /\s*\d+,\s*\d+,\s*\d+/i;
            var t = colorReg.exec(rgbColor)[0].split(",");
            for (var i = 0; i < arrRGB.length; i++) {
                arrRGB[i] = t[i];
            }
        }
        else if (rgbColor.indexOf("#") > -1) {
            if (rgbColor.length > 4)//"#fc0,#ffcc00" 
            {
                var j = 1;
                for (var i = 0; i < arrRGB.length; i++) {
                    arrRGB[i] = parseInt(rgbColor.substr((i + j), 2), 16);
                    j += 1;
                }
            } else {
                for (var i = 0; i < arrRGB.length; i++) {
                    var t = rgbColor.substr((i + 1), 1);
                    t = t + t;
                    arrRGB[i] = parseInt(t, 16);
                }
            }
        }
       
        console.log(arrRGB.join(","));
        return [arrRGB[0],arrRGB[1],arrRGB[2]].join(",") ;
    }
    function pToR(p) {
        var r = (p * 2) % 2 + 1.5;
        if (r >= 0 && r <= 2) return r;
        return Math.abs((2 - r) % 2);
    }
    function arcDraw(r, color) {
        context.beginPath();
        context.arc(rx, ry, r, startR, endR, false);
        context.fillStyle = color;
        context.lineTo(rx, ry);
        context.closePath();
        context.fill();
    }
    canvas.width = canvas.height = size;

    context.beginPath();
    context.arc(rx, ry, rx - 16, 0, pi * 2, true);
    context.strokeStyle = 'rgba(' + color + ',0.25)';
    context.lineWidth = 4;
    context.stroke();
    arcDraw(rx - 10, 'rgba(' + color + ',1)');

    context.beginPath();
    context.arc(rx, ry, rx - 20, 0, pi * 2, false);
    context.fillStyle = 'rgba(255,255,255,1)';
    context.lineTo(rx, ry);
    context.closePath();
    context.fill();
    context.fillStyle = 'rgba(' + color + ',1)'; ;
    context.font = "10px Verdana";
    var t = (pcent * 100).toFixed(2) + "%";
    if (t == "100.00%") { t = "100%" };
    if (t.length == 6) {
        context.fillText(t, 22, 50);
    } else {
        context.fillText(t, 27, 50);
    }

}