// src/app/api/nasa-image/route.ts

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

// Fetch NASA image for a specific date
const fetchNasaImageByDate = async (date: string): Promise<NasaImage> => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch NASA image: ${response.status}`);
  }

  const data = await response.json() as NasaImage;
  return data;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Please provide a valid date" }, { status: 400 });
  }

  try {
    const image = await fetchNasaImageByDate(date);
    return NextResponse.json(image);
  } catch (error:any) {
    return NextResponse.json({ error: error.message || "An unknown error occurred" }, { status: 500 });
  }
}
