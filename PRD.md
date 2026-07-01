# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**PT. Dimas Febry Prasetyo – Website Company Profile 2026**

---

| **Versi Dokumen** | 2.0 (2026 Edition)                                                                      |
| ----------------- | --------------------------------------------------------------------------------------- |
| **Tanggal**       | 30 Juni 2026                                                                            |
| **Status**        | Final                                                                                   |
| **Platform**      | Web (Desktop, Tablet, Mobile)                                                           |
| **Deployment**    | GitHub Pages (Static Hosting)                                                           |
| **Tech Stack**    | HTML5, CSS3, Vanilla JavaScript, Bootstrap 5.3+ CDN, PWA Service Worker, No Build Tools |

---

## DAFTAR ISI

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif-executive-summary)
2. [Tujuan Proyek & Metrik Keberhasilan (KPI 2026)](#2-tujuan-proyek--metrik-keberhasilan-kpi-2026)
3. [Profil Perusahaan & Brand Voice](#3-profil-perusahaan--brand-voice)
4. [Target Audiens & Value Proposition](#4-target-audiens--value-proposition)
5. [Arsitektur Teknis & Batasan (Technical Constraints)](#5-arsitektur-teknis--batasan-technical-constraints)
6. [Kebutuhan Fungsional (Detailed Features)](#6-kebutuhan-fungsional-detailed-features)
7. [Kebutuhan Non-Fungsional (Performance, Accessibility, SEO)](#7-kebutuhan-non-fungsional-performance-accessibility-seo)
8. [UI/UX Guidelines – Modern 2026](#8-uiux-guidelines--modern-2026)
9. [Content Strategy & Copywriting](#9-content-strategy--copywriting)
10. [Persiapan Aset dari Klien](#10-persiapan-aset-dari-klien)
11. [Alur Kerja & Deployment](#11-alur-kerja--deployment)
12. [Rencana Pemeliharaan & Roadmap Masa Depan](#12-rencana-pemeliharaan--roadmap-masa-depan)
13. [Lampiran: Checklist Peluncuran](#13-lampiran-checklist-peluncuran)

---

## 1. Ringkasan Eksekutif (Executive Summary)

**PT. Dimas Febry Prasetyo** telah berkembang dari skala _home industry_ sejak 2014 menjadi perusahaan manufaktur plastik _injection molding_ yang legal dan terpercaya (NIB 2210210020363). Produk unggulan meliputi ember, gantungan baju (hanger), dan baskom berkualitas tinggi yang dipasarkan ke distributor, grosir, serta konsumen langsung di seluruh Indonesia.

Memasuki tahun 2026, kebutuhan akan kehadiran digital yang **cepat, aman, dan mudah ditemukan** menjadi mutlak. Website ini dibangun sebagai **etalase profesional** yang:

- Mengomunikasikan kredibilitas dan legalitas perusahaan secara transparan.
- Memamerkan katalog produk dengan visual yang tajam dan responsif.
- Memudahkan calon mitra dan pelanggan menghubungi langsung via WhatsApp.
- Beroperasi tanpa biaya server (_serverless_), menggunakan **GitHub Pages** dan teknologi statis modern.
- Dapat diakses dalam kondisi jaringan minim sekalipun melalui kemampuan **Progressive Web App (PWA)** (installable & offline-ready).

Dokumen ini menjadi panduan tunggal bagi tim desain, pengembang front-end, dan pemangku kepentingan untuk menghasilkan website yang tidak hanya informatif, tetapi juga membangun kepercayaan dan mendorong konversi bisnis.

---

## 2. Tujuan Proyek & Metrik Keberhasilan (KPI 2026)

### Tujuan Strategis

| No  | Tujuan                  | Target Kuantitatif (KPI)                                                                                                        |
| --- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Visibilitas Digital** | Halaman terindeks di peringkat 1–3 Google untuk: "pabrik plastik Pasuruan", "grosir ember Gempol", "supplier baskom Jawa Timur" |
| 2   | **Edukasi Profil**      | Waktu rata-rata kunjungan (Avg. Session Duration) > 2 menit; Bounce Rate < 45%                                                  |
| 3   | **Katalogisasi Produk** | Setidaknya 80% pengunjung mengklik minimal 1 gambar produk untuk diperbesar (Lightbox event tracking)                           |
| 4   | **Performa & Kualitas** | Lighthouse Score: Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100; PWA ready                             |
| 5   | **Konversi Leads**      | Click-through rate (CTR) tombol WhatsApp/Email ≥ 8% dari total pengunjung bulan pertama, meningkat stabil setiap kuartal        |
| 6   | **Kepercayaan Mitra**   | Tampilan legalitas (NIB) dilihat penuh (expand/collapse section) minimal 50% pengunjung baru                                    |

### Metrik Tambahan (Engagement Modern)

- **PWA Installs**: Setidaknya 5% pengguna mobile menambahkan website ke layar utama.
- **Dark Mode Usage**: 30% sesi menggunakan tampilan dark mode (opsi eksplisit atau mengikuti preferensi OS).
- **Social Share**: Tombol bagikan ke WhatsApp/Telegram menghasilkan minimal 50 share per bulan.

---

## 3. Profil Perusahaan & Brand Voice

### Data Inti (Wajib Tersaji Akurat)

- **Nama Resmi**: PT. Dimas Febry Prasetyo
- **Tahun Berdiri**: 2014 (Home Industry) → Legalitas penuh 2021 (NIB 2210210020363)
- **Alamat Warehouse**: Dsn Kedamaian RT 02 RW 08, Desa Kepulungan, Kec. Gempol, Kab. Pasuruan, Jawa Timur
- **Telepon/WA**: _(menunggu input klien)_ – ditampilkan di floating button dan footer
- **Visi**: Menjadi perusahaan produk plastik injection yang berkompeten, memprioritaskan kualitas produk, dan memberikan pelayanan terbaik bagi pelanggan serta mitra bisnis.
- **Misi** (5 pilar):
  1. Memproduksi peralatan rumah tangga plastik berkualitas tinggi.
  2. Melakukan inovasi teknologi produksi untuk efisiensi maksimal.
  3. Memperbanyak jaringan pemasaran di seluruh Indonesia.
  4. Menjalin hubungan kerja sama yang baik dengan mitra, karyawan, dan pelanggan dalam menciptakan produk inovatif.
  5. Memperhatikan kesejahteraan karyawan.

### Brand Voice & Tone

- **Profesional namun ramah** – bahasa Indonesia formal yang mudah dipahami, bukan kaku.
- **Transparan** – menampilkan NIB, alamat lengkap, dan foto asli pabrik (tanpa stok foto generik).
- **Berorientasi pada solusi** – setiap kalimat menjawab kebutuhan pelanggan: kualitas, kapasitas produksi, kemudahan komunikasi.

---

## 4. Target Audiens & Value Proposition

| Persona                                 | Kebutuhan Utama                                                            | Value Proposition yang Ditonjolkan                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Distributor & Agen Grosir (B2B)**     | Pasokan rutin, harga partai, bukti kapasitas pabrik, legalitas jelas       | _“Pabrik resmi dengan NIB, siap kirim partai besar. Hubungi langsung via WhatsApp untuk penawaran harga grosir.”_ |
| **Konsumen Langsung (B2C)**             | Produk plastik berkualitas dengan ukuran dan warna lengkap, garansi pabrik | _“Produk rumah tangga asli pabrik, bukan makloon. Lihat galeri dan spesifikasi sebelum membeli.”_                 |
| **Mitra Pemasok Bahan Baku**            | Lokasi pabrik, skala produksi, potensi kerja sama jangka panjang           | _“Lokasi strategis di Gempol – akses mudah. Kami terbuka untuk suplai bijih plastik berkualitas.”_                |
| **Calon Karyawan / Masyarakat Sekitar** | Informasi lowongan, profil perusahaan yang peduli kesejahteraan            | _“Perusahaan yang berkembang dan memperhatikan karyawan – lihat misi kami.”_                                      |
| **Regulator / Lembaga**                 | Legalitas dan kredibilitas usaha                                           | _“NIB dan data perusahaan tersaji jelas – wujud kepatuhan kami.”_                                                 |

---

## 5. Arsitektur Teknis & Batasan (Technical Constraints)

### Infrastruktur 2026

- **Hosting**: GitHub Pages (gratis, SSL otomatis, CDN global Fastly).
- **Domain**: Disarankan menggunakan custom domain (misal `www.dimasfebry.com`) dengan konfigurasi CNAME; gratis dengan dukungan HTTPS.
- **Struktur File**: Single Page Application (SPA) berbasis `index.html`, didukung folder:
  - `/css/style.css` – kostumisasi minimal di atas Bootstrap.
  - `/js/main.js` – vanilla JavaScript.
  - `/assets/images/` – semua gambar (WebP wajib).
  - `/sw.js` – service worker untuk PWA.
  - `/manifest.json` – web app manifest.
- **Library & CDN** (di-load via jsDelivr/cdnjs):
  - Bootstrap 5.3.x CSS + JS bundle.
  - Bootstrap Icons.
  - Google Fonts: Inter (400,600,700) dan Open Sans (400,600).
  - Lightbox2 (untuk galeri produk) – opsional, bisa juga dibuat vanilla.
  - AOS (Animate on Scroll) – untuk animasi ringan saat scroll (sangat kecil, via CDN).
- **Dilarang**: Node.js, npm, Vite, React, Vue, PHP, MySQL, atau static site generator apapun. Semua kode adalah file statis yang dapat diedit langsung via GitHub Web Editor.

### Fitur Modern 2026 yang Diadopsi

- **Dark Mode Toggle**: Menggunakan Bootstrap 5.3 `data-bs-theme` dan preferensi sistem (`prefers-color-scheme`).
- **PWA**: Service worker untuk cache halaman statis, memungkinkan akses offline & instalasi.
- **Smooth Scrolling & Active Section Highlight**: Intersection Observer memodifikasi navbar active state.
- **Floating WhatsApp & Back-to-Top**: Elemen tetap di sudut layar, dengan animasi perhatian (pulse).

---

## 6. Kebutuhan Fungsional (Detailed Features)

Website dirancang sebagai **One-Page Scroll** yang terdiri dari 8 bagian utama + elemen mengambang.

### 6.1 Navbar (Sticky Smart)

- **Posisi**: Fixed top, latar transparan/blur saat scroll (`backdrop-filter`).
- **Konten**: Logo perusahaan (PNG) + nama “PT. Dimas Febry Prasetyo”, tautan: Beranda, Tentang, Visi & Misi, Produk, Kontak.
- **Mobile**: Hamburger menu (offcanvas Bootstrap) dengan animasi slide.
- **Dark Mode Switch**: Ikon matahari/bulan di sudut kanan atas navbar, toggle tema global.
- **Perilaku**: Saat scroll melewati hero, latar berubah solid putih/gelap sesuai tema.

### 6.2 Hero Banner (Beranda)

- **Desain Full-screen**: Gambar latar belakang pabrik/warehouse (WebP, dikompres <150KB) dengan overlay gradien gelap.
- **Judul Utama (H1)**: “PT. Dimas Febry Prasetyo – Pabrik Plastik Injection Terpercaya Sejak 2014”
- **Subjudul**: “Solusi peralatan rumah tangga berkualitas untuk distributor, grosir, dan konsumen Indonesia.”
- **Dua CTA Button**:
  1. “Jelajahi Produk” (mengarah ke section Katalog).
  2. “Hubungi Kami via WhatsApp” (ikon WA, link ke `wa.me/62xxxxx`).
- **Indikator Scroll**: Panah ke bawah animasi.

### 6.3 Tentang Kami (Sejarah & Legalitas)

- **Layout**: Dua kolom (teks kiri, gambar kanan). Pada mobile, gambar di atas.
- **Teks Narasi**: Menceritakan perjalanan dari home industry 2014 hingga menjadi PT resmi, pentingnya NIB, dan komitmen kualitas.
- **Highlight Box**: Menampilkan NIB 2210210020363 secara jelas, bisa diklik untuk menampilkan info lengkap (modal popup atau expand).
- **Gambar**: Foto asli pabrik/karyawan/suasana produksi (bukan stok). Atribut `alt` deskriptif.

### 6.4 Visi & Misi (Card Section)

- **Desain**: Grid 3x2 (desktop) berisi 6 kartu (1 Visi + 5 Misi). Setiap kartu memiliki ikon Bootstrap Icons, judul tebal, dan deskripsi singkat.
- **Animasi**: Muncul saat di-scroll (AOS: fade-up).
- **Tone**: Kalimat singkat, mudah dipindai.

### 6.5 Katalog Produk (Galeri Interaktif)

- **Layout**: Bootstrap Grid (`row-cols-1 row-cols-md-3`). Minimal 3–6 produk.
- **Kartu Produk**:
  - Gambar (thumbnail WebP, 300x300px, max 80KB) -> saat diklik, lightbox menampilkan gambar resolusi tinggi.
  - Nama produk (H3): Ember Serbaguna, Hanger Premium, Baskom Multifungsi, dll.
  - Deskripsi singkat (material, ukuran, varian warna).
  - Jika memungkinkan, label “Stok Tersedia” / “Pesan Grosir”.
- **Lightbox**: Menggunakan library Tinybox atau custom vanilla JS dengan animasi zoom.
- **Fallback**: Tanpa JS, gambar langsung terbuka di tab baru.

### 6.6 Ulasan & Kepercayaan (Social Proof – Opsional tapi Direkomendasikan 2026)

- **Section Testimoni Singkat**: 3–5 kutipan dari mitra distributor (bisa menggunakan avatar default jika belum ada foto).
- **Partner Logos**: Jika ada, logo perusahaan yang pernah bekerja sama (tampilan grayscale, hover berwarna).

### 6.7 Footer & Kontak

- **Latar Gelap (bg-dark)** dengan konten:
  - Logo/nama PT, NIB.
  - Alamat lengkap + tautan Google Maps (iframe embed, lazy load dengan `loading="lazy"`).
  - Kontak telepon/WA (klik untuk langsung chat).
  - Hak cipta © 2026.
  - Tautan “Kebijakan Privasi” (halaman statis minimal).
- **Newsletter Form** (Opsional): Integrasi form statis yang mengarah ke Google Sheets (via formspree atau hanya tampilan, mengingat statis).

### 6.8 Floating Elements

- **Tombol WhatsApp Mengambang**: Pojok kanan bawah, ikon WA hijau, pulsing halus, link `https://wa.me/62xxxx?text=Halo%20PT%20Dimas%20Febry%2C%20saya%20tertarik%20dengan%20produk...` (teks default bisa disesuaikan).
- **Back-to-Top Button**: Muncul setelah scroll 300px, ikon panah atas.

### 6.9 PWA Features

- **Web App Manifest**: Menentukan ikon, nama pendek (“Dimas Plastik”), tema warna biru korporat.
- **Service Worker**: Caching strategi “Cache First” untuk aset statis (CSS, JS, gambar, font). Halaman HTML menggunakan “Network First” agar tetap segar.
- **Instalasi**: Memunculkan dialog install otomatis setelah beberapa detik (via `beforeinstallprompt` event).

---

## 7. Kebutuhan Non-Fungsional (Performance, Accessibility, SEO)

### 7.1 Performa & Page Load

- **Total Page Weight**: ≤ 1.5 MB (initial load). Gambar di-lazy load dengan `loading="lazy"` dan format **WebP** wajib.
- **Critical CSS inlined**: Gaya di atas lipatan (header, hero) diletakkan di `<style>` di `<head>` agar tidak render-blocking.
- **Font Loading**: Menggunakan `font-display: swap` untuk Google Fonts.
- **Lighthouse Target**:
  - Performance: ≥ 95
  - Accessibility: 100 (kontras warna, focus visible, ARIA labels)
  - Best Practices: 100 (HTTPS, tidak ada kerentanan library)
  - SEO: 100 (meta tags lengkap, robots.txt, sitemap.xml statis)

### 7.2 Responsivitas & Mobile-First

- Diuji pada viewport:
  - Small (320px – 576px)
  - Medium (768px)
  - Large (992px)
  - Extra Large (1200px – 1920px)
- Breakpoint Bootstrap 5.3 standar digunakan. Tidak ada horizontal scroll.

### 7.3 Aksesibilitas (WCAG 2.2 AA)

- Semua gambar memiliki atribut `alt` deskriptif.
- Rasio kontras teks terhadap latar minimal 4.5:1 (normal), 3:1 (large text).
- Navigasi keyboard: semua interaksi dapat dilakukan dengan Tab, Enter, Escape.
- Skip to Content link (tersembunyi, muncul saat fokus).
- Form WhatsApp menggunakan proper `aria-label`.
- Dark Mode harus tetap memenuhi kontras.

### 7.4 SEO & Discoverability

- **Metadata**:
  - `<title>`: PT. Dimas Febry Prasetyo – Pabrik Plastik Injection Pasuruan | Grosir Ember & Baskom
  - `<meta name="description">`: ... (kalimat penjualan singkat, mengandung keyword lokal)
  - Open Graph tags (og:title, og:image, og:description) untuk share di sosmed.
  - JSON-LD structured data (Organization schema) untuk knowledge graph.
- **Hierarki Heading**:
  - H1: Judul utama (Hero)
  - H2: Judul section (Tentang Kami, Visi & Misi, dll.)
  - H3: Nama produk, sub judul
- **Sitemap.xml**: Statis, diperbarui manual jika ada perubahan.
- **Robots.txt**: Allow all.

### 7.5 Keamanan

- HTTPS otomatis dari GitHub Pages.
- Tidak ada form pengumpulan data sensitif; semuanya diarahkan ke WhatsApp (end-to-end encryption).

---

## 8. UI/UX Guidelines – Modern 2026

### 8.1 Skema Warna (Dynamic)

- **Light Mode**:
  - Primary: `#0D6EFD` (Biru Bootstrap 5.3)
  - Secondary: `#F8F9FA` (Abu-abu sangat terang)
  - Accent: `#25D366` (WhatsApp Green)
  - Text: `#212529`
- **Dark Mode** (aktif otomatis/preferensi):
  - Background: `#121212`
  - Surface: `#1E1E1E`
  - Primary: `#3B82F6` (sedikit lebih terang)
  - Text: `#E0E0E0`
  - Accent tetap WhatsApp Green.

### 8.2 Tipografi

- **Headings**: Inter, weight 700, letter-spacing -0.5px.
- **Body**: Open Sans, weight 400, line-height 1.7.
- **Ukuran**:
  - H1: 2.5rem (40px) di mobile, 3.5rem di desktop.
  - Body: 1rem (16px) minimum.

### 8.3 Komponen Visual

- **Kartu**: Shadow halus `box-shadow: 0 4px 6px rgba(0,0,0,0.07)`, border-radius 12px.
- **Tombol**: Fully rounded (`border-radius: 50px`) untuk CTA, dengan efek hover lift (translateY -2px).
- **Ikon**: Bootstrap Icons, ukuran proporsional.
- **Transisi**: Semua interaksi (hover, scroll reveal) memiliki durasi 200–300ms untuk kesan ringan.

### 8.4 Micro-interactions

- Floating WA: Animasi pulse setiap 5 detik.
- Navbar: Berubah latar dan bayangan saat di-scroll.
- Gambar produk: Efek zoom-in saat hover di desktop.
- Scroll progress bar di bagian atas (opsional, vanilla JS tipis).

---

## 9. Content Strategy & Copywriting

### 9.1 Struktur Konten

Semua teks akan ditulis dengan pendekatan **AIDA** (Attention, Interest, Desire, Action):

- **Hero**: Attention – headline kuat, subheadline manfaat.
- **Tentang**: Interest & Trust – cerita asli, bukti legalitas.
- **Visi Misi**: Desire – nilai dan komitmen.
- **Katalog**: Visual desire – produk nyata.
- **Footer/Kontak**: Action – CTA langsung.

### 9.2 Panduan Copywriting

- Gunakan kata kunci lokal: “Pasuruan”, “Gempol”, “Jawa Timur”, “grosir plastik”, “pabrik injection”.
- Hindari jargon teknikal berlebihan; sesuaikan dengan persona.
- Sertakan ajakan bertindak yang spesifik: “Dapatkan Harga Grosir Sekarang”, “Tanya Stok via WhatsApp”.

### 9.3 Placeholder Konten (Contoh)

**Hero Headline**:  
“Plastik Injection Berkualitas dari Jantung Industri Pasuruan”  
**Sub**:  
“PT. Dimas Febry Prasetyo – mitra terpercaya untuk distributor, grosir, dan kebutuhan rumah tangga modern. Legal, berpengalaman, dan siap kirim.”

**Tentang**:  
“Berawal dari sebuah home industry kecil di Gempol pada tahun 2014, kami terus berinovasi hingga resmi menjadi PT. Dimas Febry Prasetyo. Dengan NIB 2210210020363, kini kami melayani pasar nasional dengan produk seperti ember, hanger, dan baskom yang terjamin kualitasnya…”

---

## 10. Persiapan Aset dari Klien

Sebelum pengembangan dimulai, klien wajib menyediakan:

| No  | Aset                     | Spesifikasi                                                                                      |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------ |
| 1   | Logo Resmi               | PNG transparan, minimal 1000px lebar                                                             |
| 2   | Foto Pabrik/Warehouse    | Resolusi tinggi (1920x1280px), format WebP setelah dikonversi, tampak profesional & terang       |
| 3   | Foto Produk (3–6 produk) | Pencahayaan bagus, latar putih atau bersih, format WebP ukuran 800x800px dan thumbnail 400x400px |
| 4   | Nomor WhatsApp Aktif     | Format internasional (contoh: 6281234567890)                                                     |
| 5   | URL Google Maps Lokasi   | Link share dari Google Maps (untuk iframe embed)                                                 |
| 6   | Testimoni / Nama Mitra   | (opsional) untuk section social proof, bisa hanya nama dan jabatan                               |
| 7   | Warna Korporat           | Jika ada preferensi selain biru Bootstrap, sebutkan kode HEX. (Default: #0D6EFD)                 |

---

## 11. Alur Kerja & Deployment

### Tahap 1: Development Lokal

1. Buat struktur folder lengkap, file `index.html` dengan semantic HTML.
2. Tambahkan link CDN Bootstrap 5.3, ikon, font di `<head>`.
3. Susun markup seluruh section, mulai dari navbar hingga footer.
4. Tulis CSS kustom di `css/style.css` (hanya untuk keperluan spesifik seperti hero overlay, animasi, dll).
5. Tulis JS di `js/main.js`: smooth scroll, navbar behavior, dark mode toggle, lightbox, intersection observer, floating buttons.
6. Buat `sw.js` dan `manifest.json` untuk PWA; daftarkan service worker di main.js.
7. Konversi semua gambar ke WebP, letakkan di folder aset.

### Tahap 2: Quality Assurance

- Uji coba di browser lokal: Chrome, Firefox, Safari, Edge.
- Gunakan DevTools device mode untuk simulasi mobile.
- Jalankan Lighthouse audit (Performance, Accessibility, SEO) dan perbaiki hingga skor target tercapai.
- Uji dark mode, keyboard navigation, screen reader (NVDA/VoiceOver).

### Tahap 3: Deployment ke GitHub Pages

1. Buat repositori publik dengan nama `pt-dimas-febry.github.io` (atau custom domain).
2. Push semua file ke branch `main`.
3. Di Settings > Pages, pilih source branch `main`, folder root, save.
4. Tunggu 1–5 menit; website live dengan SSL.
5. (Opsional) Konfigurasi custom domain dengan CNAME record.

### Tahap 4: Monitoring Pasca Peluncuran

- Pasang Google Analytics (GA4) dengan script statis di `<head>`.
- Pantau metrik KPI setiap bulan.
- Kumpulkan feedback via WhatsApp untuk perbaikan konten.

---

## 12. Rencana Pemeliharaan & Roadmap Masa Depan

### Pemeliharaan Rutin (Bulanan/Triwulan)

- **Update Produk**: Duplikasi blok HTML kartu produk; ganti gambar dan teks. Dilakukan langsung via GitHub Web Editor atau commit dari lokal.
- **Ganti Nomor WA/Telepon**: Edit string di 2–3 lokasi.
- **Perbarui Tahun Footer**: Otomatis dengan JS `new Date().getFullYear()` (sudah diimplementasikan).
- **Pembaruan Service Worker**: Ubah versi cache saat ada perubahan aset agar pengguna dapat update.

### Roadmap 2026–2027 (Ide Peningkatan)

| Fitur                               | Deskripsi                                                                                                                               | Prioritas      |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **Halaman Produk Detail**           | Setiap kartu produk memiliki halaman statis sendiri (gunakan folder `/produk/`) dengan spesifikasi lengkap. Tetap statis tanpa backend. | Menengah       |
| **FAQ Section**                     | Pertanyaan umum dari distributor: minimal order, lama produksi, area pengiriman.                                                        | Rendah         |
| **Multibahasa** (Indonesia/English) | Menggunakan JSON statis dan JavaScript untuk switch bahasa tanpa reload.                                                                | Rendah         |
| **Form Pemesanan Sederhana**        | Integrasi ke Google Sheets atau formspree.io untuk pemesanan sampel.                                                                    | Rendah         |
| **Artikel/Blog Sederhana**          | Menggunakan GitHub Pages + Markdown (tanpa build tool, cukup buat halaman HTML manual).                                                 | Jangka Panjang |

Semua peningkatan tetap dalam koridor **static web**, memastikan kecepatan dan biaya operasional nol.

---

## 13. Lampiran: Checklist Peluncuran

- [ ] Semua gambar dalam format WebP, ukuran per file ≤ 150KB (thumbnail 40KB).
- [ ] Semua `<img>` memiliki atribut `alt` deskriptif.
- [ ] Meta tags lengkap: title, description, og:image, og:url, twitter:card.
- [ ] Structured data Organization JSON-LD sudah terpasang.
- [ ] Lighthouse score ≥ 95/100 untuk semua kategori.
- [ ] Dark mode berfungsi, kontras aman.
- [ ] Floating WhatsApp muncul, tautan ke nomor yang benar.
- [ ] Google Maps iframe embed bekerja dengan `loading="lazy"`.
- [ ] Service worker terdaftar dan cache bekerja (offline test).
- [ ] File `robots.txt` dan `sitemap.xml` tersedia di root.
- [ ] Custom domain (jika ada) terpasang dan HTTPS aktif.
- [ ] Google Analytics tracking ID terpasang.