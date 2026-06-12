import { useEffect, useRef, useState, useCallback } from 'react';
import { Command } from 'cmdk';

interface SearchItem {
  type: string;
  title: string;
  description?: string;
  categories?: string[];
  image?: string;
  href: string;
}

const GROUPS: Record<string, string> = {
  page: 'Pages',
  writings: 'Writing',
  snippets: 'Snippet',
  projects: 'Projects',
  frames: 'Frames',
};

const GROUP_KEYS = Object.keys(GROUPS);

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const fetchedRef = useRef(false);
  const filterRef = useRef<string | null>(null);

  // Keep ref in sync so event handlers always read the latest filter
  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

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

  // Keyboard shortcuts: Cmd+K to toggle, Tab to filter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!open) fetchItems();
        setOpen((prev) => !prev);
        return;
      }

      if (!open) return;

      if (e.key === 'Tab') {
        e.preventDefault();
        const selected = document.querySelector('[cmdk-item][data-selected="true"]');
        if (selected) {
          const itemType = selected.getAttribute('data-value');
          if (itemType && GROUP_KEYS.includes(itemType)) {
            setFilter((prev) => (prev === itemType ? null : itemType));
            setSearch("")
          }
        }
        return;
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

  // Intercept dialog close: if filter is active, Esc clears filter instead of closing
  const handleOpenChange = useCallback((o: boolean) => {
    if (!o && filterRef.current) {
      setFilter(null);
      return; // keep dialog open
    }
    if (!o) {
      setSearch('');
      setFilter(null);
    }
    setOpen(o);
  }, []);

  const handleSelect = useCallback((href: string) => {
    setOpen(false);
    setSearch('');
    setFilter(null);
    window.location.assign(href);
  }, []);

  const filteredItems = filter
    ? items.filter((item) => item.type === filter)
    : items;

  const groupKeys = Object.keys(GROUPS).filter((type) =>
    filteredItems.some((item) => item.type === type),
  );

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
        .frame-thumb {
          width: 48px;
          height: 36px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid hsl(var(--border) / 0.5);
          image-rendering: auto;
        }
      `}</style>
      <Command.Dialog open={open} onOpenChange={handleOpenChange} label="Command search">
        <Command.Input
          placeholder={filter ? `search ${GROUPS[filter]?.toLowerCase() ?? filter}...` : 'search...'}
          value={search}
          onValueChange={setSearch}
        />
        {filter && (
          <div className="flex items-center gap-2 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>filtered: {GROUPS[filter] ?? filter}</span>
            <button
              onClick={() => setFilter(null)}
              className="ml-auto text-muted-foreground hover:text-foreground"
              aria-label="Clear filter"
            >
              clear
            </button>
          </div>
        )}
        <Command.List>
          <Command.Empty>no results.</Command.Empty>
          {groupKeys.map((type) => {
            const groupItems = filteredItems.filter((item) => item.type === type);
            if (groupItems.length === 0) return null;
            return (
              <Command.Group key={type} heading={GROUPS[type]}>
                {groupItems.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={`${item.title} ${item.description ?? ''} ${item.categories?.join(' ') ?? ''}`}
                    onSelect={() => handleSelect(item.href)}
                    data-type={item.type}
                  >
                    {item.image ? (
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="frame-thumb" />
                        <span className="item-description">{item.description}</span>
                      </div>
                    ) : (
                      <>
                        <span>{item.title}</span>
                        {item.description && (
                          <span className="item-description">{item.description}</span>
                        )}
                      </>
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
