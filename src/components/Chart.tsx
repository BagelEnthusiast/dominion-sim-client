import { ChartType, LineChart, Simulation, SimulationConfig } from '@mpaulprojects/dominion-sim-chart';
import { useEffect, useRef, useState } from 'react';
import { Strategy } from '../interfaces';

async function getSimData(simConfig: SimulationConfig): Promise<Simulation> {
  const resp = await fetch('https://dominion-sim-api.mpaulweeks.com/sim', {
    method: 'post',
    headers: [
      ['Content-Type', 'application/json']
    ],
    body: JSON.stringify(simConfig),
  });
  if (!resp.ok) {
    throw new Error('sim failed');
  }
  return resp.json() as unknown as Simulation;
}

export function Chart(props: {
  strategies: Strategy[];
}) {
  const rendered = useRef(false);
  const [data, setData] = useState<Simulation | undefined>();

  useEffect(() => {
    if (rendered.current) { return; }
    rendered.current = true;
    getSimData({
      games: 1000,
      strategies: props.strategies,
    })
      .then(data => setData(data))
      .catch(console.log);
  }, [props.strategies]);

  if (!data) {
    return 'loading';
  }

  return (
    <>
      <div style={{
        width: '800px',
        height: '400px',
      }}>
        <LineChart data={data} chartType={ChartType.TotalVP} />
      </div>
      <div style={{
        width: '800px',
        height: '400px',
      }}>
        <LineChart data={data} chartType={ChartType.MoneyPerTurn} />
      </div>
    </>
  );
}