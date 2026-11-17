import { useEffect, useState } from 'react'
import './App.css'

const initialServices = [
  { number: '01', category: 'CHĂM SÓC DA', name: 'Nghi thức tái sinh', description: 'Thanh lọc dịu nhẹ, cấp ẩm sâu và đánh thức vẻ rạng rỡ tự nhiên của làn da.', duration: '75 phút', price: '1.250.000', image: 'photo-1570172619644-dfd03ed5d881', process: 'Làm sạch kép · Tẩy tế bào chết enzyme · Massage nâng cơ · Mặt nạ cấp ẩm · Khóa dưỡng chất', benefit: 'Làn da ẩm mượt, đều màu và thư thái hơn sau liệu trình.' },
  { number: '02', category: 'MASSAGE TRỊ LIỆU', name: 'Chạm an yên', description: 'Liệu pháp thư giãn toàn thân với tinh dầu thảo mộc và nhịp chạm chậm rãi.', duration: '90 phút', price: '1.650.000', image: 'photo-1540555700478-4be289fbecef', process: 'Ngâm chân thảo mộc · Chọn tinh dầu · Massage toàn thân · Chườm ấm thư giãn', benefit: 'Giải tỏa căng cơ, giúp cơ thể thả lỏng và tìm lại nhịp nghỉ ngơi.' },
  { number: '03', category: 'CHĂM SÓC TÓC', name: 'Dưỡng sinh da đầu', description: 'Làm sạch, nuôi dưỡng chân tóc và thả lỏng tâm trí qua từng chuyển động.', duration: '60 phút', price: '890.000', image: 'photo-1562322140-8baeececf3df', process: 'Soi da đầu · Làm sạch thảo mộc · Massage bấm huyệt · Ủ dưỡng và sấy thư giãn', benefit: 'Da đầu sạch thoáng, mái tóc mềm mượt và tinh thần nhẹ nhõm.' },
]

const initialGallery = [
  { image: 'photo-1600334129128-685c5582fd35', alt: 'Không gian spa tĩnh lặng với ánh sáng tự nhiên', title: 'Một khoảng lặng giữa phố' },
  { image: 'photo-1544161515-4ab6ce6db874', alt: 'Nghi thức chăm sóc cơ thể với tinh dầu', title: 'Nghi thức chạm an yên' },
  { image: 'photo-1608248543803-ba4f8c70ae0b', alt: 'Sản phẩm chăm sóc da từ thành phần thiên nhiên', title: 'Lành tính từ thiên nhiên' },
]

