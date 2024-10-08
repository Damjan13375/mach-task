import { HomepageCollection } from "@/types/contentful";
import { client } from "../gql";

export const fetchHomepageContent = async (): Promise<HomepageCollection | undefined> => {
  const query = `
    query {
      homePageCollection {
        items {
          title
          description
          bannerUrl
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    return data as HomepageCollection;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return undefined; // Return undefined in case of an error
  }
};
