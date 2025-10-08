"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { RichTextEditor as RichTextEditorType } from "./RichTextEditor";

const RichTextEditorComponent = dynamic<React.ComponentProps<typeof RichTextEditorType>>(
  () => import("./RichTextEditor").then((mod) => mod.RichTextEditor as ComponentType<React.ComponentProps<typeof RichTextEditorType>>),
  { ssr: false, loading: () => <div>Loading editor...</div> }
);

type RichTextEditorClientProps = React.ComponentProps<typeof RichTextEditorType>;

export default function RichTextEditorClient(props: RichTextEditorClientProps) {
  return <RichTextEditorComponent {...props} />;
}
