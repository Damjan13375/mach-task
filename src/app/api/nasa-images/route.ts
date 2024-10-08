// src/app/api/nasa-images/route.ts

import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.NASA_API_KEY || "";

// Interface for NASA Image data
interface NasaImage {
  date: string;
  explanation: string;
  url: string;
  title: string;
}

// Fetch images between the start and end date
const fetchNasaImages = async (startDate: string, endDate: string): Promise<NasaImage[]> => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch NASA images");
  }

  const data = await response.json() as NasaImage[];
  return data;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json({ error: "Please provide both startDate and endDate" }, { status: 400 });
  }

  try {
    const images = await fetchNasaImages(startDate, endDate);
    return NextResponse.json({ images });
  } catch (error:any) {
    return NextResponse.json({ error: error.message || "An unknown error occurred" }, { status: 500 });
  }
}