const imageUrl = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function Arrow({ diagonal = false }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" className={diagonal ? 'arrow-icon diagonal' : 'arrow-icon'} fill="none"><path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3 10h13M10 4l6 6-6 6'} stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [services, setServices] = useState(initialServices)
  const [gallery, setGallery] = useState(initialGallery)
  const [requests, setRequests] = useState([])
  const [requestSent, setRequestSent] = useState(false)
  const [siteContent, setSiteContent] = useState({ title: 'Nơi vẻ đẹp', accent: 'được thở.', description: 'Một khoảng lặng để trở về với chính mình — qua những nghi thức chăm sóc đầy nâng niu.' })

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [adminOpen])

  const closeMenu = () => setMenuOpen(false)

  const saveRequest = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setRequests((current) => [{
      id: Date.now(),
      name: formData.get('Họ tên'),
      phone: formData.get('Số điện thoại'),
      service: formData.get('Dịch vụ'),
      note: formData.get('Lời nhắn') || '—',
      status: 'Mới',
    }, ...current])
    event.currentTarget.reset()
    setRequestSent(true)
  }

  if (adminOpen) {
    return <AdminDashboard services={services} setServices={setServices} gallery={gallery} setGallery={setGallery} requests={requests} setRequests={setRequests} siteContent={siteContent} setSiteContent={setSiteContent} onExit={() => setAdminOpen(false)} />
  }

  return (
    <main>
      <div className="announcement"><span>MAISON SEREIN · SAIGON</span><span>Thứ Hai — Chủ Nhật, 09:00 — 20:00</span><a href="tel:+842838220909">+84 28 3822 0909</a></div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Maison Serein — về đầu trang"><span className="wordmark-main">maison serein</span><span className="wordmark-sub">A HOUSE OF QUIET BEAUTY</span></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        <nav className={menuOpen ? 'main-nav menu-open' : 'main-nav'} aria-label="Điều hướng chính">
          <a href="#story" onClick={closeMenu}>Câu chuyện</a><a href="#services" onClick={closeMenu}>Dịch vụ</a><a href="#space" onClick={closeMenu}>Không gian</a><a href="#team" onClick={closeMenu}>Chuyên viên</a>
          <a className="nav-booking" href="#contact" onClick={closeMenu}>Đặt lịch tư vấn <Arrow diagonal /></a>
          <button className="nav-admin" onClick={() => { closeMenu(); setAdminOpen(true) }}>Admin demo <span>{requests.length}</span></button>
        </nav>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-image" role="img" aria-label="Không gian nghỉ dưỡng yên bình trong ánh nắng ban mai" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> WELLNESS · BEAUTY · RITUAL</p>
          <h1 id="hero-title">{siteContent.title}<br /><em>{siteContent.accent}</em></h1>
          <p className="hero-copy">{siteContent.description}</p>
          <a className="button button-light" href="#services">Khám phá nghi thức <Arrow /></a>
        </div>
        <div className="hero-caption"><span>01 / 04</span><span className="caption-rule" /><span>THE ART OF SLOW BEAUTY</span></div>
        <a href="#story" className="scroll-cue"><span>CUỘN ĐỂ KHÁM PHÁ</span><span className="scroll-line" /></a>
        <div className="hero-stamp"><span>SAIGON</span><span className="stamp-star">✳</span><span>EST. 2018</span></div>
      </section>

      <section className="intro-section section-pad" id="story" data-reveal>
        <div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>MAISON SEREIN</span></div>
        <div className="intro-grid">
          <h2>Một vẻ đẹp<br />không cần <em>vội.</em></h2>
          <div className="intro-copy"><p className="lead">Chúng tôi tin chăm sóc bản thân là một nghệ thuật — bắt đầu bằng việc lắng nghe.</p><p>Từ những nguyên liệu lành tính được tuyển chọn, đến bàn tay của chuyên viên giàu kinh nghiệm, mỗi trải nghiệm tại Maison Serein đều được tạo nên để bạn tìm thấy nhịp điệu dịu dàng của riêng mình.</p><a className="text-link" href="#team">Về chúng tôi <Arrow /></a></div>
        </div>
        <div className="intro-details"><span>01 / TĨNH TẠI</span><span>02 / THỦ CÔNG</span><span>03 / CÁ NHÂN HÓA</span><span>AN OASIS IN THE CITY</span></div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="section-heading" data-reveal><div><div className="section-kicker"><span>02</span><span className="kicker-rule" /><span>THE RITUALS</span></div><h2>Nghi thức <em>của bạn.</em></h2></div><p>Mỗi liệu trình bắt đầu bằng một cuộc trò chuyện.<br />Để chúng tôi hiểu điều bạn cần hôm nay.</p></div>
        <div className="service-grid">
          {services.map((service) => <article className="service-card" key={service.number} data-reveal>
            <a className="service-image-wrap" href="#contact" aria-label={`Tìm hiểu ${service.name}`}><img src={imageUrl(service.image, 900)} alt={service.name} loading="lazy" /><span className="image-arrow"><Arrow diagonal /></span><span className="service-index">{service.number}</span></a>
            <div className="service-meta"><span>{service.category}</span><span>{service.duration}</span></div>
            <h3>{service.name}</h3><p>{service.description}</p>
            <div className="service-footer"><span>Từ <strong>{service.price}₫</strong></span><a href="#contact" aria-label={`Đặt lịch ${service.name}`}><Arrow /></a></div>
            <details className="service-details"><summary>Quy trình & lợi ích <span>+</span></summary><p><strong>Quy trình</strong>{service.process}</p><p><strong>Lợi ích</strong>{service.benefit}</p></details>
          </article>)}
        </div>
        <div className="services-bottom"><span>Liệu trình được thiết kế riêng sau khi tư vấn.</span><a className="text-link" href="#contact">Xem toàn bộ bảng giá <Arrow /></a></div>
      </section>

      <section className="quote-band" data-reveal><div className="quote-mark">“</div><blockquote>Chậm lại một nhịp.<br /><em>Lắng nghe điều làn da kể.</em></blockquote><div className="quote-credit"><span className="quote-rule" /> SEREIN SIGNATURE PHILOSOPHY</div><div className="quote-image" role="img" aria-label="Bàn tay chuyên viên nâng niu trong liệu trình chăm sóc da" /></section>

      <section className="space-section section-pad" id="space">
        <div className="section-heading" data-reveal><div><div className="section-kicker"><span>03</span><span className="kicker-rule" /><span>THE SPACE</span></div><h2>Chạm vào<br /><em>khoảng lặng.</em></h2></div><div className="space-heading-copy"><p>Một ngôi nhà nhỏ giữa lòng thành phố, nơi ánh sáng, hương thơm và sự tĩnh lặng cùng đón bạn trở về.</p><a className="text-link" href="#contact">Ghé thăm chúng tôi <Arrow /></a></div></div>
        <div className="gallery-grid">{gallery.map((item, i) => <figure className={`gallery-item gallery-item-${i + 1}`} key={item.image} data-reveal><img src={imageUrl(item.image, 1000)} alt={item.alt} loading="lazy" /><figcaption><span>0{i + 1}</span>{item.title}</figcaption></figure>)}</div>
      </section>

      <section className="team-section" id="team">
        <div className="team-photo" role="img" aria-label="Chuyên viên chăm sóc sắc đẹp tại Maison Serein" />
        <div className="team-content" data-reveal><div className="section-kicker"><span>04</span><span className="kicker-rule" /><span>OUR PEOPLE</span></div><h2>Đôi tay<br />biết <em>lắng nghe.</em></h2><p>Đội ngũ chuyên viên của Maison Serein được đào tạo bài bản, giàu kinh nghiệm và luôn đặt sự thoải mái của bạn lên trước tiên.</p><div className="team-note"><span className="team-note-number">08+</span><span>NĂM KINH NGHIỆM<br />CHĂM SÓC CÁ NHÂN</span></div><a className="text-link" href="#contact">Gặp gỡ đội ngũ <Arrow /></a></div>
      </section>

      <section className="testimonial-section section-pad" data-reveal><div className="section-kicker"><span>05</span><span className="kicker-rule" /><span>KIND WORDS</span></div><div className="testimonial-stars" aria-label="5 trên 5 sao">★★★★★</div><blockquote>“Mỗi lần đến đây, mình có cảm giác như được tắt tiếng cả thành phố. Không gian đẹp, chuyên viên tận tâm — một khoảng thời gian thật sự dành riêng cho mình.”</blockquote><div className="testimonial-author"><span className="author-line" /><span>MINH ANH</span><span className="author-dot">·</span><span>KHÁCH HÀNG THÂN THIẾT</span></div><div className="testimonial-count">01 <span /> 03</div></section>

      <section className="contact-section" id="contact">
        <div className="contact-info" data-reveal><div className="section-kicker"><span>06</span><span className="kicker-rule" /><span>YOUR MOMENT</span></div><h2>Một chút thời gian<br /><em>cho riêng bạn.</em></h2><p>Để lại lời nhắn, chúng tôi sẽ liên hệ để cùng tìm ra liệu trình phù hợp nhất.</p><div className="contact-details"><div><span>ĐỊA CHỈ</span><p>12 Nguyễn Siêu, Bến Nghé<br />Quận 1, Thành phố Hồ Chí Minh</p></div><div><span>GIỜ MỞ CỬA</span><p>Mỗi ngày · 09:00 — 20:00</p></div><div><span>LIÊN HỆ</span><p><a href="tel:+842838220909">+84 28 3822 0909</a><br /><a href="mailto:hello@maisonserein.vn">hello@maisonserein.vn</a></p></div></div><a className="map-link" href="https://maps.google.com/?q=12+Nguyen+Sieu+Ben+Nghe+District+1+Ho+Chi+Minh+City" target="_blank" rel="noreferrer">Chỉ đường đến Maison Serein <Arrow diagonal /></a></div>
        <form className="booking-form" onSubmit={saveRequest} data-reveal>
          <div className="form-heading"><span>ĐẶT LỊCH TƯ VẤN</span><span>01 — 03</span></div>
          <label htmlFor="full-name">Tên của bạn</label><input id="full-name" name="Họ tên" type="text" placeholder="Nguyễn Minh Anh" autoComplete="name" required />
          <div className="form-row"><div><label htmlFor="phone">Số điện thoại</label><input id="phone" name="Số điện thoại" type="tel" placeholder="+84" autoComplete="tel" required /></div><div><label htmlFor="service">Bạn quan tâm</label><select id="service" name="Dịch vụ" defaultValue=""><option value="" disabled>Chọn liệu trình</option><option>Chăm sóc da</option><option>Massage trị liệu</option><option>Chăm sóc tóc</option><option>Tư vấn cùng chuyên viên</option></select></div></div>
          <label htmlFor="note">Lời nhắn <span>(không bắt buộc)</span></label><textarea id="note" name="Lời nhắn" rows="2" placeholder="Chia sẻ với chúng tôi điều bạn đang tìm kiếm…" />
          <button className="button button-dark" type="submit">Gửi lời nhắn <Arrow /></button><p className="form-note" role="status">{requestSent ? 'Đã nhận lời nhắn! Bạn có thể xem yêu cầu trong Admin demo.' : <>Yêu cầu demo sẽ lưu tại Admin demo trong phiên này.<br />Chưa bao gồm kiểm tra lịch trống hoặc gửi email thật.</>}</p>
        </form>
        <div className="contact-map" role="img" aria-label="Bản đồ khu vực Maison Serein tại Quận 1, thành phố Hồ Chí Minh"><div className="map-grid-lines"/><div className="map-label map-label-one">ĐỒNG KHỞI</div><div className="map-label map-label-two">NGUYỄN SIÊU</div><div className="map-road road-one"/><div className="map-road road-two"/><div className="map-road road-three"/><div className="map-pin"><span>✳</span></div><div className="map-place">MAISON SEREIN <span>Q.1 · SAIGON</span></div><span className="map-coordinates">10°46'47.0"N&nbsp; 106°42'10.0"E</span></div>
      </section>

      <footer className="site-footer"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-main">maison serein</span><span className="wordmark-sub">A HOUSE OF QUIET BEAUTY</span></a><span className="footer-motto">BEAUTY, AT YOUR OWN PACE.</span><div className="footer-links"><a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM <Arrow diagonal /></a><a href="mailto:hello@maisonserein.vn">EMAIL <Arrow diagonal /></a><button onClick={() => setAdminOpen(true)}>ADMIN DEMO <Arrow diagonal /></button></div><span className="copyright">© 2025 MAISON SEREIN · SAIGON, VIETNAM</span></footer>
    </main>
  )
}

