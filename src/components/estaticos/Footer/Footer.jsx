import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="col-footer">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105227.9233705569!2d-58.99930865524429!3d-34.493436907091194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9cb6643d2003%3A0xa8da0402f634b636!2sPilar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1689175001579!5m2!1ses!2sar"
            title="Mapa de ubicación"
            width="280"
            height="250"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="col-footer">
          <h5>Sobre Nosotros</h5>
          <p>
            En Mi Librería nos apasiona el conocimiento. Encontrá los mejores libros y recursos para tu desarrollo personal y profesional.
          </p>
        </div>

        <div className="col-footer">
          <h5>Enlaces</h5>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Catálogo</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div className="col-footer">
          <h5>Contacto</h5>
          <p><i className="bi bi-envelope-fill"></i> contacto@milibreria.com</p>
          <p><i className="bi bi-telephone-fill"></i> +54 11 1234 5678</p>
          <p><i className="bi bi-chat-right-text"></i> Chat en línea</p>
        </div>
      </div>

      <hr className="mb-4" />

      <div className="text-center mb-2">
        <p>&copy; 2025 - <strong>Mi Librería</strong>. Todos los derechos reservados.</p>
      </div>

      <div className="text-center">
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="text-white"><i className="bi bi-youtube"></i></a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="text-white"><i className="bi bi-discord"></i></a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="text-white"><i className="bi bi-github"></i></a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="text-white"><i className="bi bi-google"></i></a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
