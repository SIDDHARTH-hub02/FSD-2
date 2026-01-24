export default function Contact() {
  return (
    <div className="page contact-page">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit" className="submit-button">Send</button>
        </form>
      </div>
    </div>
  );
}