function AdminDashboard({ services, setServices, gallery, setGallery, requests, setRequests, siteContent, setSiteContent, onExit }) {
  const [section, setSection] = useState('overview')
  const [notice, setNotice] = useState('')
  const updateService = (id, key, value) => setServices((items) => items.map((item) => (item.id || item.number) === id ? { ...item, [key]: value } : item))
  const saveNotice = () => { setNotice('Đã lưu thay đổi vào phiên demo.'); window.setTimeout(() => setNotice(''), 2600) }
  const addService = () => setServices((items) => [...items, { id: Date.now(), number: String(items.length + 1).padStart(2, '0'), category: 'DỊCH VỤ MỚI', name: 'Liệu trình mới', description: 'Mô tả ngắn về liệu trình.', duration: '60 phút', price: '950.000', image: 'photo-1570172619644-dfd03ed5d881', process: 'Tư vấn · Chăm sóc · Thư giãn', benefit: 'Được thiết kế riêng cho bạn.' }])
  const sections = [['overview', 'Tổng quan'], ['services', 'Dịch vụ & giá'], ['gallery', 'Thư viện ảnh'], ['requests', 'Yêu cầu tư vấn']]
  const sectionName = sections.find(([key]) => key === section)?.[1]

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="wordmark admin-wordmark" href="#" onClick={(event) => { event.preventDefault(); onExit() }}><span className="wordmark-main">maison serein</span><span className="wordmark-sub">ADMIN STUDIO</span></a>
        <div className="admin-workspace"><span className="workspace-avatar">MS</span><span>Maison Serein<small>Không gian quản trị</small></span></div>
        <p className="admin-nav-label">QUẢN LÝ DEMO</p>
        <nav className="admin-nav" aria-label="Khu vực quản trị">{sections.map(([key, label]) => <button key={key} className={section === key ? 'active' : ''} onClick={() => setSection(key)}>{label}{key === 'requests' && requests.length > 0 && <b>{requests.length}</b>}</button>)}</nav>
        <div className="admin-sidebar-bottom"><span className="admin-status-dot" /> Dữ liệu lưu trong phiên</div>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar"><div><span className="admin-breadcrumb">Maison Serein</span><span className="breadcrumb-slash">/</span><strong>{sectionName}</strong></div><div className="admin-top-actions"><span className="admin-demo-pill">DEMO</span><button className="admin-view-site" onClick={onExit}>← Xem website</button></div></header>
        <div className="admin-content">
          {notice && <div className="admin-toast" role="status">{notice}</div>}
          {section === 'overview' && <>
            <div className="admin-page-title"><div><p className="admin-eyebrow">MAISON SEREIN · STUDIO</p><h1>Tổng quan</h1><p>Quản lý nội dung và yêu cầu tư vấn của khách hàng.</p></div><button className="admin-primary" onClick={() => setSection('requests')}>Xem yêu cầu ({requests.length})</button></div>
            <div className="admin-stats"><article><span>YÊU CẦU TƯ VẤN</span><strong>{requests.length}</strong><small>{requests.length ? 'Được gửi từ form demo' : 'Chưa có yêu cầu mới'}</small></article><article><span>DỊCH VỤ HIỂN THỊ</span><strong>{services.length}</strong><small>Đang hiển thị trên website</small></article><article><span>ẢNH TRONG GALLERY</span><strong>{gallery.length}</strong><small>Đang hiển thị công khai</small></article></div>
            <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Nội dung hero</h2><p>Chỉnh sửa tiêu đề và mô tả trang chủ.</p></div><span className="admin-live-tag">CẬP NHẬT TỨC THÌ</span></div><div className="admin-fields-two"><label>Tiêu đề<input value={siteContent.title} onChange={(event) => setSiteContent({ ...siteContent, title: event.target.value })} /></label><label>Dòng nhấn<input value={siteContent.accent} onChange={(event) => setSiteContent({ ...siteContent, accent: event.target.value })} /></label></div><label>Mô tả<textarea value={siteContent.description} onChange={(event) => setSiteContent({ ...siteContent, description: event.target.value })} rows="2" /></label><button className="admin-primary" onClick={saveNotice}>Lưu nội dung</button></section>
            <section className="admin-panel admin-recent"><div className="admin-panel-heading"><div><h2>Yêu cầu gần đây</h2><p>Form tư vấn được gửi sẽ xuất hiện tại đây.</p></div><button className="admin-text-button" onClick={() => setSection('requests')}>Xem tất cả →</button></div>{requests.length ? requests.slice(0, 4).map((request) => <div className="admin-mini-request" key={request.id}><span className="request-avatar">{request.name?.slice(0, 1) || 'K'}</span><span><strong>{request.name}</strong><small>{request.service} · {request.phone}</small></span><i>{request.status}</i></div>) : <div className="admin-empty-inline">Chưa có yêu cầu. Hãy gửi thử form tư vấn trên website.</div>}</section>
          </>}
          {section === 'services' && <><div className="admin-page-title"><div><p className="admin-eyebrow">NỘI DUNG WEBSITE</p><h1>Dịch vụ & bảng giá</h1><p>Chỉnh sửa dịch vụ đang hiển thị ngoài website.</p></div><button className="admin-primary" onClick={() => { addService(); saveNotice() }}>+ Thêm dịch vụ</button></div><div className="admin-edit-list">{services.map((service) => <article className="admin-edit-card" key={service.id || service.number}><img src={imageUrl(service.image, 300)} alt="" /><div className="admin-edit-fields"><label>Tên dịch vụ<input value={service.name} onChange={(event) => updateService(service.id || service.number, 'name', event.target.value)} /></label><label>Danh mục<input value={service.category} onChange={(event) => updateService(service.id || service.number, 'category', event.target.value)} /></label><label>Giá từ (₫)<input value={service.price} onChange={(event) => updateService(service.id || service.number, 'price', event.target.value)} /></label><label>Thời lượng<input value={service.duration} onChange={(event) => updateService(service.id || service.number, 'duration', event.target.value)} /></label><label className="admin-wide-field">Mô tả<textarea value={service.description} onChange={(event) => updateService(service.id || service.number, 'description', event.target.value)} rows="2" /></label></div><button className="admin-delete" aria-label="Xóa dịch vụ" onClick={() => setServices((items) => items.filter((item) => (item.id || item.number) !== (service.id || service.number)))}>Xóa</button></article>)}</div><button className="admin-primary save-changes" onClick={saveNotice}>Lưu thay đổi</button></>}
          {section === 'gallery' && <><div className="admin-page-title"><div><p className="admin-eyebrow">HÌNH ẢNH THƯƠNG HIỆU</p><h1>Thư viện ảnh</h1><p>Cập nhật ảnh và chú thích trên website.</p></div><button className="admin-primary" onClick={() => { setGallery((items) => [...items, { image: 'photo-1540555700478-4be289fbecef', alt: 'Không gian Maison Serein', title: 'Khoảnh khắc tại Serein' }]); saveNotice() }}>+ Thêm ảnh</button></div><div className="admin-gallery-list">{gallery.map((item, index) => <article key={index}><img src={imageUrl(item.image, 500)} alt="" /><div><label>Tiêu đề<input value={item.title} onChange={(event) => setGallery((items) => items.map((entry, i) => i === index ? { ...entry, title: event.target.value } : entry))} /></label><label>Mã ảnh Unsplash<input value={item.image} onChange={(event) => setGallery((items) => items.map((entry, i) => i === index ? { ...entry, image: event.target.value } : entry))} /></label></div><button className="admin-delete" aria-label="Xóa ảnh" onClick={() => setGallery((items) => items.filter((_, i) => i !== index))}>Xóa</button></article>)}</div><button className="admin-primary save-changes" onClick={saveNotice}>Lưu thư viện</button></>}
          {section === 'requests' && <><div className="admin-page-title"><div><p className="admin-eyebrow">HỘP THƯ TƯ VẤN</p><h1>Yêu cầu tư vấn</h1><p>Yêu cầu gửi từ form website trong phiên demo này.</p></div><span className="request-count">{requests.length} yêu cầu</span></div>{requests.length ? <div className="admin-request-table"><div className="admin-table-head"><span>KHÁCH HÀNG</span><span>DỊCH VỤ</span><span>GHI CHÚ</span><span>TRẠNG THÁI</span><span></span></div>{requests.map((request) => <div className="admin-table-row" key={request.id}><span><strong>{request.name}</strong><small>{request.phone}</small></span><span>{request.service}</span><span>{request.note}</span><select aria-label="Trạng thái yêu cầu" value={request.status} onChange={(event) => setRequests((items) => items.map((item) => item.id === request.id ? { ...item, status: event.target.value } : item))}><option>Mới</option><option>Đang liên hệ</option><option>Đã hoàn tất</option></select><button className="admin-delete" aria-label="Xóa yêu cầu" onClick={() => setRequests((items) => items.filter((item) => item.id !== request.id))}>×</button></div>)}</div> : <div className="admin-empty"><h2>Chưa có yêu cầu nào</h2><p>Quay lại website, điền form tư vấn để xem luồng demo.</p><button className="admin-primary" onClick={onExit}>Đến form tư vấn</button></div>}</>}
          <p className="admin-demo-footnote">Demo frontend · Dữ liệu mất khi tải lại trang · Chưa kết nối email hoặc máy chủ.</p>
        </div>
      </section>
    </main>
  )
}

export default App
