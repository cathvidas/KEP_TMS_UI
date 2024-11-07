import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useRef, useState } from "react";
import proptype from "prop-types";

import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Link,
  Alignment,
  List,
  Table,
  Heading,
  FontColor,
  FontBackgroundColor,
  TableToolbar,
  TableProperties,
  TableCellPropertiesEditing,
  TableCellProperties,
  Underline,
  Indent,
  IndentBlock,
  Font,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        /* ... */
        ui: {
            poweredBy: {
                position: 'inside',
                side: 'left',
                label: 'This is'
            }
        }
    } )
    .then( /* ... */ )
    .catch( /* ... */ );
const TextEditor = ({ defaultValue, onChange }) => {
  const [editorData, setEditorData] = useState(defaultValue);
  useEffect(() => {
    if (onChange) {
      onChange(editorData);
    }
  }, [editorData]);
  useEffect(() => {
    setEditorData(defaultValue);
  }, [defaultValue]);
  const customColorPalette = [
    {
      color: "hsl(4, 90%, 58%)",
      label: "Red",
    },
    {
      color: "hsl(340, 82%, 52%)",
      label: "Pink",
    },
    {
      color: "hsl(291, 64%, 42%)",
      label: "Purple",
    },
    {
      color: "hsl(262, 52%, 47%)",
      label: "Deep Purple",
    },
    {
      color: "hsl(231, 48%, 48%)",
      label: "Indigo",
    },
    {
      color: "hsl(207, 90%, 54%)",
      label: "Blue",
    },

    // More colors.
    // ...
  ];
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
        config={{
          placeholder: "Type your text here...",

          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "alignment",
            "|",
            "link",
            "insertTable",
            "bulletedList",
            "numberedList",
            "|",
            // "blockQuote",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "outdent",
            "indent"
          ],
          alignment: {
            options: ["left", "center", "right", "justify"],
          },

          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
            ],

            // Set the palettes for tables.
            tableProperties: {
              borderColors: customColorPalette,
              backgroundColors: customColorPalette,  
               defaultProperties: {
                borderStyle: 'dashed',
                borderColor: 'hsl(90, 75%, 60%)',
                borderWidth: '3px',
                alignment: 'left',
                width: '550px',
                height: '450px'
            }, tableCellProperties: {
              defaultProperties: {
                  horizontalAlignment: 'center',
                  verticalAlignment: 'bottom',
                  padding: '10px'
              }
              }
            },

            // Set the palettes for table cells.
            tableCellProperties: {
              borderColors: customColorPalette,
              backgroundColors: customColorPalette,
            },
          },
          plugins: [
            Table,
            TableToolbar,
            TableProperties,
            TableCellProperties,
            Bold,
            Underline,
            Essentials,
            Italic,
            Mention,
            Paragraph,
            Undo,
            Link,
            Alignment,
            List,
            Heading,
            FontColor,
            FontBackgroundColor,
            Indent,
            IndentBlock,
            Font
          ],
        }}
      />
    </div>
  );
};
TextEditor.propTypes = {
  defaultValue: proptype.string,
  onChange: proptype.func,
};
export default TextEditor;