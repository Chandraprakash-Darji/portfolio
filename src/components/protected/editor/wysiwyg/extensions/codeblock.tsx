import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import {
  NodeViewContent,
  NodeViewRendererProps,
  NodeViewWrapper,
} from '@tiptap/react';

export default function CodeBlock({
  node: {
    attrs: { language: defaultLanguage },
  },
  // @ts-expect-error Somehow it is not defined in the type
  updateAttributes,
  extension,
}: NodeViewRendererProps) {
  return (
    <NodeViewWrapper className="code-block">
      <Select
        defaultValue={defaultLanguage}
        onValueChange={(value) => updateAttributes({ language: value })}
      >
        <SelectTrigger className="w-max" value="null">
          auto
        </SelectTrigger>
        <SelectContent>
          {extension.options.lowlight
            .listLanguages()
            .map((lang: string, index: number) => (
              <SelectItem key={index} value={lang}>
                {lang}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <pre>
        <NodeViewContent
          as="code"
          style={{ padding: 0, fontFamily: 'Menlo', fontSize: '14px' }}
        />
      </pre>
    </NodeViewWrapper>
  );
}
