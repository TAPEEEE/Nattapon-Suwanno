type Portal = { location: number; destination: number };

function quickestPath({
  portals,
}: {
  portals: { location: number; destination: number }[];
}): number {
  const goal = 200;
  const maxStep = 11;

  const warp = new Map<number, number>();
  for (const { location, destination } of portals) {
    warp.set(location, destination);
  }

  const checkedPosition = new Set<number>();
  const queue: { position: number; turns: number }[] = [
    { position: 1, turns: 0 },
  ];

  while (queue.length > 0) {
    const { position, turns } = queue.shift()!;
    if (position === goal) return turns;
    if (checkedPosition.has(position)) continue;
    checkedPosition.add(position);

    for (let step = 1; step <= maxStep; step++) {
      let next = position + step;
      if (next > goal) continue;

      while (warp.has(next)) {
        next = warp.get(next)!;
      }

      if (!checkedPosition.has(next)) {
        queue.push({ position: next, turns: turns + 1 });
      }
    }
  }

  return -1;
}

const portals = [
  { location: 55, destination: 38 },
  { location: 14, destination: 35 },
  { location: 91, destination: 48 },
  { location: 30, destination: 8 },
  { location: 31, destination: 70 },
  { location: 63, destination: 83 },
  { location: 3, destination: 39 },
  { location: 47, destination: 86 },
  { location: 71, destination: 93 },
  { location: 21, destination: 4 },
  { location: 44, destination: 65 },
  { location: 96, destination: 66 },
  { location: 79, destination: 42 },
  { location: 87, destination: 54 },
  { location: 90, destination: 119 },
  { location: 120, destination: 149 },
  { location: 150, destination: 179 },
  { location: 180, destination: 200 },
];

console.log(quickestPath({ portals }));
