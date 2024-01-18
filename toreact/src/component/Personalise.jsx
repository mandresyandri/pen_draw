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
    const [currentLine, setCurrentLine] = useState([]);
    const [currentColor, setCurrentColor] = useState('#000000');
    const [currentLineWidth, setCurrentLineWidth] = useState(1);

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
        setCurrentColor(event.target.value);
    }
    
    const handleLineWidthChange = (event) => {
        setLineWidth(event.target.value);
        setCurrentLineWidth(event.target.value);
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
    
            const newLine = [...currentLine, [x, y, newX, newY]];
            setCurrentLine(newLine);
    
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(newX, newY);
            context.stroke();
    
            setX(newX);
            setY(newY);
        }
    }    

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setLineHistory([...lineHistory, currentLine]);
        setCurrentLine([]);
    }    

    const handleMouseOut = () => {
        setIsMouseDown(false);
    }

    const clearCanvas = () => {
        context.clearRect(0, 0, paintCanvasRef.current.width, paintCanvasRef.current.height);
        setLineHistory([]);
    }

    const undoCanvas = () => {
        if (lineHistory.length > 0) {
            const updatedHistory = lineHistory.slice(0, -1);
            setLineHistory(updatedHistory);
    
            context.clearRect(0, 0, paintCanvasRef.current.width, paintCanvasRef.current.height);
    
            updatedHistory.forEach((lines) => {
                lines.forEach(([startX, startY, endX, endY]) => {
                    context.beginPath();
                    context.moveTo(startX, startY);
                    context.lineTo(endX, endY);
                    context.stroke();
                });
            });
        }
    }

    const exportToSVG = () => {
        let svgContent = `<svg width="${paintCanvasRef.current.width}" height="${paintCanvasRef.current.height}" xmlns="http://www.w3.org/2000/svg">`;
    
        lineHistory.forEach((lines) => {
            lines.forEach(([startX, startY, endX, endY]) => {
                svgContent += `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${currentColor}" stroke-width="${currentLineWidth}" />`;
            });
        });
    
        svgContent += `</svg>`;
    
        // Create a Blob from the SVG content
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    
        // Create a download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'drawing.svg';
    
        // Append the link to the document
        document.body.appendChild(link);
    
        // Trigger a click on the link to start the download
        link.click();
    
        // Remove the link from the document
        document.body.removeChild(link);
    
        alert("Le dessin a été exporté en tant que fichier SVG.");
    };
    

    
    
    

    return (
        <div className='modalPersonalise'>
            <h1>Module de dessin Tyty</h1>
            <input type="color" className="js-color-picker color-picker" value={strokeColor} onChange={handleColorChange}></input>
            <input type="range" className="js-line-range" min="1" max="5" value={lineWidth} onChange={handleLineWidthChange}></input>
            <label className="js-range-value">{lineWidth}</label>Px
            <input id="clearCanvas" type="button" value="Effacer" name="clear-canvas" onClick={clearCanvas}></input>
            <input id="undoCanvas" type="button" value="Retour" className="undoCanvas" name="undo-canvas" onClick={undoCanvas}></input>
            <input id="exportToSVG" type="button" value="Exporter en SVG" name="export-svg" onClick={exportToSVG}></input>
            <canvas ref={paintCanvasRef} className="js-paint paint-canvas" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseOut={handleMouseOut}></canvas>
        </div>
    );
}

export default Personalise;
