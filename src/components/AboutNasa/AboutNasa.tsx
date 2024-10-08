import { AboutpageCollection } from "@/types/contentful";
import { LeadershipSection } from "../Leadership";
import { RichTextRenderer } from "../RichText/RichText";

const AboutNASA = ({ data }: {data:AboutpageCollection}) => {
    const aboutItem = data.aboutCollection.items[0];
    return (
      <div className="px-4 md:px-24">
       
        <h1 className="text-3xl font-bold">{aboutItem.title} 123</h1>
  
        <RichTextRenderer content={aboutItem.history.json.content} />
  
        <LeadershipSection leaders={aboutItem.leadership.leaders} />
      </div>
    );
  };
  
  export default AboutNASA;