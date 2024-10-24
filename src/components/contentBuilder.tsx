"use client";

import { FormEvent, SetStateAction, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import Froalaeditor from "froala-editor";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

const ContentBuilder = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);
  const [coverDescription, setCoverDescription] = useState<string>("");

  const config = {
    heightMin: 300,
    enter: Froalaeditor.ENTER_BR,
    tableStyles: {
      "no-border": "No border",
    },
    useClasses: false,
    attribution: false,
    toolbarSticky: false,
    charCounterCount: false,
    fontFamilySelection: true,
    fontSizeSelection: true,
    paragraphFormatSelection: true,
    linkInsertButtons: [],
    toolbarButtons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "subscript",
      "superscript",
      "fontFamily",
      "fontSize",
      "textColor",
      "paragraphFormat",
      "lineHeight",
      "align",
      "formatOL",
      "formatUL",
      "outdent",
      "indent",
      "leftToRight",
      "rightToLeft",
      "insertLink",
      "insertImage",
      "insertTable",
      "emoticons",
      "personalize",
      "insertButton",
      "clearFormatting",
      "selectAll",
      "insertHR",
      "undo",
      "redo",
      "fullscreen",
      "html",
    ],
    linkList: [],
    events: {
      "image.beforeUpload": function (files) {
        const editor = this;
        if (files.length) {
          if (files[0].size / 1000 > 255) {
            alert("Image file size exceeded the limit");
            return false;
          } else {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              editor.image.insert(result, null, null, editor.image.get());
            };
            reader.readAsDataURL(files[0]);
          }
        }
        editor.popups.hideAll();
        return false; // Stop default upload chain.
      },
    },
  };

  function handleOnChange(bodyContent: SetStateAction<string>) {
    setContent(bodyContent);
  }

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();
    // console.log("Publishing Content:");
    // console.log("Title:", title);
    // console.log("Cover Description:", coverDescription);
    // console.log("Content:", content);

    // alert("Content published successfully!");
  };

  return (
    <div className="w-full p-8 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Content Builder</h1>
      <form className="space-y-6" onSubmit={handlePublish}>
        <div>
          <label className="block text-lg font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter title..."
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Cover Image</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Cover Description</label>
          <textarea
            value={coverDescription}
            onChange={(e) => setCoverDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={2}
            placeholder="Enter cover description..."
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Content</label>
          <FroalaEditor
            tag="textarea"
            config={config}
            model={content}
            onModelChange={handleOnChange}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
          >
            Preview
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Publish
          </button>
        </div>
      </form>

      {preview && (
        <>
          <h2 className="block text-xl font-bold">Preview</h2>
          <FroalaEditorView model={content} />
        </>
      )}
    </div>
  );
};

export default ContentBuilder;
