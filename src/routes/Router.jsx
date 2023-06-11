import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Join from '../pages/Join/Join';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
