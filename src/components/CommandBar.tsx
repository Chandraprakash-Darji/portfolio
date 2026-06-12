import { useEffect, useRef, useState, useCallback } from 'react';
import { Command } from 'cmdk';

interface SearchItem {
  type: string;
  title: string;
  description?: string;
  categories?: string[];
  href: string;
}

const GROUPS: Record<string, string> = {
  page: 'Pages',
  post: 'Writing',
  snippet: 'Snippets',
  project: 'Projects',
};

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SearchItem[]>([]);
  const fetchedRef = useRef(false);

  const fetchItems = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    try {
      const res = await fetch('/search.json');
      const data: SearchItem[] = await res.json();
      setItems(data);
    } catch {
      // silently ignore fetch errors
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!open) fetchItems();
        setOpen(true);
      }
    };

    const handleCustomEvent = () => {
      fetchItems();
      setOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-bar', handleCustomEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-bar', handleCustomEvent);
    };
  }, [open, fetchItems]);

  const handleSelect = useCallback((href: string) => {
    setOpen(false);
    window.location.assign(href);
  }, []);

  const groupKeys = Object.keys(GROUPS);

  return (
    <>
      <style>{`
        [cmdk-overlay] {
          background: hsl(var(--background) / 0.8);
          position: fixed;
          inset: 0;
          z-index: 49;
        }
        [cmdk-dialog] {
          position: fixed;
          left: 50%;
          top: 15vh;
          transform: translateX(-50%);
          z-index: 50;
          width: 100%;
          max-width: 32rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          outline: none;
        }
        [cmdk-input] {
          width: 100%;
          border: none;
          border-bottom: 1px solid hsl(var(--border));
          background: transparent;
          padding: 0.75rem 1rem;
          font-family: var(--font-dm-sans), ui-monospace, monospace;
          font-size: 0.875rem;
          color: hsl(var(--foreground));
          outline: none;
        }
        [cmdk-input]::placeholder {
          color: hsl(var(--muted-foreground) / 0.6);
        }
        [cmdk-list] {
          max-height: 60vh;
          overflow-y: auto;
        }
        [cmdk-empty] {
          padding: 0.75rem 1rem;
          font-family: var(--font-dm-sans), ui-monospace, monospace;
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
        }
        [cmdk-group-heading] {
          padding: 0.75rem 1rem 0.25rem;
          font-family: var(--font-dm-sans), ui-monospace, monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: hsl(var(--muted-foreground));
        }
        [cmdk-item] {
          padding: 0.625rem 1rem;
          font-family: var(--font-dm-sans), ui-monospace, monospace;
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        [cmdk-item][data-selected="true"] {
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
        }
        [cmdk-item] .item-description {
          font-size: 0.6875rem;
          color: hsl(var(--muted-foreground) / 0.7);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        [cmdk-item][data-selected="true"] .item-description {
          color: hsl(var(--muted-foreground));
        }
      `}</style>
      <Command.Dialog open={open} onOpenChange={setOpen} label="Command search">
        <Command.Input placeholder="search..." />
        <Command.List>
          <Command.Empty>no results.</Command.Empty>
          {groupKeys.map((type) => {
            const groupItems = items.filter((item) => item.type === type);
            if (groupItems.length === 0) return null;
            return (
              <Command.Group key={type} heading={GROUPS[type]}>
                {groupItems.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={`${item.title} ${item.description ?? ''} ${item.categories?.join(' ') ?? ''}`}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <span>{item.title}</span>
                    {item.description && (
                      <span className="item-description">{item.description}</span>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            );
          })}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
