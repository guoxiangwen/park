import React from 'react';
import Loadable from 'react-loadable';

function LoadingComponent(props) {
 if (props.isLoading) {
    // While our other component is loading...
    if (props.timedOut) {
      // In case we've timed out loading our other component.
      return <div>加载超时，请重试！</div>;
    } else if (props.pastDelay) {
      // Display a loading screen after a set delay.
      return <div style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>加载中...</div>;
    } else {
      // Don't flash "Loading..." when we don't need to.
      return null;
    }
  } else if (props.error) {
    // If we aren't loading, maybe
    return <div>加载出错，请重试！</div>;
  } else {
    // This case shouldn't happen... but we'll return null anyways.
    return null;
  }
};

function MyLoadable(args) {
    return Loadable({
        delay: 200,
        timeout: 30000,
        loading: LoadingComponent,
        ...args
    });
};

export default MyLoadable;