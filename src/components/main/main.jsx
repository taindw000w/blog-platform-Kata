import { React, useState, useEffect } from 'react';
import { Articles } from '../articles/articles'

import './main.scss'

export const Main = () => {
  return (
    <main className="main">
      <Articles />
    </main>
  );
}