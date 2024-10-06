import React from 'react';
import { FileList } from './FileList';

interface InterviewTranscriptListProps {
  files: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  onDelete: (fileId: string) => void;
  getFileIcon?: (fileType: string) => string;
}

export const InterviewTranscriptList: React.FC<InterviewTranscriptListProps> = ({
  files,
  onDelete,
  getFileIcon
}) => {
  return (
    <FileList
      files={files}
      onDelete={onDelete}
      getFileIcon={getFileIcon}
      showDelete={true}
    />
  );
};
