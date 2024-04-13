import React from 'react';

import NewsTable from './components/NewsTable';

export default function Home() {
  return (
    <div className='flex flex-row justify-between gap-4'>
      <div className='flex flex-col gap-3 w-1/2 h-news_table text-center'>
        <h1 className='text-2xl font-bold'>News</h1>
        <div className='drop-shadow-xl rounded-lg overflow-x-hidden overflow-y-auto'>
          <NewsTable />
        </div>
      </div>
      <div>
        <h1>Image</h1>
      </div>
    </div>
  );
}
