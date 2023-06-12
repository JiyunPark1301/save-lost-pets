import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Join from '../pages/Join/Join';
import Home from '../pages/Home/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        {/* <Route path="/profile/:accountName">
          <Route index element={<Profile />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
