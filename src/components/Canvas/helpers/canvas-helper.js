import $ from "jquery";

export const connectLineToOtherLine = (canvas, e, p) => {

    let pt = { x: canvas.getPointer(e.e).x, y: canvas.getPointer(e.e).y };
    let circles = canvas.getObjects('circle');
    //console.log(circles);
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].containsPoint(pt) && p.get('name') !== circles[i].get('name')) {
            p.set({
                left: circles[i].left,
                top: circles[i].top
            });
            p.setCoords();
            if (p.id === 'end') {
                p.line && p.line.set({
                    'x2': circles[i].left,
                    'y2': circles[i].top
                });
                p.line.setCoords();
            }
            else if (p.id === 'start') {
                p.line && p.line.set({
                    'x1': circles[i].left,
                    'y1': circles[i].top
                });

                p.line.setCoords();
            }

            canvas.renderAll();
            break;

        }
        else {
            if (p.id === 'end') {
                p.line && p.line.set({
                    'x2': p.left,
                    'y2': p.top
                });
                p.line.setCoords();

            }
            else if (p.id === 'start') {
                p.line && p.line.set({
                    'x1': p.left,
                    'y1': p.top
                });
                p.line.setCoords();
            }

            canvas.renderAll();
        }
    }
    canvas.renderAll();
}

export const zoomCanvas = (factor, opt, zoom, canvas) => {

    const canvasDiv = $('#canvas-div')
    const pointer = canvas.getPointer(opt)

    if (zoom >= -20 && zoom < 20) {
        canvasDiv.scrollLeft(pointer.x / 2)
        canvasDiv.scrollTop(pointer.y / 2)
    }
    else if (zoom >= 20 && zoom < 40) {
        canvasDiv.scrollLeft(pointer.x / 2.1)
        canvasDiv.scrollTop(pointer.y / 2.1)
    }
    else if (zoom >= 40 && zoom < 60) {
        canvasDiv.scrollLeft(pointer.x / 2.1)
        canvasDiv.scrollTop(pointer.y / 2.1)
    }
    else if (zoom >= 60 && zoom <= 120) {
        canvasDiv.scrollLeft(pointer.x / 4)
        canvasDiv.scrollTop(pointer.y / 4)
    }

    canvas.setHeight(Math.round(canvas.getHeight() * factor));
    canvas.setWidth(Math.round(canvas.getWidth() * factor));

    if (canvas.backgroundImage) {
        //console.log(canvas.backgroundImage)
        //setCanvasHeight(Math.round(canvas.getHeight() * factor))
        // Need to scale background images as well
        let bi = canvas.backgroundImage;
        bi.scaleX = bi.scaleX * factor; //bi.width * factor;
        bi.scaleY = bi.scaleY * factor;  //bi.height * factor;
    }
    let objects = canvas.getObjects();

    for (let i in objects) {

        let scaleX = objects[i].scaleX;
        let scaleY = objects[i].scaleY;
        let left = objects[i].left;
        let top = objects[i].top;

        let tempScaleX = scaleX * factor;
        let tempScaleY = scaleY * factor;
        let tempLeft = left * factor;
        let tempTop = top * factor;

        if (objects[i].get('type') === 'line') {
            console.log("x1 - " + objects[i].x1);
            console.log("y1 - " + objects[i].y1);
            console.log("x2 - " + objects[i].x2);
            console.log("y2 - " + objects[i].y2);
        }

        if (objects[i].get('type') !== 'line') {
            objects[i].scaleX = Math.round(tempScaleX * 1000) / 1000;
            objects[i].scaleY = Math.round(tempScaleY * 1000) / 1000;
        }
        else {
            let strokeWidth = objects[i].strokeWidth;
            let tempStrokeWidth = strokeWidth * factor;
            objects[i].strokeWidth = Math.round(tempStrokeWidth * 1000) / 1000

            let x1 = objects[i].x1;
            let x2 = objects[i].x2;
            let y1 = objects[i].y1;
            let y2 = objects[i].y2;

            let tempX1 = x1 * factor;
            let tempX2 = x2 * factor;
            let tempY1 = y1 * factor;
            let tempY2 = y2 * factor;

            objects[i].set({
                'x1': Math.round(tempX1 * 1000) / 1000,
                'y1': Math.round(tempY1 * 1000) / 1000,
                'x2': Math.round(tempX2 * 1000) / 1000,
                'y2': Math.round(tempY2 * 1000) / 1000
            });
        }

        objects[i].left = Math.round(tempLeft * 1000) / 1000;
        objects[i].top = Math.round(tempTop * 1000) / 1000;

        objects[i].setCoords();

        if (objects[i].get('type') === 'line') {
            console.log("x1 - " + objects[i].x1);
            console.log("y1 - " + objects[i].y1);
            console.log("x2 - " + objects[i].x2);
            console.log("y2 - " + objects[i].y2);
        }

    }
    canvas.renderAll();
    canvas.calcOffset();
}

export const limitCanvasBoundary = (currentObj) => {
    if (currentObj.currentHeight > currentObj.canvas.height || currentObj.currentWidth > currentObj.canvas.width) {
        return;
    }
    currentObj.setCoords();
    // top-left  corner
    if (currentObj.getBoundingRect().top < 0 || currentObj.getBoundingRect().left < 0) {
        currentObj.top = Math.max(currentObj.top, currentObj.top - currentObj.getBoundingRect().top);
        currentObj.left = Math.max(currentObj.left, currentObj.left - currentObj.getBoundingRect().left);
    }
    // bot-right corner
    if (currentObj.getBoundingRect().top + currentObj.getBoundingRect().height > currentObj.canvas.height || currentObj.getBoundingRect().left + currentObj.getBoundingRect().width > currentObj.canvas.width) {
        currentObj.top = Math.min(currentObj.top, currentObj.canvas.height - currentObj.getBoundingRect().height + currentObj.top - currentObj.getBoundingRect().top);
        currentObj.left = Math.min(currentObj.left, currentObj.canvas.width - currentObj.getBoundingRect().width + currentObj.left - currentObj.getBoundingRect().left);
    }
}