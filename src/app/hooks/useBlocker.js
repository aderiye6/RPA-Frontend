import * as React from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';
import  { History, Blocker, Transition } from 'history';

export function useBlocker(blocker, when = true) {
  const navigator = React.useContext(UNSAFE_NavigationContext)
    .navigator as History;

  React.useEffect(() => {
    if (!when) return;

    const unblock = navigator.block(() => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}