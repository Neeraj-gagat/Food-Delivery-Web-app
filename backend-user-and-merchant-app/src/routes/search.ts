import { Router } from "express";
import { authMiddleWare } from "../middleware";

const router = Router();

router.get("/", authMiddleWare,async(req,res) => {

  const lat = req.query.lat || '30.2410937';
  const lon = req.query.lon || '75.8426829';
  const radius = req.query.radius || '1000';
  const query = `[out:json];node["amenity"="restaurant"](around:${radius},${lat},${lon});out;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
   
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.elements);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

export const searchRouter = router;
