import express, { Request, Response } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;
const apiKey = process.env.NASA_API_KEY || "";

const corsOptions = {
  origin: 'https://mach-task.vercel.app',  // Allow only your frontend domain
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Enable credentials (if necessary)
  optionsSuccessStatus: 204  // For legacy browsers
};

// Apply CORS middleware globally to all routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));  

interface NasaImage {
  date: string;
  explanation: string;
  url: string;
  title: string;
}
interface NasaImageResponse {
  date: string;
  explanation: string;
  url: string;
  title: string;
}
interface NasaImagesResponse {
  images: NasaImage[];
}
const fetchNasaImageByDate = async (date: string): Promise<NasaImage> => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
  
  );
  console.log(response)
  if (!response.ok) {
    throw new Error("Failed to fetch NASA image");
  }

  const data = (await response.json()) as NasaImage;
  return data;
};

// Function to fetch images from NASA's API
const fetchNasaImages = async (
  startDate: string,
  endDate: string
): Promise<NasaImage[]> => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
  );
  console.log(response)

  if (!response.ok) {
    throw new Error("Failed to fetch NASA images");
  }

  const data = (await response.json()) as NasaImage[]; // Cast the result to NasaImage[]
  return data;
};

// API endpoint to fetch NASA images
app.get(
  "/nasa-images",
  async (
    req: Request,
    res: Response<NasaImagesResponse | { error: string }>
  ) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Please provide both startDate and endDate" });
    }

    try {
      const images = await fetchNasaImages(
        startDate as string,
        endDate as string
      );
      res.json({ images });
    } catch (error: unknown) {
      // Ensure that error is of type Error and has a message property
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
);

app.get(
  "/nasa-image",
  async (
    req: Request,
    res: Response<NasaImageResponse | { error: string }>
  ) => {
    const { date } = req.query;
    if (typeof date !== "string") {
      return res.status(400).json({ error: "Please provide a valid date" });
    }
    try {
      const image = await fetchNasaImageByDate(date);
      res.json(image);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`NASA Images microservice running at http://localhost:${port}`);
});
