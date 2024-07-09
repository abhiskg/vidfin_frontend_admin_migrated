import { cn } from "@/lib/utils";
import { Heading } from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolbar } from "./editor-toolbar";

interface Props {
  field: string;
  onChange: (richText: string) => void;
  className?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  field,
  onChange,
  className,
  disabled = false,
}: Props) {
  // const CustomListItem = ListItem.extend({
  //   content: "text*",
  // });
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl font-bold",
          levels: [2],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: " underline",
        },
      }),
    ],
    content: field,
    editorProps: {
      attributes: {
        class: cn(
          "w-full rounded-b-md border-input bg-background px-3 py-2 border shadow-sm ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ",
          className,
          disabled && "cursor-not-allowed opacity-70",
        ),
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex min-h-[250px] flex-col justify-stretch">
      <EditorToolbar editor={editor} disabled={disabled} />
      <EditorContent editor={editor} />
    </div>
  );
}
