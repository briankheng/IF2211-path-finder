import type { NextApiRequest, NextApiResponse } from "next";
import AStar from "@/utils/AStar";
import UCS from "@/utils/UCS";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { start, end, method, fileData } = req.body;
    const { num_nodes, nodes, adj_list, paths } = fileData;

    let result;

    // Return the shortest path and the total distance
    if (method === "A*") {
      result = AStar(start, end, num_nodes, nodes, adj_list);
    } else if (method === "UCS") {
      result = UCS(start, end, num_nodes, nodes, adj_list);
    }

    return res.status(200).json({
      shortestPath: result?.shortestPath,
      shortestDistance: result?.shortestDistance,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
