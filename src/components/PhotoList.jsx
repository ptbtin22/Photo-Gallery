import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchPhotos = async (pageNum) => {
    setLoading(true);
    try {
      // Lorem Picsum API provides photo list
      const response = await fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=12`);
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(page);
  }, [page]);

  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
        </div>
      </header>

      {/* Photo Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo, index) => {
            const isLastPhoto = photos.length === index + 1;
            return (
              <Link
                key={photo.id}
                to={`/photos/${photo.id}`}
                ref={isLastPhoto ? lastPhotoRef : null}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`https://picsum.photos/id/${photo.id}/400/400`}
                    alt={`Photo by ${photo.author}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-medium truncate">{photo.author}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {/* No More Photos Message */}
        {!hasMore && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">The end!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotoList;

