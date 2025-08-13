import React, { useEffect, useRef } from 'react';
import 'tinymce/tinymce';
import 'tinymce/icons/default/icons';
import 'tinymce/themes/silver/theme';
import 'tinymce/models/dom/model';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';

type Props = {
  id: string;
  value: string;
  onChange: (html: string) => void;
};

export default function TinyMCEEditor({ id, value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    import('tinymce/tinymce').then(({ default: tinymce }) => {
      if (!isMounted || !textareaRef.current) return;
      tinymce.init({
        target: textareaRef.current,
        menubar: false,
        plugins: 'link lists table code image media',
        toolbar:
          'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media | table | code',
        height: 320,
        branding: false,
        setup: (editor) => {
          editorRef.current = editor;
          editor.on('Change KeyUp SetContent', () => {
            onChange(editor.getContent());
          });
        },
        init_instance_callback: (editor) => {
          if (value) editor.setContent(value);
        },
      });
    });
    return () => {
      isMounted = false;
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const tinymce = require('tinymce/tinymce');
        tinymce?.remove(editorRef.current);
      } catch {}
    };
  }, []);

  useEffect(() => {
    const ed = editorRef.current;
    if (ed && value !== ed.getContent()) {
      ed.setContent(value || '');
    }
  }, [value]);

  return <textarea id={id} ref={textareaRef} defaultValue={value} />;
}


