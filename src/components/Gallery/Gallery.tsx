import {useEffect, useRef, useState} from 'react';
import type {GalleryEvent, GalleryPhoto} from '../../types';
import galleryData from '../../data/gallery.json';
import './Gallery.css';

const events = galleryData as GalleryEvent[];

interface OpenPhoto {
  photos: GalleryPhoto[];
  index: number;
}

const Gallery = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<OpenPhoto | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  const step = (delta: number) =>
    setOpen(
      current =>
        current && {
          ...current,
          index:
            (current.index + delta + current.photos.length) %
            current.photos.length,
        },
    );

  const close = () => dialogRef.current?.close();

  const photo = open && open.photos[open.index];

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <h1 className="section-title page-title">Gallery</h1>
        {events.map(event => (
          <section
            key={event.id}
            className="gallery-event"
            aria-labelledby={`gallery-${event.id}`}
          >
            <header className="gallery-event-header">
              <h2 id={`gallery-${event.id}`} className="gallery-event-title">
                {event.title}
              </h2>
              <p className="gallery-event-meta">
                <span>{event.location}</span>
                <span aria-hidden="true">·</span>
                <span>{event.date}</span>
              </p>
            </header>
            <ul className="gallery-grid">
              {event.photos.map((item, index) => (
                <li key={item.src}>
                  <button
                    type="button"
                    className="gallery-thumb"
                    onClick={() => setOpen({photos: event.photos, index})}
                    aria-label={`${item.youtube ? 'Play video' : 'Open photo'}: ${item.alt}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    {item.youtube && (
                      <span className="gallery-play" aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        aria-label="Photo viewer"
        onClose={() => setOpen(null)}
        onClick={event => event.target === event.currentTarget && close()}
        onKeyDown={event => {
          if (event.key === 'ArrowRight') step(1);
          if (event.key === 'ArrowLeft') step(-1);
        }}
      >
        {open && photo && (
          <figure className="gallery-lightbox-figure">
            {photo.youtube ? (
              <iframe
                className="gallery-lightbox-video"
                src={`https://www.youtube-nocookie.com/embed/${photo.youtube}?autoplay=1&rel=0`}
                title={photo.alt}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <img src={photo.src} alt={photo.alt} />
            )}
            <figcaption>
              {photo.alt}
              <span className="gallery-lightbox-count">
                {open.index + 1} / {open.photos.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button
          type="button"
          className="gallery-lightbox-btn gallery-lightbox-close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>
        <button
          type="button"
          className="gallery-lightbox-btn gallery-lightbox-prev"
          onClick={() => step(-1)}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          type="button"
          className="gallery-lightbox-btn gallery-lightbox-next"
          onClick={() => step(1)}
          aria-label="Next photo"
        >
          ›
        </button>
      </dialog>
    </section>
  );
};

export default Gallery;
