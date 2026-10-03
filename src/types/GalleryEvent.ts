export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface GalleryEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  photos: GalleryPhoto[];
}
