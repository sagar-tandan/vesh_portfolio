import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

//For Image Gallery
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";

export default function GalleryDetail() {
  const [imageUrls, setImageUrls] = useState([]); // State to hold image URLs
  const [loading, setLoading] = useState(true);
  const { folderName } = useParams(); // Extract folderName from URL parameter
  const location = useLocation(); // Extract location state

  useEffect(() => {
    // Extract imageUrls from location state if available
    const imageUrlsFromLocation = location.state && location.state.imageUrls;

    if (imageUrlsFromLocation) {
      setImageUrls(imageUrlsFromLocation);
    }
    // Simulate loading for 2 seconds
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timeout when the component unmounts or when location.state changes
    return () => clearTimeout(timeoutId);
  }, [location.state]);

  return (
    <div>
      {loading ? (
        <section className="container mx-auto flex flex-wrap items-center justify-center gap-5 mt-5">
          <InfinitySpin
            visible={loading}
            width="200"
            color="#475569"
            ariaLabel="infinity-spin-loading"
          />
        </section>
      ) : (
        <div className="max-w-screen-2xl mx-auto p-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 ">
            <LightGallery
              speed={500}
              plugins={[lgAutoplay, lgFullscreen, lgThumbnail, lgZoom]}
            >
              {imageUrls &&
                imageUrls.map((imageUrl) => (
                  <a href={imageUrl} key={imageUrl}>
                    <img
                      className="w-full rounded-sm mb-2 hover:brightness-[80%] hover:cursor-pointer hover:scale-[102%] ease-linear transition-all duration-150"
                      src={imageUrl}
                      alt="Photos"
                    />
                  </a>
                ))}
            </LightGallery>
          </div>
        </div>
      )}
      ;
    </div>
  );
}
