import React, { useEffect, useRef, useState } from 'react';
import '../style/personalise.css';

const Personalise = () => {
    const paintCanvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(1);
    const [lineHistory, setLineHistory] = useState([]);

    useEffect(() => {
        if (paintCanvasRef.current) {
            const canvas = paintCanvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.lineCap = 'round';
            ctx.strokeStyle = strokeColor; 
            ctx.lineWidth = lineWidth; 
            setContext(ctx);
        }
    }, [strokeColor, lineWidth]);

    const handleColorChange = (event) => {
        setStrokeColor(event.target.value);
    }

    const handleLineWidthChange = (event) => {
        setLineWidth(event.target.value);
    }

    const handleMouseDown = (event) => {
        setIsMouseDown(true);
        setX(event.nativeEvent.offsetX);
        setY(event.nativeEvent.offsetY);
    }

    const handleMouseMove = (event) => {
        if (isMouseDown) {
            const newX = event.nativeEvent.offsetX;
            const newY = event.nativeEvent.offsetY;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(newX, newY);
            context.stroke();
            setLineHistory([...lineHistory, [x, y, newX, newY]]);
            setX(newX);
            setY(newY);
        }
    }

    const handleMouseUp = () => {
        setIsMouseDown(false);
    }

    const handleMouseOut = () => {
        setIsMouseDown(false);
    }

    const clearCanvas = () => {
        context.clearRect(0, 0, paintCanvasRef.current.width, paintCanvasRef.current.height);
        setLineHistory([]);
    }

    const undoCanvas = () => {
        alert("Cette fonctionnalité sera disponible bientôt");
    }

    return (
        <>
            <h1>Module de dessin Tyty</h1>
            <input type="color" className="js-color-picker color-picker" value={strokeColor} onChange={handleColorChange}></input>
            <input type="range" className="js-line-range" min="1" max="72" value={lineWidth} onChange={handleLineWidthChange}></input>
            <label className="js-range-value">{lineWidth}</label>Px
            <input id="clearCanvas" type="button" value="Effacer" name="clear-canvas" onClick={clearCanvas}></input>
            <input id="undoCanvas" type="button" value="Retour" className="undoCanvas" name="undo-canvas" onClick={undoCanvas}></input>
            <canvas ref={paintCanvasRef} className="js-paint paint-canvas" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseOut={handleMouseOut}></canvas>
        </>
    );
}

export default Personalise;
