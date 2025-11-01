import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch photo details from Lorem Picsum API
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        
        if (!response.ok) {
          throw new Error('Photo not found');
        }
        
        const data = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error('Error fetching photo details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading photo details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Photo Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/photos"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Gallery
          </button>
        </div>
      </header>

      {/* Photo Detail Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Full Size Image */}
          <div className="relative bg-gray-900">
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>

          {/* Photo Information */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Title Section */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {photo.author}'s Photography
                </h1>
                <p className="text-gray-600 text-sm">Photo ID: {photo.id}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                {/* Author Information */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Author
                  </h3>
                  <p className="text-xl font-medium text-gray-900">{photo.author}</p>
                </div>

                {/* Dimensions */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Dimensions
                  </h3>
                  <p className="text-xl font-medium text-gray-900">
                    {photo.width} × {photo.height}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {photo.description || 
                      `A stunning photograph captured by ${photo.author}. This high-quality image showcases exceptional composition and artistic vision, available through the Lorem Picsum collection.`}
                  </p>
                </div>

                {/* External Link */}
                {photo.url && (
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Source
                    </h3>
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      View on Unsplash
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 justify-end">
                <Link
                  to="/photos"
                  className="px-4 py-2 border-1 border-gray-200 text-gray-700 rounded-lg bg-gradient-to-b from-gray-20 to-gray-100 hover:from-gray-40 hover:to-gray-200 transition-all"
                >
                  Browse More Photos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetail;

