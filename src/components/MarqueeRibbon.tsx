export function MarqueeRibbon() {
  const items = [
    'karya pilihan',
    'rekayasa perangkat lunak',
    'antarmuka web modern',
    'sistem informasi',
    'teknik informatika',
    'desain terstruktur',
  ];

  const segment = items.join('  ·  ') + '  ·  ';

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-blue-900 bg-blue-950 py-3.5 select-none"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap text-xs font-medium tracking-wider text-blue-200">
        <span>{segment}</span>
        <span>{segment}</span>
        <span>{segment}</span>
        <span>{segment}</span>
      </div>
    </div>
  );
}
