/* eslint-disable react/no-unknown-property */
import './index.css';
import React from 'react';

export function Tailwind() {
  return (
    <div>
      <button type="button" className={'bg-blue-700 hover:bg-red-400 p-3 m-3 transition-colors hover:translate-x-4 text-red-500'}>
        Tailwind Button
      </button>
    </div>
  );
}
