"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

import { useAuth } from "@/hooks/useAuth";
import { createNewBlog } from "@/actions/actions";
import {
  useRef,
  useState,
  useActionState,
  SetStateAction,
  MutableRefObject,
} from "react";

// Dynamically load FroalaEditor to avoid SSR issues
const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});
const FroalaEditorView = dynamic(
  () => import("react-froala-wysiwyg/FroalaEditorView"),
  {
    ssr: false,
  }
);

const ContentBuilder = () => {
  const { uid } = useAuth();
  const editorRef: MutableRefObject<any> = useRef(null);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);

  // server actions
  const createBlogWithUid = async (
    state: string | null | undefined,
    payload: {
      formData: FormData;
      content: string;
      coverImage: File | null;
      uid: string;
    }
  ) => {
    const { formData, content, coverImage, uid } = payload;
    const previousState = state ? state : null;

    return await createNewBlog(
      previousState,
      formData,
      content,
      coverImage,
      uid
    );
  };
  const [error, formAction, isPending] = useActionState(
    createBlogWithUid,
    null
  );

  function handleOnChange(bodyContent: SetStateAction<string>) {
    setContent(bodyContent);
  }

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;
    if (file?.[0]) {
      setCoverImage(file?.[0]);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setPreviewImg(event.target?.result as string);
      };
      reader.readAsDataURL(file[0]);
    }
  };

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
      initialized: function () {
        editorRef.current = this;
      },
      "image.beforeUpload": (files: File[]) => {
        if (files.length) {
          const file = files[0];

          if (file.size / 1000 > 255) {
            alert("Image file size exceeded the limit");
            return false;
          }

          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result as string;

            if (result && editorRef) {
              editorRef.current.image.insert(
                result,
                null,
                null,
                editorRef.current.image.get()
              );
            }
          };

          reader.readAsDataURL(file);
          (FroalaEditor as any)?.popups?.hideAll();
        }

        return false;
      },
    },
  };

  return (
    <div className="w-full p-8 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">
        {preview ? "Preview" : "Content Builder"}
      </h1>

      <form
        action={(formData: FormData) =>
          formAction({ formData, content, coverImage, uid })
        }
        className="space-y-6"
      >
        {!preview ? (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title..."
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cover Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {previewImg ? (
                    <Image
                      src={previewImg}
                      alt="Cover preview"
                      width={300}
                      height={200}
                      className="mx-auto h-48 w-96 object-cover rounded-md"
                    />
                  ) : (
                    <div className="mx-auto h-48 w-96 flex items-center justify-center bg-gray-100 rounded-md">
                      <span className="text-gray-500">No image selected</span>
                    </div>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-semibold m-auto text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleUploadImage}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cover Description
              </label>
              <textarea
                name="coverDescription"
                placeholder="Enter cover description..."
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Content
              </label>
              <FroalaEditor
                tag="textarea"
                config={config}
                model={content}
                onModelChange={handleOnChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="prose max-w-none">
              {/* <h2 className="mb-2">{title}</h2> */}
              {previewImg && (
                <Image
                  src={previewImg}
                  alt={"coverDescription"}
                  width={500}
                  height={300}
                  className="w-full rounded-lg"
                />
              )}
              {/* <p className="text-gray-600 mb-4 mt-2">{coverDescription}</p>
              <p
                onClick={() => setHtmlSource(!htmlSource)}
                className="cursor-pointer border px-4 py-2 rounded-lg text-gray-700 w-fit hover:bg-slate-800 hover:text-white"
              >
                See html source
              </p>
              {htmlSource && <div>{content}</div>} */}
              <FroalaEditorView model={content} />
            </div>
          </>
        )}

        {isPending && <p>Publishing content, please wait...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            // aria-disabled={!title || !content}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
          >
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            type="submit"
            aria-disabled={isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentBuilder;
