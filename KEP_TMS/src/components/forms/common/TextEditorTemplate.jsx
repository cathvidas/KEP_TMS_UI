import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from '@ckeditor/ckeditor5-react';
const TextEditorTemplate = () => {
  return (
    <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
                ],
                licenseKey: '<YOUR_LICENSE_KEY>',
                mention: {
                    // Mention configuration
                },
                initialData: '<p>Hello from CKEditor 5 in React!</p>',
            } }
        />
  );
}

export default TextEditorTemplate;