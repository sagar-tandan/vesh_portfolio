import React, { useState, useEffect } from "react";
import { ref as dbRef, getDatabase, onValue } from "firebase/database";
import GalleeryCard from "../components/GalleeryCard";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

//For slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Gallery() {
  //Slider Setting

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [keys, setKeys] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [folderLengths, setFolderLengths] = useState({});

  useEffect(() => {
    const fetchGalleryKeys = async () => {
      try {
        const db = getDatabase();
        const dbRef1 = dbRef(db, "Gallery/");

        onValue(dbRef1, (snapshot) => {
          let records = [];

          snapshot.forEach((childSnapshot) => {
            let keyName = childSnapshot.key;
            let data = childSnapshot.val();

            records.push({ key: keyName, data: data });
          });

          let mappedKeys = records.map((record) => record.key);
          setKeys(mappedKeys);

          const imageUrlsForKeys = {};
          const folderLengthsObj = {};

          mappedKeys.forEach((key) => {
            const data = records.find((record) => record.key === key)?.data;
            if (data) {
              const imageUrls = Object.values(data)
                .filter((imageData) => imageData.image)
                .map((imageData) => imageData.image);
              if (imageUrls.length > 0) {
                imageUrlsForKeys[key] = imageUrls;
                folderLengthsObj[key] = imageUrls.length;
              }
            }
          });

          // Set image URLs state
          setImageUrls(imageUrlsForKeys);
          setFolderLengths(folderLengthsObj);
          setLoading(false);
        });
      } catch (error) {
        toast.error("Error fetching Projects!!", {
          position: "bottom-center",
          autoClose: 4000,
        });
        setLoading(false);
      }
    };

    fetchGalleryKeys();
  }, []);

  return (
    <div className="container flex flex-col mx-auto gap-2 mt-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold font-SagarFont px-3 text-xl 2xl:text-2xl">
            Gallery
          </h1>
          <p className="font-SagarFont px-3 text-sm md:text-lg">
            Here are some memories I had created over the years :
          </p>
        </div>
      </div>
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
        <Slider
          className="bg-slate-300 container w-[95%] md:w-[100%] mx-auto"
          {...settings}
        >
          {keys.map((key) => (
            <div key={key} className="px-3 pt-1">
              <Link
                to={`/gallery/${key}`}
                state={{ imageUrls: imageUrls[key] }}
              >
                <GalleeryCard
                  folderName={key}
                  firstImage={imageUrls[key] && imageUrls[key][0]}
                  count={folderLengths[key]}
                  className="w-full"
                />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
