import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const BASE_URL = "https://candidate-assignment.neversitup.com/todo";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ii1PUTlkR0NBMjRROG5pMnh5N2NXIiwiaWF0IjoxNzQ3MTU2NTQ5LCJleHAiOjE3NDcyNDI5NDl9.L4rf5evnZsFPsXjFsFT76A6DTFQWiA77cZGQFl5GVsI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const url = `${BASE_URL}/${id}`;

    if (req.method === "PATCH") {
      const response = await axios.patch(url, req.body, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return res.status(200).json(response.data);
    }

    if (req.method === "DELETE") {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      return res.status(204).end();
    }

    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    res
      .status(error?.response?.status)
      .json({ message: error?.response?.data });
  }
}
