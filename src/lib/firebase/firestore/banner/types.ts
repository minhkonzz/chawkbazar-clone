export type CollectionBanner = {
   pos: number;
   url: string;
};

export type CollectionBannerGroup = {
   id: string;
   name: string;
   data: CollectionBanner[];
};
