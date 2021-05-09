import React from 'react';
import drawCircle from './utilities/canvasLoadAnimation';

function Mem(props) {

    console.log(memUseage);
    console.log(props);
    const { totalMem, usedMem, memUseage, freeMem } = props.memData;
    const canvas = document.querySelector('.memCanvas');
    const totalMemInGB = Math.floor((totalMem/1073741824*100))/100;
    const freeMemInGB = Math.floor((freeMem/1073741824*100))/100;
    drawCircle(canvas, memUseage * 100);
    return (
        <div class="col-sm-3 mem">
            <h3>Uso da Memória</h3>
            <div className="canvas-wrapper">
                <canvas className="memCanvas" width="200" height="200"></canvas>
                <div className="mem-text">{memUseage * 100}%</div>
            </div>
            <div>Memória Total: {totalMemInGB}Gb</div>
            <div>Memória Livre: {freeMemInGB}Gb</div>
        </div>

    );
}

export default Mem;