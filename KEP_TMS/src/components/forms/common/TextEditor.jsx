import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import "../../../assets/css/TextEditor.css";
// import 'ckeditor5/ckeditor5.css';

import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Alignment,
  List,
  Table,
  Heading,
  FontColor,
  FontBackgroundColor,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  Underline,
  Indent,
  IndentBlock,
  Font,
  GeneralHtmlSupport,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
const TextEditor = ({
  defaultValue,
  onChange,
  showToolbar,
  template,
  disableTable,
}) => {
  const [editorData, setEditorData] = useState(defaultValue);
  useEffect(() => {
    if (onChange) {
      onChange(editorData);
    }
  }, [editorData]);
  useEffect(() => {
    setEditorData(defaultValue ?? "<div> </div>");
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
  ];
  const toolbar = [
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
    ...(disableTable ? [] : ["table", "insertTable"]),
    "bulletedList",
    "numberedList",
    "|",
    "fontSize",
    "fontFamily",
    "fontColor",
    "fontBackgroundColor",
    "outdent",
    "indent",
    "insertImage",
  ];
  return (
    <div className={`${showToolbar ? "" : "custom-text-editor"} ${template}`}>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
        config={{
          allowedContent: true,
          htmlSupport: {
            allow: [
              {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true,
              },
            ],
          },
          extraAllowedContent: "*[*]{*}(*)",
          // extraAllowedContent: [
          //   'table(*);',
          //   'table-row(*);',
          //   'table-cell(*);',
          //   'table[border*,style*,width*,height*]',
          //   'table-row[style*,data-*]',
          //   'table-cell[style*,data-*]',
          // ].join(' '),
          placeholder: "Type your text here...",
          //add toolbar is showToolbar is true
          toolbar: showToolbar ? toolbar : [],
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
                borderStyle: "dashed",
                borderColor: "hsl(90, 75%, 60%)",
                borderWidth: "3px",
                alignment: "left",
                width: "550px",
                height: "450px",
              },
              tableCellProperties: {
                defaultProperties: {
                  horizontalAlignment: "center",
                  verticalAlignment: "bottom",
                  padding: "10px",
                },
              },
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
            // Link,
            GeneralHtmlSupport,
            Alignment,
            List,
            Heading,
            FontColor,
            FontBackgroundColor,
            Indent,
            IndentBlock,
            Font,
          ],
          schema: {
            elements: {
              table: {
                allowAttributes: [
                  "class",
                  "style",
                  "data-*",
                  "border",
                  "width",
                  "height",
                ],
              },
              tableRow: {
                allowAttributes: ["class", "style", "data-*"],
              },
              tableCell: {
                allowAttributes: [
                  "class",
                  "style",
                  "data-*",
                  "colspan",
                  "rowspan",
                ],
              },
              tableHeaderCell: {
                allowAttributes: [
                  "class",
                  "style",
                  "data-*",
                  "colspan",
                  "rowspan",
                ],
              },
              span: {
                allowAttributes: ["class", "style", "data-*"],
              },
              div: {
                allowAttributes: ["class", "style", "data-*"],
              },
              p: {
                allowAttributes: ["class", "style", "data-*"],
              },
            },
          },
        }}
      />
    </div>
  );
};
TextEditor.propTypes = {
  defaultValue: proptype.string,
  onChange: proptype.func,
  showToolbar: proptype.bool,
  template: proptype.string,
  disableTable: proptype.bool,
};
export default TextEditor;
