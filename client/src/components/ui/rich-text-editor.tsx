import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Bold, Heading2, Heading3, Italic, Link2, List, ListOrdered, Pilcrow, RemoveFormatting, Unlink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { normalizeEditorUrl, richTextColors, sanitizeRichText } from '@/lib/rich-text';

interface RichTextEditorProps {
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  className?: string;
  'data-testid'?: string;
}

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          onMouseDown={(event) => event.preventDefault()}
          onClick={onClick}
          className="h-9 w-9 rounded-md"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content...',
  minHeight = 160,
  className,
  'data-testid': dataTestId,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const isFocusedRef = useRef(false);

  useEffect(() => {
    if (!editorRef.current || isFocusedRef.current) return;
    const nextValue = value || '';

    if (editorRef.current.innerHTML !== nextValue) {
      editorRef.current.innerHTML = nextValue;
    }
  }, [value]);

  const syncValue = (sanitize = false) => {
    if (!editorRef.current) return;
    const nextValue = sanitize ? sanitizeRichText(editorRef.current.innerHTML) : editorRef.current.innerHTML;

    if (sanitize && editorRef.current.innerHTML !== nextValue) {
      editorRef.current.innerHTML = nextValue;
    }

    onChange(nextValue);
  };

  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    syncValue(true);
  };

  const addLink = () => {
    const href = normalizeEditorUrl(window.prompt('Enter the link URL') || '');
    if (!href) return;

    runCommand('createLink', href);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const html = event.clipboardData.getData('text/html');
    const text = event.clipboardData.getData('text/plain');
    const safeHtml = html ? sanitizeRichText(html) : sanitizeRichText(text);
    document.execCommand('insertHTML', false, safeHtml);
    syncValue(true);
  };

  return (
    <div className={cn('rounded-lg border border-input bg-background shadow-sm', className)}>
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 p-2">
        <ToolbarButton label="Paragraph" onClick={() => runCommand('formatBlock', 'p')}>
          <Pilcrow className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Heading" onClick={() => runCommand('formatBlock', 'h2')}>
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Subheading" onClick={() => runCommand('formatBlock', 'h3')}>
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 h-6 w-px bg-border" />
        <ToolbarButton label="Bold" onClick={() => runCommand('bold')}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Italic" onClick={() => runCommand('italic')}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 h-6 w-px bg-border" />
        <ToolbarButton label="Bullet list" onClick={() => runCommand('insertUnorderedList')}>
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Numbered list" onClick={() => runCommand('insertOrderedList')}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 h-6 w-px bg-border" />
        <ToolbarButton label="Add link" onClick={addLink}>
          <Link2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Remove link" onClick={() => runCommand('unlink')}>
          <Unlink className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 h-6 w-px bg-border" />
        <div className="flex items-center gap-1 px-1">
          {richTextColors.map((color) => (
            <Tooltip key={color.value}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${color.label} text color`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => runCommand('foreColor', color.value)}
                  className="h-7 w-7 rounded-full border border-border shadow-sm ring-offset-background transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  style={{ backgroundColor: color.value }}
                />
              </TooltipTrigger>
              <TooltipContent>{color.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="mx-1 h-6 w-px bg-border" />
        <ToolbarButton label="Clear formatting" onClick={() => runCommand('removeFormat')}>
          <RemoveFormatting className="h-4 w-4" />
        </ToolbarButton>
      </div>
      <div
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        data-testid={dataTestId}
        onFocus={() => {
          isFocusedRef.current = true;
        }}
        onBlur={() => {
          isFocusedRef.current = false;
          syncValue(true);
        }}
        onInput={() => syncValue(false)}
        onPaste={handlePaste}
        className="rich-text-editor min-h-[var(--editor-min-height)] px-4 py-3 text-sm leading-7 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ ['--editor-min-height' as string]: `${minHeight}px` }}
      />
    </div>
  );
}
