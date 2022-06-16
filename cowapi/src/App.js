import React from 'react';

import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import {Dashboard} from './dashboard.js';
import {AI} from './AI.js';
import {Nav} from './Nav.js';
import {QnAOnePage} from './QnAOnePage.js';
import {QnA} from './QnA.js';
import {QnAWrite} from './QnAwritePage';
import {Notice} from './Notice';
import {NoticeOnePage} from './NoticeOnePage';
import {NoticeWritePage} from './NoticeWritePage';

function App() {
  return (
    <Router>
      <Nav />

      <Routes>
          <Route exact path='/' element={<Dashboard />} />

          <Route exact path='/dashboard' element={<Dashboard />} />

          <Route exact path='/ai' element={<AI />} />

          <Route exact path='/QnAs' element={<QnA state='{"page" : 1}' />} />
          <Route exact path='/QnAs/page/:page' element={<QnA />} />
          <Route exact path='/QnAs/:QnAId' element={<QnAOnePage />} />
          <Route exact path='/QnAs/writePage' element={<QnAWrite />} />

          <Route exact path='/notices' element={<Notice state='{"page" : 1}' />} />
          <Route exact path='/notices/page/:page' element={<Notice />} />
          <Route exact path='/notices/:noticeId' element={<NoticeOnePage />} />
          <Route exact path='/notices/writePage' element={<NoticeWritePage />} />
      </Routes>
    </Router>
  );
}

export default App;
