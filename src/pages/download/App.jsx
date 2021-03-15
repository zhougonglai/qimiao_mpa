import React from 'react';
import './App.scss';
import { getSetting } from '~/service/activity';
import { useMount, useSetState } from 'ahooks';

function App() {
  const [ state, setState ] = useSetState({ download: '' })
  const [ route, setRoute ] = useSetState(location)

  useMount(async () => {
    const { data } = await getSetting({ key_name: 'download_package_url' });
    const params = new URLSearchParams(route.search);
    const platform = params.get('platform');
    location.replace(data[platform].value)
    setState({
      download: data[platform].value
    })
  })

  return (
    <>
      <div className="title cursor-default">
        正在下载奇妙加速器客户端PC版…
      </div>
      <div className="desc mt-8">
        还未开始下载？点击
        <a className="ml-4" download href={state.download}>开始下载</a>
      </div>
    </>
  );
}

export default App;
