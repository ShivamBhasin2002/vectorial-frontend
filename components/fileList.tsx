import React from 'react';

interface File {
  id: string;
  name: string;
  url: string;
  type: string;
}

interface FileListProps {
  files: File[];
  onDelete: (fileId: string) => void;
  getFileIcon?: (fileType: string) => string;
  showDelete?: boolean;
}

export const FileList: React.FC<FileListProps> = ({ 
  files, 
  onDelete, 
  getFileIcon = () => '📁',
  showDelete = true 
}) => {
  return (
    <div style={{ overflowY: 'auto', flexGrow: 1 }}>
      {files.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 5px', fontSize: '14px' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 1 }}>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #dee2e6' }}>File Name</th>
              {showDelete && <th style={{ width: '30px', padding: '8px', borderBottom: '2px solid #dee2e6' }}></th>}
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={file.id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                <td style={{ padding: '6px', textAlign: 'left' }}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span style={{ marginRight: '8px' }}>{getFileIcon(file.type)}</span>
                    {file.name}
                  </a>
                </td>
                {showDelete && (
                  <td style={{ padding: '6px', textAlign: 'center' }}>
                    <button
                      onClick={() => onDelete(file.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc3545',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', color: '#888', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>No files uploaded</p>
        </div>
      )}
    </div>
  );
};