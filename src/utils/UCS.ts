import haversine from "./haversine";

function UCS(start: any, end: any, num_nodes: any, nodes: any, adj_list: any) {
  const shortestPath = [];
  let shortestDistance: number = 0;
  const visited: boolean[] = Array.from({ length: num_nodes }, () => false);
  const distance: number[] = Array.from({ length: num_nodes }, () => Infinity);
  const parent: number[] = Array.from({ length: num_nodes }, () => -1);
  const priorityQueue: [number, number][] = [];

  distance[start] = 0;
  priorityQueue.push([start, 0]);

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a[1] - b[1]);
    const [idx, _] = priorityQueue.shift()!;
    if (visited[idx]) continue;
    visited[idx] = true;

    for (const it of adj_list[idx]) {
      const newDistance = distance[idx] + haversine(nodes[idx], nodes[it]);
      if (newDistance < distance[it]) {
        distance[it] = newDistance;
        parent[it] = idx;
        priorityQueue.push([it, newDistance]);
      }
    }
  }

  let idx = end;
  while (idx != start) {
    shortestPath.push({
      id: shortestPath.length,
      lat_start: nodes[parent[idx]].lat,
      lng_start: nodes[parent[idx]].lng,
      lat_end: nodes[idx].lat,
      lng_end: nodes[idx].lng,
    });
    shortestDistance += haversine(nodes[parent[idx]], nodes[idx]);
    idx = parent[idx];
  }

  shortestDistance = Math.round(shortestDistance * 1000) / 1000000;

  return { shortestPath, shortestDistance };
}

export default UCS;
