import React from 'react'
import FileSpace from './fileSpace';
import { useParams } from 'next/navigation';

export const SideBar = () => {
    const {productId} = useParams()
  return (
    <div className="w-1/4 min-h-full bg-mixed-20 rounded-2xl p-4">
      <FileSpace productId={productId as string} />
    </div>
  );
}