import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useScrollManager } from '../../hooks/useScrollManager';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [scrollVisible, setScrollVisible] = useState(false);

  useEffect(() => {
    // Generate QR Code with enhanced quality and mobile optimization
    const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
    if (canvas) {
      QRCode.toCanvas(
        canvas,
        'https://msadeqsirjani.com',
        {
          width: 256, // Increased size for better scanning
          margin: 2, // Reduced margin for better use of space
          errorCorrectionLevel: 'H', // High error correction for better reliability
          color: {
            dark: '#000000', // Pure black for maximum contrast
            light: '#FFFFFF' // Pure white background
          }
        },
        (error: Error | null | undefined) => {
          if (error) {
            // Only log errors in development
            if (import.meta.env.DEV) {
              console.error('QR Code generation error:', error);
            }
            // Silently fail in production - QR code is not critical
            return;
          }

          // Add SS logo overlay in the center
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const logoSize = 60;

            // Draw white rounded rectangle background
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.roundRect(
              centerX - logoSize / 2,
              centerY - logoSize / 2,
              logoSize,
              logoSize,
              8
            );
            ctx.fill();

            // Draw border
            ctx.strokeStyle = '#0066FF';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Draw SS text
            ctx.fillStyle = '#0066FF';
            ctx.font = 'bold 32px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('SS', centerX, centerY);
          }

          const img = document.getElementById('qrcode-image') as HTMLImageElement;
          if (img && canvas) {
            img.src = canvas.toDataURL('image/png', 1.0); // Maximum quality PNG
            img.style.display = 'block';
          }
        }
      );
    }
  }, []);

  // Use centralized scroll manager
  useScrollManager((_scrollY, scrollPercent) => {
    setScrollVisible(scrollPercent >= 80);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Mohammad Sadegh Sirjani</h3>
              <p>Ph.D. Student in Computer Science</p>
              <p>University of Texas at San Antonio</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
                <li><a href="#research" onClick={(e) => scrollToSection(e, 'research')}>Research</a></li>
                <li><a href="#publications" onClick={(e) => scrollToSection(e, 'publications')}>Publications</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect & Follow</h4>
              <div className="footer-social">
                <a href="mailto:mohammadsadegh.sirjani@utsa.edu" target="_blank" rel="noopener" data-tooltip="Email">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="https://scholar.google.com/citations?user=EI5DizMAAAAJ&hl=en" target="_blank" rel="noopener" data-tooltip="Google Scholar">
                  <i className="fas fa-graduation-cap"></i>
                </a>
                <a href="https://www.linkedin.com/in/msadeqsirjani" target="_blank" rel="noopener" data-tooltip="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/msadeqsirjani" target="_blank" rel="noopener" data-tooltip="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://orcid.org/0009-0000-5146-0216" target="_blank" rel="noopener" data-tooltip="ORCID">
                  <i className="fab fa-orcid"></i>
                </a>
                <a href="https://www.researchgate.net/profile/Mohammad-Sadegh-Sirjani" target="_blank" rel="noopener" data-tooltip="ResearchGate">
                  <i className="fab fa-researchgate"></i>
                </a>
              </div>
            </div>
            <div className="footer-section qr-section">
              <h4>Quick Access</h4>
              <div className="qr-code-container">
                <canvas id="qrcode" style={{ display: 'none' }}></canvas>
                <img id="qrcode-image" alt="QR Code for https://msadeqsirjani.com" data-tooltip="Scan to visit on mobile" />
                <p className="qr-hint">Scan Me</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {currentYear} Mohammad Sadegh Sirjani. All rights reserved.</p>
            <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
      </footer>

      <button
        className={`scroll-to-top ${scrollVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-tooltip="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
};

export default Footer;
