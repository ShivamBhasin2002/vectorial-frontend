import React, { useState, useEffect, useRef } from 'react';
import { DataStorageAccessor } from '../../service/dataStorageAccessor';
import { FileList } from './FileList';
import { InterviewTranscriptList } from './InterviewTranscriptList';
import { Product } from '@types/product';

interface FileSpaceProps {
  onClose: () => void;
  productId: string;
}

const FileSpace: React.FC<FileSpaceProps> = ({ onClose, productId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [filesHeight, setFilesHeight] = useState(50);
  const [isFilesOpen, setIsFilesOpen] = useState(true);
  const [isTranscriptsOpen, setIsTranscriptsOpen] = useState(true);
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const dataStorageAccessor = new DataStorageAccessor();
      try {
        const productDetails = await dataStorageAccessor.getProductById(productId);
        setProduct(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleFileUpload = async (newFiles: FileList, isTranscript: boolean) => {
    const dataStorageAccessor = new DataStorageAccessor();
    
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      try {
        const uploadResult = await dataStorageAccessor.uploadFile(file);
        if (product) {
          const updatedProduct = {
            ...product,
            [isTranscript ? 'interviewTranscripts' : 'fileUris']: [
              ...(isTranscript ? product.interviewTranscripts || [] : product.fileUris || []),
              uploadResult.url
            ]
          };
          
          await dataStorageAccessor.createProduct(updatedProduct);
          setProduct(updatedProduct);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isTranscript: boolean) => {
    if (e.target.files) {
      await handleFileUpload(e.target.files, isTranscript);
    }
  };

  const handleFileDelete = async (fileId: string, isTranscript: boolean) => {
    const dataStorageAccessor = new DataStorageAccessor();
    
    try {
      if (product) {
        const fileIndex = parseInt(fileId.split('-').pop() || '', 10);
        const fileUris = isTranscript ? product.interviewTranscripts : product.fileUris;
        const fileUri = fileUris[fileIndex];

        if (fileUri) {
          const updatedProduct = {
            ...product,
            [isTranscript ? 'interviewTranscripts' : 'fileUris']: fileUris.filter((_, index) => index !== fileIndex)
          };
          
          await dataStorageAccessor.createProduct(updatedProduct);
          
          // Update local state
          setProduct(updatedProduct);
        
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('text')) return '📝';
    return '📁';
  };

  const getFileListData = () => {
    if (!product) return [];
    return product.fileUris.map((uri, index) => ({
      id: `file-${index}`,
      name: uri.split('/').pop() || '',
      url: uri,
      type: uri
    }));
  };

  const getTranscriptListData = () => {
    if (!product || !product.interviewTranscripts) return [];
    return product.interviewTranscripts.map((uri, index) => ({
      id: `transcript-${index}`,
      name: uri.split('/').pop() || '',
      url: uri,
      type: 'text/plain'
    }));
  };

  const handleResize = (e: React.MouseEvent) => {
    const startY = e.clientY;
    const startHeight = filesHeight;

    const doDrag = (e: MouseEvent) => {
      const newHeight = startHeight + (e.clientY - startY) / 5;
      setFilesHeight(Math.min(Math.max(newHeight, 10), 90));
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  return (
    <div style={{
      height: '100%',
      padding: '20px',
      boxSizing: 'border-box',
      backgroundColor: '#f9f9f9',
      borderLeft: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '500px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, false)}
            multiple
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', marginRight: '10px', transition: 'background-color 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            Upload New File
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, true)}
            multiple
            style={{ display: 'none' }}
            id="transcriptInput"
          />
          <label htmlFor="transcriptInput" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', transition: 'background-color 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            Upload Interview Transcript
          </label>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', color: '#888', transition: 'color 0.3s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
        >
          ×
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 60px)' }}>
        <div style={{ 
          height: isFilesOpen ? `${filesHeight}%` : 'auto', 
          overflow: 'hidden', 
          transition: 'height 0.3s ease-in-out',
          flexGrow: isFilesOpen ? 0 : 1,
        }}>
          <h3 onClick={() => setIsFilesOpen(!isFilesOpen)} style={{ cursor: 'pointer', backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '5px', transition: 'background-color 0.3s ease', display: 'flex', alignItems: 'center' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
          >
            <span style={{ marginRight: '10px' }}>{isFilesOpen ? '▼' : '▶'}</span>
            <span style={{ flexGrow: 1, textAlign: 'center' }}>Files</span>
          </h3>
          {isFilesOpen && (
            <FileList 
              files={getFileListData()} 
              onDelete={(fileId) => handleFileDelete(fileId, false)}  // Ensure onDelete is passed
              getFileIcon={getFileIcon}
            />
          )}
        </div>
        
        {isFilesOpen && isTranscriptsOpen && (
          <div 
            ref={resizeRef}
            style={{ 
              height: '10px', 
              backgroundColor: '#e0e0e0', 
              cursor: 'row-resize',
              margin: '10px 0',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseDown={handleResize}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d0d0d0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          />
        )}
        
        <div style={{ 
          height: isTranscriptsOpen ? (isFilesOpen ? `${100 - filesHeight}%` : '100%') : 'auto', 
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out',
          marginTop: isFilesOpen || isTranscriptsOpen ? 'auto' : '0', 
        }}>
          <h3 onClick={() => setIsTranscriptsOpen(!isTranscriptsOpen)} style={{ cursor: 'pointer', backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '5px', transition: 'background-color 0.3s ease', display: 'flex', alignItems: 'center' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
          >
            <span style={{ marginRight: '10px' }}>{isTranscriptsOpen ? '▼' : '▶'}</span>
            <span style={{ flexGrow: 1, textAlign: 'center' }}>Interview Transcripts</span>
          </h3>
          {isTranscriptsOpen && (
            product && product.interviewTranscripts && product.interviewTranscripts.length > 0 ? (
              <InterviewTranscriptList
                files={getTranscriptListData()}
                onDelete={(fileId) => handleFileDelete(fileId, true)}  // Ensure onDelete is passed
                getFileIcon={getFileIcon}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#888', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>No interview transcripts uploaded. Please upload interview transcripts.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FileSpace;