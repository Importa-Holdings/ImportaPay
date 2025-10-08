"use client";

import dynamic from 'next/dynamic';
const RichTextEditorComponent = dynamic(
  () => import('./RichTextEditor').then((mod) => mod.RichTextEditor),
  { ssr: false }
);

export default function RichTextEditorClient(props: any) {
  return <RichTextEditorComponent {...props} />;
}
