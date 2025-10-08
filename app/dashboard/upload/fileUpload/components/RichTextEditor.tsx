"use client";

import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Type,
  Highlighter,
} from "lucide-react";
import Highlight from "@tiptap/extension-highlight";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  content = "",
  onChange,
  placeholder = "Tell your story...",
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-inherit underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "w-full h-auto my-8",
        },
      }),
      Highlight.configure({
        multicolor: false,
        HTMLAttributes: {
          class: "bg-yellow-200 px-1 rounded",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none focus:outline-none min-h-[600px] px-0 py-8 text-[21px] leading-[32px] text-gray-900 font-serif mx-auto",
        style: "font-family: Charter, Georgia, serif;",
      },
    },
    // This is the key to fixing the SSR hydration issue
    // It tells TipTap to not immediately render on the server
    // and wait for the client-side JavaScript to take over
    immediatelyRender: false,
  });

  const addLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImageFromUrl = () => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file || !editor) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          editor.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const addImageMenu = () => {
    const choice = window.confirm(
      "Click OK to upload from device, or Cancel to enter URL"
    );
    if (choice) {
      triggerImageUpload();
    } else {
      addImageFromUrl();
    }
  };

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !editor) {
    return (
      <div className="min-h-[600px] border rounded-lg p-4">
        Loading editor...
      </div>
    );
  }

  const MenuButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2.5 rounded-full transition-all ${
        isActive ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Floating Toolbar */}
      <div className="sticky top-4 z-10 mb-8">
        <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full shadow-lg px-3 py-2">
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="w-5 h-5" />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="w-5 h-5" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive("paragraph")}
            title="Normal Text"
          >
            <Type className="w-5 h-5" />
          </MenuButton>
          <div className="border-l border-gray-300 h-6 mx-1"></div>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-5 h-5" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-5 h-5" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive("highlight")}
            title="Highlight"
          >
            <Highlighter className="w-5 h-5" />
          </MenuButton>
          <div className="border-l border-gray-300 h-6 mx-1"></div>
          <MenuButton
            onClick={addLink}
            isActive={editor.isActive("link")}
            title="Add Link"
          >
            <LinkIcon className="w-5 h-5" />
          </MenuButton>
          <div className="border-l border-gray-300 h-6 mx-1"></div>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="w-5 h-5" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="w-5 h-5" />
          </MenuButton>
          <div className="border-l border-gray-300 h-6 mx-1"></div>
          <MenuButton onClick={addImageMenu} title="Add Image">
            <ImageIcon className="w-5 h-5" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content with Medium-style formatting */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
        }

        .ProseMirror p {
          margin-bottom: 2rem;
          line-height: 1.58;
          letter-spacing: -0.003em;
        }

        .ProseMirror h1 {
          font-size: 42px;
          line-height: 1.2;
          font-weight: 700;
          margin-bottom: 1.5rem;
          margin-top: 2.5rem;
          letter-spacing: -0.022em;
        }

        .ProseMirror h2 {
          font-size: 28px;
          line-height: 1.3;
          font-weight: 700;
          margin-bottom: 1rem;
          margin-top: 2rem;
          letter-spacing: -0.019em;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 30px;
          margin-bottom: 2rem;
        }

        .ProseMirror li {
          margin-bottom: 0.5rem;
          line-height: 1.58;
        }

        .ProseMirror ul li {
          list-style-type: disc;
        }

        .ProseMirror ol li {
          list-style-type: decimal;
        }

        .ProseMirror strong {
          font-weight: 700;
        }

        .ProseMirror em {
          font-style: italic;
        }

        .ProseMirror mark {
          background-color: #fef08a;
          padding: 2px 4px;
          border-radius: 2px;
        }

        .ProseMirror a {
          text-decoration: underline;
          color: inherit;
        }

        .ProseMirror img {
          display: block;
          margin: 2.5rem auto;
          max-width: 100%;
          height: auto;
        }

        .ProseMirror blockquote {
          border-left: 3px solid #292929;
          padding-left: 20px;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #292929;
        }

        .ProseMirror code {
          background-color: #f3f4f6;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: "Menlo", "Monaco", "Courier New", monospace;
          font-size: 0.9em;
        }

        .ProseMirror pre {
          background-color: #292929;
          color: #f8f8f8;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
        }

        .ProseMirror pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>

      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
