import { LineChart, Simulation } from '@mpaulprojects/dominion-sim-chart';
import { useEffect, useRef, useState } from 'react';
import { Strategy } from '../interfaces';

async function getSimData(strategies: Strategy[]): Promise<Simulation> {
  const resp = await fetch('https://dominion-sim-api.mpaulweeks.com/sim', {
    method: 'post',
    headers: [
      ['Content-Type', 'application/json']
    ],
    body: JSON.stringify(strategies),
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
    getSimData(props.strategies)
      .then(data => setData(data))
      .catch(console.log);
  }, [props.strategies]);

  if (!data) {
    return 'loading';
  }

  return (
    <div style={{
      width: '800px',
      height: '600px',
    }}>
      <LineChart data={data} />
    </div>
  );
}