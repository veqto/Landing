'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsCollapsed(true);
  };

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden sticky top-20 z-30 mb-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-100 text-sm font-semibold text-negro"
        >
          Tabla de contenido
          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
        {!isCollapsed && (
          <div className="mt-1 bg-white rounded-xl shadow-lg border border-gray-100 p-3 max-h-64 overflow-y-auto">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={cn(
                  'block w-full text-left text-xs py-1.5 px-2 rounded transition-colors',
                  activeId === item.id ? 'text-aurora font-semibold bg-aurora/5' : 'text-gray-600 hover:text-aurora'
                )}
              >
                {i + 1}. {item.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contenido</h3>
          <nav className="space-y-0.5">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={cn(
                  'block w-full text-left text-xs py-1.5 px-3 rounded-lg transition-all',
                  activeId === item.id
                    ? 'text-aurora font-semibold bg-aurora/5 border-l-2 border-aurora'
                    : 'text-gray-500 hover:text-aurora hover:bg-gray-50'
                )}
              >
                {i + 1}. {item.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default TableOfContents;
