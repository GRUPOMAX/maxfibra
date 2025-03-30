import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import MobileHeader from '../Components/Mobile/MobileHeader';
import FormTrabalheConosco from '../Components/TrabalheConosco/FormTrabalheConosco';

import '../Styles/TrabalheConosco.css';

function PageTrabalheConosco() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Função que limpa o cache da página (se houver) e recarrega
  const hardRefreshManual = () => {
    if ('caches' in window) {
      caches.keys().then(names => {
        for (let name of names) {
          caches.delete(name);
        }
      });
    }
    window.location.reload(); // Recarrega após limpar cache
  };

  useEffect(() => {
    const handleKey = (e) => {
      const isCtrlR = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r';
      if (isCtrlR) {
        e.preventDefault();
        hardRefreshManual();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {isMobile ? <MobileHeader /> : <Header />}
      <div className="page-trabalhe-conosco">
        <FormTrabalheConosco onClose={() => navigate(-1)} />
      </div>
    </>
  );
}

export default PageTrabalheConosco;
