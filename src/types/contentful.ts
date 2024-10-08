
export interface Homepage {
  title: string;
  description: string;
  bannerUrl: string;
}

export interface HomepageCollection {
  homePageCollection: {
    items: Homepage[];
  };
}

export interface AboutPage {
  title: string;
  desc: string;
  banner: string;
    history: {
      json:{
        content: any
      }
    };
  leadership: {
    leaders: {
      name: string;
      image: string;
      desc: string;
    }[];
  };
}

export interface AboutpageCollection {
  aboutCollection: {
    items: AboutPage[];
  };
}
