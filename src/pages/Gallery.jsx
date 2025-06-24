import React from 'react';

const galleryImages = [
  {
    id: 1,
    title: 'Campus Life',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Classroom Session',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Library',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Science Lab',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Student Activities',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Sports Events',
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80',
  },
];

const Gallery = () => {
  return (
    <div className="main-page-container flex flex-col items-center justify-center" style={{ background: '#fff8f0', minHeight: 'calc(100vh - 4rem)', height: 'calc(100vh - 4rem)', width: '100vw', maxWidth: '100vw', overflow: 'hidden', padding: 0 }}>
      <div className="w-full" style={{maxWidth:'100vw'}}>
        <h1 className="text-4xl font-bold text-orange-600 mb-12 text-center" style={{width:'100vw',maxWidth:'100vw'}}>
          Our Gallery
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                loading="lazy"
                width="384"
                height="256"
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-orange-600 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
