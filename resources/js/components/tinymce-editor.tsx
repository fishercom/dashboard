import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

interface TinyMCEEditorProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ id, value, onChange }) => {
  return (
    <Editor
      id={id}
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      value={value}
            onEditorChange={(newValue, _editor) => {
        onChange(newValue);
      }}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
};

export default TinyMCEEditor;