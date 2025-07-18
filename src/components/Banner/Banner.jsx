import Carousel from 'react-bootstrap/Carousel';
import CardBanner from './CardBanner';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = ({ productos = [] }) => {
  const slides = [
    {
      fondo: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc',
      producto: productos[0]
    },
    {
      fondo: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19',
      producto: productos[1]
    }
  ];

  return (
    <section className="banner-completo">
      <div className="banner__top-link-container">
        <Link to="/catalogo" className="banner__top-link">
          <h2>Bienvenidos a nuestra Libretia</h2>
          <p>Descubre los mejores libros y productos</p>
        </Link>
      </div>

      <Carousel fade interval={4000} indicators controls>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div
              className="banner-amplio__fondo"
              style={{ backgroundImage: `url(${slide.fondo})` }}
            >
              <div className="banner-amplio__contenido">
                {slide.producto && (
                  <div className="banner-amplio__card">
                    <CardBanner producto={slide.producto} agregarCarrito={() => {}} />
                  </div>
                )}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
