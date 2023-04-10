import { IData } from "@/types";

function parseData(data: string): IData {
  const lines = data.split("\n");
  const num_nodes = parseInt(lines[0]);
  const nodes: {
    id: number;
    name: string;
    lat: number;
    lng: number;
  }[] = [];
  const adj_list: number[][] = [];
  const paths: {
    lat_start: number;
    lng_start: number;
    lat_end: number;
    lng_end: number;
  }[] = [];

  for (let i = 1; i <= num_nodes; i++) {
    const line = lines[i].split(" ");
    nodes.push({
      id: i - 1,
      name: line[2],
      lat: parseFloat(line[0]),
      lng: parseFloat(line[1]),
    });
  }

  for (let i = num_nodes + 1; i < lines.length; i++) {
    const line = lines[i].split(" ");
    const row: number[] = [];
    for (let j = 0; j < line.length; j++) {
      if (parseInt(line[j]) == 1) row.push(j);

      if (j <= i - (num_nodes + 1) && parseInt(line[j]) == 1)
        paths.push({
          lat_start: nodes[i - num_nodes - 1].lat,
          lng_start: nodes[i - num_nodes - 1].lng,
          lat_end: nodes[j].lat,
          lng_end: nodes[j].lng,
        });
    }
    adj_list.push(row);
  }
  return {
    num_nodes,
    nodes,
    adj_list,
    paths,
  };
}

export default parseData;
