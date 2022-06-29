import FileUpload, { FileUploadProps } from '.';

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
};

export const DefaultStory = (args: FileUploadProps) => <FileUpload {...args} />;

DefaultStory.args = {
  accept: ['.pdf'],
  value: {
    name: 'test_default_file.pdf',
    size: 1024,
  },
};
