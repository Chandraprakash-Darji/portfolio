import { InputRule } from '@tiptap/core';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TiptapImage from '@tiptap/extension-image';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import TiptapUnderline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

import { common, createLowlight } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CustomKeymap from './custom-keymap';
import SlashCommand from './slash-command';
import UpdatedImage from './updated-image';
import { cn } from '@/lib/utils';

import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlock from '@/components/protected/editor/wysiwyg/extensions/codeblock';
const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn('list-disc list-outside leading-3 -mt-2'),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn('list-decimal list-outside leading-3 -mt-2'),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn('leading-normal -mb-2'),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn('border-l-4 border-primary'),
    },
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cn('rounded-md bg-muted px-1.5 py-1 font-mono font-medium'),
      spellcheck: 'false',
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4,
  },
  gapcursor: false,
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cn('not-prose pl-2 '),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cn('flex gap-2 items-start my-4'),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.extend({
  addInputRules() {
    return [
      new InputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/u,
        handler: ({ state, range }) => {
          const attributes = {};

          const { tr } = state;
          const start = range.from;
          const end = range.to;

          tr.insert(start - 1, this.type.create(attributes)).delete(
            tr.mapping.map(start),
            tr.mapping.map(end)
          );
        },
      }),
    ];
  },
}).configure({
  HTMLAttributes: {
    class: cn('mt-4 mb-6 border-t border-muted-foreground'),
  },
});

const codeBlockLowlight = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock);
  },
}).configure({
  lowlight: createLowlight(common),
  HTMLAttributes: {
    class: 'not-prose',
  },
});

export const defaultExtensions = [
  starterKit,
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer',
    },
  }),
  TiptapImage.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'rounded-lg border border-muted',
    },
  }),
  UpdatedImage.configure({
    HTMLAttributes: {
      class: 'rounded-lg border border-muted',
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands";
    },
    includeChildren: true,
  }),
  SlashCommand,
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  taskList,
  taskItem,
  horizontalRule,
  Markdown.configure({
    html: false,
    transformCopiedText: true,
    transformPastedText: true,
  }),
  CustomKeymap,
  codeBlockLowlight,
  GlobalDragHandle,
];
