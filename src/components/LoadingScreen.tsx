import { useEffect } from 'react';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function LoadingScreen<T>(props: {
  fetch(): Promise<T>;
  onLoad(data: T): void;
}) {
  useEffect(() => {
    (async () => {
      const data = await props.fetch();
      await sleep(3000);
      props.onLoad(data);
    })().catch(console.log);
  }, []);
  
  return <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }}>loading...</div>
}