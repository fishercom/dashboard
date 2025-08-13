import { Editor } from '@tinymce/tinymce-react';
import React, { useState, useEffect } from 'react';

interface TinyMCEEditorProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ id, value, onChange }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setTheme(mediaQuery.matches ? 'dark' : 'light');

    handleChange(); // Set initial theme
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isDarkMode = theme === 'dark';

  return (
    <Editor
      id={id}
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        skin: isDarkMode ? 'oxide-dark' : 'default',
        content_css: isDarkMode ? 'dark' : 'default',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
};

export default TinyMCEEditor;
