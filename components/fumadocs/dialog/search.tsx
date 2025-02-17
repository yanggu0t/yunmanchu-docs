'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import type { SortedResult } from 'fumadocs-core/server';
import { useEffectEvent } from 'fumadocs-core/utils/use-effect-event';
import { useI18n, useSidebar } from 'fumadocs-ui/provider';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { FileText, Hash, Loader2, SearchIcon, Text } from 'lucide-react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

export type SearchLink = [name: string, href: string];

type ReactSortedResult = Omit<SortedResult, 'content'> & {
  external?: boolean;
  content: ReactNode;
};

export interface SharedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  /**
   * Custom links to be displayed if search is empty
   */
  links?: SearchLink[];
}

interface SearchDialogProps extends SharedProps {
  search: string;
  onSearchChange: (v: string) => void;
  isLoading?: boolean;
  hideResults?: boolean;
  results: ReactSortedResult[] | 'empty';

  footer?: ReactNode;
}

export function SearchDialog({
  open,
  onOpenChange,
  footer,
  links = [],
  search,
  onSearchChange,
  isLoading,
  ...props
}: SearchDialogProps) {
  const { text } = useI18n();
  const defaultItems = useMemo<ReactSortedResult[]>(
    () =>
      links.map(([name, link]) => ({
        type: 'page',
        id: name,
        content: name,
        url: link,
      })),
    [links]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
      <DialogContent
        aria-describedby={undefined}
        className="bg-fd-popover text-fd-popover-foreground data-[state=closed]:animate-fd-dialog-out data-[state=open]:animate-fd-dialog-in fixed top-[10vh] left-1/2 z-50 w-[98vw] max-w-screen-sm -translate-x-1/2 rounded-lg border shadow-lg"
      >
        <DialogTitle className="hidden">{text.search}</DialogTitle>
        <div className="flex flex-row items-center gap-2 px-3">
          <LoadingIndicator isLoading={isLoading ?? false} />
          <input
            value={search}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) {
                e.stopPropagation();
                return;
              }
            }}
            placeholder={text.search}
            className="placeholder:text-fd-muted-foreground w-0 flex-1 bg-transparent py-3 text-base focus-visible:outline-none"
          />
          <button
            type="button"
            aria-label="Close Search"
            onClick={() => onOpenChange(false)}
            className={cn(
              buttonVariants({
                color: 'outline',
                className: 'p-1.5 text-xs',
              })
            )}
          >
            Esc
          </button>
        </div>
        {props.results !== 'empty' || defaultItems.length > 0 ? (
          <SearchResults
            items={props.results === 'empty' ? defaultItems : props.results}
            onSelect={() => onOpenChange(false)}
          />
        ) : null}
        {footer ? (
          <div className="mt-auto flex flex-col border-t p-3">{footer}</div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

const icons = {
  text: <Text className="text-fd-muted-foreground size-4" />,
  heading: <Hash className="text-fd-muted-foreground size-4" />,
  page: <FileText className="text-fd-muted-foreground size-4" />,
};

function SearchResults({
  items,
  onSelect,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  items: ReactSortedResult[];
  onSelect?: (value: string) => void;
}) {
  const [active, setActive] = useState<string>();
  const { text } = useI18n();
  const router = useRouter();
  const sidebar = useSidebar();

  if (
    items.length > 0 &&
    (!active || items.every((item) => item.id !== active))
  ) {
    setActive(items[0].id);
  }

  const onOpen = ({ external, url }: ReactSortedResult) => {
    if (external) window.open(url, '_blank')?.focus();
    else router.push(url);
    onSelect?.(url);
    sidebar.setOpen(false);
  };

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.isComposing) {
      return;
    }

    if (e.key === 'ArrowDown' || e.key == 'ArrowUp') {
      setActive((cur) => {
        const idx = items.findIndex((item) => item.id === cur);
        if (idx === -1) return items.at(0)?.id;

        return items.at(
          (e.key === 'ArrowDown' ? idx + 1 : idx - 1) % items.length
        )?.id;
      });

      e.preventDefault();
    }

    if (e.key === 'Enter') {
      const selected = items.find((item) => item.id === active);
      if (selected) onOpen(selected);
      e.preventDefault();
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [onKey]);

  return (
    <div
      {...props}
      className={cn(
        'flex max-h-[460px] flex-col overflow-y-auto border-t p-2',
        props.className
      )}
    >
      {items.length === 0 ? (
        <div className="py-12 text-center text-sm">{text.searchNoResult}</div>
      ) : null}

      {items.map((item) => (
        <CommandItem
          key={item.id}
          value={item.id}
          active={active}
          onActiveChange={setActive}
          onClick={() => {
            onOpen(item);
          }}
        >
          {item.type !== 'page' ? (
            <div
              role="none"
              className="bg-fd-border ms-2 h-full min-h-10 w-px"
            />
          ) : null}
          {icons[item.type]}
          <p className="w-0 flex-1 truncate">{item.content}</p>
        </CommandItem>
      ))}
    </div>
  );
}

function LoadingIndicator({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="relative size-4">
      <Loader2
        className={cn(
          'text-fd-primary absolute size-full animate-spin transition-opacity',
          !isLoading && 'opacity-0'
        )}
      />
      <SearchIcon
        className={cn(
          'text-fd-muted-foreground absolute size-full transition-opacity',
          isLoading && 'opacity-0'
        )}
      />
    </div>
  );
}

function CommandItem({
  active,
  onActiveChange,
  value,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  active?: string;
  onActiveChange: (value: string) => void;
}) {
  return (
    <button
      ref={useCallback(
        (element: HTMLButtonElement | null) => {
          if (active === value && element) {
            element.scrollIntoView({
              block: 'nearest',
            });
          }
        },
        [active, value]
      )}
      type="button"
      aria-selected={active === value}
      onPointerMove={() => onActiveChange(value)}
      {...props}
      className={cn(
        'flex min-h-10 flex-row items-center gap-2.5 rounded-lg px-2 text-start text-sm select-none',
        active === value && 'bg-fd-accent text-fd-accent-foreground',
        props.className
      )}
    >
      {props.children}
    </button>
  );
}

export interface TagItem {
  name: string;
  value: string | undefined;

  props?: HTMLAttributes<HTMLButtonElement>;
}

export interface TagsListProps extends HTMLAttributes<HTMLDivElement> {
  tag?: string;
  onTagChange: (tag: string | undefined) => void;
  allowClear?: boolean;

  items: TagItem[];
}

const itemVariants = cva(
  'rounded-md border px-2 py-0.5 text-xs font-medium text-fd-muted-foreground transition-colors',
  {
    variants: {
      active: {
        true: 'bg-fd-accent text-fd-accent-foreground',
      },
    },
  }
);

export function TagsList({
  tag,
  onTagChange,
  items,
  allowClear,
  ...props
}: TagsListProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-row flex-wrap items-center gap-1',
        props.className
      )}
    >
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          data-active={tag === item.value}
          className={cn(
            itemVariants({ active: tag === item.value }),
            item.props?.className
          )}
          onClick={() => {
            if (tag === item.value && allowClear) {
              onTagChange(undefined);
            } else {
              onTagChange(item.value);
            }
          }}
          tabIndex={-1}
          {...item.props}
        >
          {item.name}
        </button>
      ))}
      {props.children}
    </div>
  );
}
