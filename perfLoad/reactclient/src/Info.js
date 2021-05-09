import React from 'react';
import moment from 'moment';

function Info(props){
    console.log(props);
    return (
        <div className="col-sm-3 col-sm-offset-1 cpu-info">
          <h3>Sistema Operacional</h3>
          <div className="widget-text">{props.infoData.osType}</div>
          <h3>Tempo Online</h3>
          <div className="widget-text">{moment.duration(props.infoData.upTime).humanize()}</div>
          <h3>Informações do Processador</h3>
          <div className="widget-text"><strong>Modelo:</strong> {props.infoData.cpuModel}</div>
          <div className="widget-text"><strong>Número de Núcleos:</strong> {props.infoData.numCores}</div>
          <div className="widget-text"><strong>Velocidade do Clock:</strong> {props.infoData.cpuSpeed}</div>
        </div>
    );
}

export default(Info);