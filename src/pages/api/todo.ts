import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = "https://candidate-assignment.neversitup.com/todo";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ii1PUTlkR0NBMjRROG5pMnh5N2NXIiwiaWF0IjoxNzQ3MTU2NTQ5LCJleHAiOjE3NDcyNDI5NDl9.L4rf5evnZsFPsXjFsFT76A6DTFQWiA77cZGQFl5GVsI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      return res.status(200).json(response.data);
    }

    if (req.method === "POST") {
      const response = await axios.post(API_URL, req.body, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return res.status(200).json(response.data);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    const status = error.response?.status;
    const message = error.response?.data;
    return res.status(status).json({ message });
  }
}
