const apiURL = process.env.API_URL 
export interface NasaImage {
  date: string;
  explanation: string;
  url: string;
  title: string;
}

export interface NasaImagesResponse {
  images: NasaImage[];
}

export const fetchNasaImage = async (date: string): Promise<NasaImage> => {
  try {
    const response = await fetch(`${apiURL}/nasa-image?date=${date}`);
    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Failed to fetch NASA image: ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching NASA image:', error);
    throw error;
  }
};

export const fetchNasaImages = async (startDate: string, endDate: string): Promise<NasaImage[]> => {
    const response = await fetch(
      `${apiURL}/nasa-images?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
    );
    console.log('response', response)
    if (!response.ok) {
      throw new Error('Failed to fetch NASA images');
    }
    const data = await response.json();

    return data.images;
  };