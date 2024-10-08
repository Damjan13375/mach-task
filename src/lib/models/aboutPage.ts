import { AboutpageCollection } from "@/types/contentful";
import { client } from "../gql";

export const fetchAboutPage = async (): Promise<
  AboutpageCollection | undefined
> => {
  const query = `
      query {
          aboutCollection{
              items{
                  title
                  history {
                    json 
                  }
                  leadership
                  banner
                  desc
              }
          }
      }
  `;

  try {
    const data = await client.request(query);
    return data as AboutpageCollection;
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return undefined; // Return undefined in case of an error
  }
};
