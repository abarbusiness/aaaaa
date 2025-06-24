import React, { useState } from 'react';

const orange = '#ea580c';
const orangeAccent = '#fb923c';
const orangeLight = '#fff7ed';
const fontFamily = 'Inter, Segoe UI, Arial, sans-serif';

export default function JoinUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would send the form data to your backend or email service
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily, background: `linear-gradient(135deg, ${orangeLight} 0%, ${orangeAccent} 100%)`, minHeight: '100vh', color: orange }}>
      {/* HERO */}
      <section style={{
        width: '100%',
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(120deg, ${orangeAccent} 0%, ${orangeLight} 100%)`,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        boxShadow: `0 4px 32px ${orangeAccent}33`,
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 16px 36px 16px',
      }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, margin: 0, color: orange, textShadow: '2px 5px 0 #fff', letterSpacing: 1 }}>Join Vardaan Learning Institute</h1>
        <p style={{ fontSize: 22, margin: '18px 0 0 0', color: orange, fontWeight: 500, textAlign: 'center', maxWidth: 700 }}>
          Become part of a vibrant learning community. Whether you're a student, parent, or educator, Vardaan welcomes you!
        </p>
        <div style={{ display: 'flex', gap: 18, marginTop: 34, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://wa.me/+919508841336" target="_blank" rel="noopener noreferrer" style={{ background: orange, color: '#fff', fontWeight: 'bold', padding: '14px 34px', borderRadius: 40, fontSize: 20, boxShadow: `0 2px 8px ${orangeAccent}22`, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span role="img" aria-label="WhatsApp">💬</span> WhatsApp Us
          </a>
          <a href="tel:+919508841336" style={{ background: orangeAccent, color: '#fff', fontWeight: 'bold', padding: '14px 34px', borderRadius: 40, fontSize: 20, boxShadow: `0 2px 8px ${orangeAccent}22`, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span role="img" aria-label="Call">📞</span> Call Us
          </a>
        </div>
      </section>

      {/* JOIN AS OPTIONS */}
      <section style={{ width: '100%', margin: '48px 0 0 0', padding: '0 4vw' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, color: orange, textAlign: 'center', letterSpacing: 0.5 }}>Join As</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'stretch', width: '100%' }}>
          <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 26, boxShadow: `0 2px 14px ${orangeAccent}22`, minWidth: 220, maxWidth: 280, padding: 32, textAlign: 'center', fontWeight: 600, color: orange }}>
            <div style={{ fontSize: 38, marginBottom: 8 }}>👩‍🎓</div>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Student</div>
            <div style={{ fontSize: 15, color: orangeAccent }}>Get guidance, resources, and mentorship for academic success.</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 26, boxShadow: `0 2px 14px ${orangeAccent}22`, minWidth: 220, maxWidth: 280, padding: 32, textAlign: 'center', fontWeight: 600, color: orange }}>
            <div style={{ fontSize: 38, marginBottom: 8 }}>👨‍👩‍👧‍👦</div>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Parent</div>
            <div style={{ fontSize: 15, color: orangeAccent }}>Support your child's learning journey with Vardaan.</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 26, boxShadow: `0 2px 14px ${orangeAccent}22`, minWidth: 220, maxWidth: 280, padding: 32, textAlign: 'center', fontWeight: 600, color: orange }}>
            <div style={{ fontSize: 38, marginBottom: 8 }}>👩‍🏫</div>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>Teacher</div>
            <div style={{ fontSize: 15, color: orangeAccent }}>Join our team and inspire the next generation.</div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section style={{ width: '100%', margin: '56px 0 0 0', padding: '0 4vw' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20, color: orange, textAlign: 'center', letterSpacing: 0.5 }}>Contact Us</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 30, boxShadow: `0 4px 18px ${orangeAccent}22`, padding: '36px 28px', maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {submitted ? (
              <div style={{ color: orange, fontWeight: 700, fontSize: 20, textAlign: 'center', margin: '18px 0' }}>
                Thank you for reaching out! We will contact you soon.
              </div>
            ) : (
              <>
                <input type="text" name="name" required placeholder="Your Name" value={form.name} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: 10, border: `1px solid ${orangeAccent}`, fontSize: 17, marginBottom: 2 }} />
                <input type="email" name="email" required placeholder="Email Address" value={form.email} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: 10, border: `1px solid ${orangeAccent}`, fontSize: 17, marginBottom: 2 }} />
                <input type="tel" name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: 10, border: `1px solid ${orangeAccent}`, fontSize: 17, marginBottom: 2 }} />
                <select name="role" required value={form.role} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: 10, border: `1px solid ${orangeAccent}`, fontSize: 17, marginBottom: 2 }}>
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="teacher">Teacher</option>
                </select>
                <textarea name="message" required placeholder="Your Message" value={form.message} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: 10, border: `1px solid ${orangeAccent}`, fontSize: 17, minHeight: 80, marginBottom: 2 }} />
                <button type="submit" style={{ background: orange, color: '#fff', fontWeight: 700, border: 'none', borderRadius: 12, padding: '14px 0', fontSize: 18, marginTop: 10, cursor: 'pointer', boxShadow: `0 2px 8px ${orangeAccent}22` }}>Send Message</button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* SOCIAL & CONTACT LINKS */}
      <section style={{ width: '100%', margin: '48px 0 0 0', textAlign: 'center', fontSize: 18, color: orangeDark }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 8 }}>
          <a href="mailto:vardaanlearninginstitute@gmail.com" style={{ color: orange, textDecoration: 'none', fontWeight: 700 }}><span role="img" aria-label="Mail">✉️</span> vardaanlearninginstitute@gmail.com</a>
          <a href="https://www.instagram.com/vardaanlearning" target="_blank" rel="noopener noreferrer" style={{ color: orange, textDecoration: 'none', fontWeight: 700 }}><span role="img" aria-label="Instagram">📸</span> Instagram</a>
          <a href="https://www.facebook.com/vardaanlearning" target="_blank" rel="noopener noreferrer" style={{ color: orange, textDecoration: 'none', fontWeight: 700 }}><span role="img" aria-label="Facebook">📘</span> Facebook</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: 48, background: orange, color: '#fff', textAlign: 'center', padding: '24px 0', borderRadius: '30px 30px 0 0', fontWeight: 600, fontSize: '1.1rem', letterSpacing: 0.5, boxShadow: `0 -2px 10px ${orangeAccent}22`, fontFamily }}>
        © {new Date().getFullYear()} Vardaan Learning Institute
      </footer>
    </div>
  );
}
