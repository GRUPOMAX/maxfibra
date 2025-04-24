import React, { useEffect, useState } from 'react';
import getBanners from '../Services/bannersService';
import '../Styles/BannerSlider.css';

function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBanners, setSelectedBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await getBanners();
      setBanners(data);
      selectBanners(data);
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    selectBanners(banners);
  }, [banners]);

  // Função para selecionar imagens baseadas na resolução da tela
  const selectBanners = (data) => {
    if (!data || data.length === 0) return;

    const width = window.innerWidth;
    let images = [];

    data.forEach((banner) => {
      if (banner) {
        let selectedImage = null;

        if (width >= 3840 && banner['Banners-4K']) {
          selectedImage = banner['Banners-4K'];
        } else if (width >= 2560 && banner['Banners-2K']) {
          selectedImage = banner['Banners-2K'];
        } else if (width >= 1080 && banner['Banners-1080P']) {
          selectedImage = banner['Banners-1080P'];
        } else if (width < 1080 && banner['Banners-Mobile']) {
          selectedImage = banner['Banners-Mobile'];
        }

        if (selectedImage) {
          images.push(selectedImage);
        }
      }
    });

    setSelectedBanners(images);
  };

  // Auto slide a cada 10 segundos
  useEffect(() => {
    if (selectedBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === selectedBanners.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [selectedBanners]);

  // **Se não houver banners para essa resolução, não renderiza nada**
  if (selectedBanners.length === 0) return null;

  return (
    <div className="banner-slider">
      <img src={selectedBanners[currentIndex]} alt={`Slide ${currentIndex}`} className="banner-image" />

      {/* Exibir setas apenas se houver mais de uma imagem para essa resolução */}
      {selectedBanners.length > 1 && (
        <>
          <button className="prev" onClick={() => setCurrentIndex(currentIndex === 0 ? selectedBanners.length - 1 : currentIndex - 1)}>‹</button>
          <button className="next" onClick={() => setCurrentIndex((currentIndex + 1) % selectedBanners.length)}>›</button>

          {/* Indicadores de slide */}
          <div className="dots">
            {selectedBanners.map((_, index) => (
              <span key={index} className={currentIndex === index ? 'dot active' : 'dot'} onClick={() => setCurrentIndex(index)}></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BannerSlider;
