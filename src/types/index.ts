export interface IData {
  num_nodes: number;
  nodes: {
    id: number;
    name: string;
    lat: number;
    lng: number;
  }[];
  adj_list: number[][];
  paths: {
    lat_start: number;
    lng_start: number;
    lat_end: number;
    lng_end: number;
  }[];
}
