import { Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RichTextChange = { html: string; text: string };

type ToolbarLabels = {
	bold: string;
	italic: string;
	bulletList: string;
	orderedList: string;
};

type RichTextEditorProps = {
	ariaLabel: string;
	placeholder: string;
	labels: ToolbarLabels;
	invalid?: boolean;
	onChange: (value: RichTextChange) => void;
};

const EDITOR_CLASS = cn(
	"prose prose-sm dark:prose-invert max-w-none text-foreground",
	"min-h-20 max-h-40 overflow-y-auto px-3 py-2 focus:outline-none",
	"prose-p:my-1.5 prose-headings:mt-2 prose-headings:mb-1 prose-headings:font-semibold",
	"prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-blockquote:my-2 prose-pre:my-2 prose-hr:my-3",
);

const toolbarButtonClass = cn(
	"inline-flex size-6 items-center justify-center rounded text-muted-foreground outline-none",
	"transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
	"data-active:bg-accent data-active:text-accent-foreground",
);

export function RichTextEditor(props: RichTextEditorProps) {
	const { ariaLabel, labels, onChange, placeholder, invalid } = props;

	const editor = useEditor({
		extensions: [StarterKit, Placeholder.configure({ placeholder })],
		immediatelyRender: false,
		editorProps: {
			attributes: { "aria-label": ariaLabel, class: EDITOR_CLASS },
		},
		onUpdate: ({ editor }) => onChange({ html: editor.getHTML(), text: editor.getText() }),
	});

	const state = useEditorState({
		editor,
		selector: ({ editor }) => ({
			bold: editor?.isActive("bold") ?? false,
			italic: editor?.isActive("italic") ?? false,
			bulletList: editor?.isActive("bulletList") ?? false,
			orderedList: editor?.isActive("orderedList") ?? false,
		}),
	});

	return (
		<div
			className={cn(
				"rounded-lg border border-input bg-background shadow-xs",
				"focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
				invalid &&
					"border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
			)}
		>
			<div className="flex items-center gap-0.5 rounded-t-lg border-b bg-muted/30 px-1 py-0.5">
				<ToolbarButton
					label={labels.bold}
					active={state?.bold}
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
					<Bold className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					label={labels.italic}
					active={state?.italic}
					onClick={() => editor?.chain().focus().toggleItalic().run()}
				>
					<Italic className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					label={labels.bulletList}
					active={state?.bulletList}
					onClick={() => editor?.chain().focus().toggleBulletList().run()}
				>
					<List className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					label={labels.orderedList}
					active={state?.orderedList}
					onClick={() => editor?.chain().focus().toggleOrderedList().run()}
				>
					<ListOrdered className="size-3.5" />
				</ToolbarButton>
			</div>

			<EditorContent editor={editor} />
		</div>
	);
}

function ToolbarButton({
	label,
	active,
	onClick,
	children,
}: {
	label: string;
	active?: boolean;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			aria-label={label}
			aria-pressed={active}
			data-active={active || undefined}
			onClick={onClick}
			className={toolbarButtonClass}
		>
			{children}
		</button>
	);
}
