import { useState } from 'react';
import FileUpload, { FileUploadProps } from '.';

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
};

export const DefaultStory = (args: FileUploadProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  return (
    <FileUpload
      {...args}
      onChange={(e) => setFiles(e.currentTarget.files)}
      value={files}
    />
  );
};
