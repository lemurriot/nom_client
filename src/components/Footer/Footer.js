import React from 'react';
import './Footer.css';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer>
      <FontAwesomeIcon icon={faCopyright} />
      <a
        className="footer__link"
        href="http://pdxwebdev.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        pdxwebdev.io
      </a>
    </footer>
  );
}
