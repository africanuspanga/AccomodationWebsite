import { cn } from '@/lib/utils';
import { richTextToHtml } from '@/lib/rich-text';

interface RichTextProps {
  content?: string | null;
  className?: string;
  emptyText?: string;
  compact?: boolean;
  'data-testid'?: string;
}

export function RichText({ content, className, emptyText, compact = false, 'data-testid': dataTestId }: RichTextProps) {
  const html = richTextToHtml(content);

  if (!html) {
    return emptyText ? <p className={className}>{emptyText}</p> : null;
  }

  return (
    <div
      className={cn('rich-text-content', compact && 'rich-text-content-compact', className)}
      data-testid={dataTestId}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
