import haversine from "./haversine";

function AStar(start: any, end: any, num_nodes: any, nodes:any, adj_list: any) {
  const shortestPath = [];
  let shortestDistance: number = 0;
  const visited: boolean[] = Array.from({length : num_nodes}, () => false);
  const distance: number[] = Array.from({length : num_nodes}, () => Infinity);
  const parent: number[] = Array.from({ length: num_nodes }, () => -1);
  const priorityQueue: [number, number][] = [];
  const heuristic: Map<number, number> = new Map<number, number>();

  for (const node of nodes) {
    heuristic.set(node.id, haversine(node, nodes[end]));
  }

  distance[start] = 0;
  priorityQueue.push([start, 0+heuristic.get(start.id)!]);

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a[1] - b[1]);
    const [now, _] = priorityQueue.shift()!;
    if (visited[now]) continue;
    if (now == end) break;
    visited[now] = true;

    for (const next of adj_list[now]) {
      const newDistance = distance[now] + haversine(nodes[now], nodes[next]);
      if (newDistance < distance[next]) {
        distance[next] = newDistance;
        parent[next] = now;
        priorityQueue.push([next, newDistance+heuristic.get(next.id)!]);
      }
    }
  }

  // Check if there is no path
  if(distance[end] === Infinity) throw new Error("No path found!");

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

export default AStar;
