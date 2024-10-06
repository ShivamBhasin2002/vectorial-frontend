import React, { useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatSpace from './ChatSpace';
import FileSpace from './fileSpace';

const ProductTerminal: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isFileSpaceOpen, setIsFileSpaceOpen] = useState(true);
  const [fileSpaceWidth, setFileSpaceWidth] = useState(500);
  const dragRef = useRef<HTMLDivElement>(null);

  const toggleFileSpace = () => {
    setIsFileSpaceOpen(!isFileSpaceOpen);
  };

  const handleDrag = useCallback((e: MouseEvent) => {
    if (dragRef.current) {
      const newWidth = window.innerWidth - e.clientX;
      setFileSpaceWidth(Math.max(200, Math.min(600, newWidth)));
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  }, [handleDrag]);

  const handleDragStart = useCallback(() => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  }, [handleDrag, handleDragEnd]);

  return (
    <div style={{ display: 'flex', height: '88vh', position: 'relative', width: '100%' }}>
      <div style={{ flex: 1, height: '100%' }}>
        <ChatSpace productId={productId ?? ''} />
      </div>
      {isFileSpaceOpen && (
        <>
          <div
            ref={dragRef}
            style={{
              width: '5px',
              height: '100%',
              cursor: 'col-resize',
              backgroundColor: '#ccc',
            }}
            onMouseDown={handleDragStart}
          />
          <div style={{ width: `${fileSpaceWidth}px`, height: '100%', flexShrink: 0 }}>
            <FileSpace onClose={toggleFileSpace} productId={productId ?? ''} />
          </div>
        </>
      )}
      {!isFileSpaceOpen && (
        <button
          onClick={toggleFileSpace}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            padding: '15px',
            backgroundColor: '#66b2ff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 1000,
            fontSize: '25px',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#007bff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.9)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
        >
          📁
        </button>
      )}
    </div>
  );
};

export default ProductTerminal;