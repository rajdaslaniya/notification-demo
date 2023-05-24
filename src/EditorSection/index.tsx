import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "react-bootstrap";
import {
  sleep,
  IMAGE_URL_REGEX,
  VIDEO_EMBED_REGEX,
  getVideoId,
} from "../helpers";

const preFill =
  '<p></p>\n<p style="text-align:left;"></p>\n<img src="https://cdn.trendii.com/__trendii__images__/article/54xe2il3jyodnw.png" alt="" style="height: 300px;width: 300px"/>\n<p><code>{data: json}</code></p>\n<iframe width="auto" height="auto" src="https://www.youtube.com" frameBorder="0"></iframe>\n<p></p>\n';
const invalidImageData =
  "<div><p>This is the content</p><img src='https://cdn.trendii.com/__trendii__images__/article/54xe2il3jyodnw.pngo' /><h1>This is the header</h1><img src='hello there' /></div>";

const EditorSection: React.FC = () => {
  const editorRef = useRef<any>(null);

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.setContent("", { format: "html" });
    }
  };

  const handleData = () => {
    if (editorRef.current) {
      const data = editorRef.current.getContent();
      console.log(data);
    }
  };

  const handleRef = () => {
    if (editorRef.current) {
      console.log(editorRef.current);
    }
  };

  return (
    <div>
      <Editor
        apiKey="k33pxq96l8aypenmzwamdjelog8yb6n2k36ouktfy5uhnmtl"
        onInit={async (_, editor) => {
          editorRef.current = editor;

          editor.parser.addNodeFilter("img", (nodes) => {
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].name === "img") {
                const src = nodes[i].attr("src");
                if (src && !IMAGE_URL_REGEX.test(src)) {
                  editorRef.current?.windowManager?.alert(
                    "Failed to load an image"
                  );
                }
              }
            }
          });
          await sleep(2000);
          // editor.setContent(invalidImageData);
        }}
        initialValue=""
        init={{
          menubar: false,
          max_height: 400,
          body_class: "custom-body-class",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "media",
            "table",
            "help",
            "emoticons",
            "code",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist | link image media table | emoticons | preview help",
          toolbar_mode: "sliding",
          // image_dimensions: false,
          placeholder: "Type here...",
          image_title: false,
          file_picker_types: "image",
          image_description: false,
          link_quicklink: true,
          link_context_toolbar: true,
          media_alt_source: false,
          media_dimensions: false,
          media_poster: false,
          link_target_list: false,
          file_picker_callback: (cb, value, meta) => {
            const inputVal = value?.trim();
            if (meta.filetype === "image" && inputVal) {
              var image = new Image();
              image.onload = function () {
                cb(inputVal);
                return;
              };
              image.onerror = function () {
                editorRef.current?.windowManager?.alert(
                  "Failed to load an image"
                );
                cb("");
                return;
              };
              image.src = value;
            }
            cb("");
          },
          images_upload_handler: async (blob, progress) => {
            console.log(blob);
            await sleep(2000);
            return new Promise((resolve, reject) => {
              resolve("https://avatars.dicebear.com/api/female/thor.svg");
            });
          },
          media_url_resolver: (data: any, resolve: any, reject: any) => {
            const trimmed = (data?.url || "")?.trim();
            if (!trimmed) {
              resolve("");
            }
            const id = getVideoId(trimmed);
            if (!VIDEO_EMBED_REGEX.test(trimmed) || !id) {
              reject({ msg: "Invalid media link provided" });
            }

            const embedHtml = `<iframe src="https://www.youtube.com/embed/${id}" width="350" height="200"></iframe>`;
            resolve({ html: embedHtml });
          },
        }}
      />

      <br />
      <Button variant="primary" onClick={handleData} className="me-2">
        Get Data
      </Button>
      <Button variant="secondary" onClick={handleClear} className="me-2">
        Clear
      </Button>
      <Button variant="secondary" onClick={handleRef}>
        Get Ref
      </Button>
    </div>
  );
};

export default EditorSection;
