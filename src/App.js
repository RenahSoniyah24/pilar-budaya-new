import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Router from './Router';

function App(props) {
  return (
    <div>
      <RecoilRoot>
        <Suspense fallback='Loading . . . '>
          <Router/>
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;