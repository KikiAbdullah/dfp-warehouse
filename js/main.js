/* PT. Dimas Febry Prasetyo - Website Company Profile 2026 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dark Mode State Engine
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const htmlElement = document.documentElement;

  const getSavedTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    
    // Update icons for togglers
    themeToggleBtns.forEach(btn => {
      const sunIcon = btn.querySelector(".lucide-sun");
      const moonIcon = btn.querySelector(".lucide-moon");
      if (theme === "dark") {
        if (sunIcon) sunIcon.classList.remove("d-none");
        if (moonIcon) moonIcon.classList.add("d-none");
      } else {
        if (sunIcon) sunIcon.classList.add("d-none");
        if (moonIcon) moonIcon.classList.remove("d-none");
      }
    });
  };

  // Set initial theme
  applyTheme(getSavedTheme());

  themeToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-bs-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });


  // 2. Navbar Scrolling Effects
  const navbar = document.querySelector(".navbar-custom");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Scroll To Top button visibility
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();


  // 3. Active Nav Links Highlight on Scroll (Intersection Observer)
  const navLinks = document.querySelectorAll(".nav-link-custom");
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("data-target") === id) {
            link.classList.add("active", "text-primary");
            link.classList.remove("text-secondary-emphasis");
          } else {
            link.classList.remove("active", "text-primary");
            link.classList.add("text-secondary-emphasis");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));


  // 4. Smooth Scrolling to Sections
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      
      // Close offcanvas drawer if open
      const offcanvasElement = document.getElementById("mobileNavDrawer");
      if (offcanvasElement) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) bsOffcanvas.hide();
      }

      if (targetSection) {
        const offset = 80; // height of our fixed navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });


  // 5. Catalog Filtration Logic
  const products = [
    {
      id: "ember-pt-20",
      name: "Ember Serbaguna PT-20",
      category: "ember",
      image: "/assets/images/product_bucket_1782833343452.jpg",
      description: "Ember rumah tangga premium dengan ketebalan ekstra dan gagang logam galvanis antikarat yang kuat.",
      material: "100% Polypropylene Orisinil (PP-5)",
      dimensi: "Diameter 34 cm, Tinggi 32 cm",
      volume: "20 Liter",
      colors: ["Merah Cerah", "Biru Royal", "Hijau Daun", "Kuning Kenari"],
      perks: [
        "Gagang besi kokoh dengan selang plastik pelindung telapak tangan",
        "Kombinasi bahan elastis tinggi, tidak pecah saat jatuh penuh air",
        "Mulut ember memiliki corong tuang presisi mengurangi cipratan",
        "Aman untuk penampungan air minum domestik (Food Grade)"
      ],
      status: "Stok Tersedia",
      badgeClass: "bg-success"
    },
    {
      id: "hanger-h-12",
      name: "Hanger Baju Premium H-12",
      category: "hanger",
      image: "/assets/images/product_hanger_1782833357569.jpg",
      description: "Gantungan baju antibengkok berperekat anti-selip pada bahu, menjaga kerapian pakaian Anda sepanjang waktu.",
      material: "Polyethylene High Density Orisinil (HDPE)",
      dimensi: "Lebar 41 cm, Tinggi 20 cm, Tebal 8 mm",
      volume: "N/A",
      colors: ["Biru Royal", "Hitam Solid", "Abu-Abu Modern", "Putih Bersih"],
      perks: [
        "Bahu antigelincir (non-slip grooves) untuk gaun bertali tipis",
        "Hook melengkung kuat menahan beban jas tebal hingga 5 kg",
        "Dilengkapi bar tengah untuk gantungan celana/syal terintegrasi",
        "Tahan paparan sinar matahari langsung (anti-UV) tidak mudah rapuh"
      ],
      status: "Pesan Grosir",
      badgeClass: "bg-primary"
    },
    {
      id: "baskom-b-35",
      name: "Baskom Cuci Serbaguna B-35",
      category: "baskom",
      image: "/assets/images/product_basin_1782833370507.jpg",
      description: "Baskom cuci berdiameter sedang dengan bibir luar melengkung kokoh yang ergonomis saat diangkat.",
      material: "High-grade Polypropylene Orisinil (PP)",
      dimensi: "Diameter 35 cm, Tinggi 14 cm",
      volume: "8.5 Liter",
      colors: ["Hijau Emerald", "Toska Elegan", "Pink Pastel", "Biru Laut"],
      perks: [
        "Ketebalan dinding baskom mencapai 2.5mm, sangat tegar",
        "Bawah baskom bertekstur kasar mencegah selip di ubin licin",
        "Sisi dalam licin sempurna memudahkan pencucian residu sabun",
        "Sangat serbaguna untuk mencuci pakaian, sayuran, maupun adonan makanan"
      ],
      status: "Stok Tersedia",
      badgeClass: "bg-success"
    },
    {
      id: "ember-jumbo-ej-80",
      name: "Ember Jumbo Industri EJ-80",
      category: "ember",
      image: "/assets/images/product_bucket_1782833343452.jpg",
      description: "Ember penampungan air industri tebal kapasitas jumbo dengan penutup rapat ganda.",
      material: "Copopolymer PP Berkepadatan Tinggi (Impact Resistant)",
      dimensi: "Diameter 52 cm, Tinggi 58 cm",
      volume: "80 Liter",
      colors: ["Hitam Industri", "Biru Pekat", "Abu-Abu Baja"],
      perks: [
        "Gagang samping ganda yang terintegrasi (molded-in) tahan beban 100 kg",
        "Dilengkapi tutup kedap udara dengan sekrup pengunci opsional",
        "Sangat tahan terhadap benturan keras dan zat kimia encer",
        "Ideal untuk pergudangan, restoran, katering, maupun area konstruksi"
      ],
      status: "Hubungi Sales",
      badgeClass: "bg-warning text-dark"
    }
  ];

  const filterButtons = document.querySelectorAll(".filter-btn");
  const catalogGrid = document.getElementById("catalogGrid");

  const renderProducts = (categoryFilter) => {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = "";

    const filtered = categoryFilter === "semua" 
      ? products 
      : products.filter(p => p.category === categoryFilter);

    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4";
      card.innerHTML = `
        <div class="product-card">
          <div class="product-img-wrapper">
            <span class="badge product-badge ${p.badgeClass}">${p.status}</span>
            <img src="${p.image}" alt="${p.name}" class="product-img" referrerPolicy="no-referrer">
          </div>
          <div class="p-4 flex-grow-1 d-flex flex-column justify-content-between">
            <div>
              <span class="text-uppercase font-monospace text-primary fw-bold" style="font-size: 11px;">Kategori: ${p.category}</span>
              <h4 class="mt-1 h5 text-truncate fw-bold">${p.name}</h4>
              <p class="text-muted text-sm mt-2 font-sans" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 13px;">
                ${p.description}
              </p>
            </div>
            
            <div class="border-top pt-3 mt-3">
              <div class="d-flex justify-content-between font-monospace text-muted" style="font-size: 11px;">
                <span>MATERIAL:</span>
                <span class="text-secondary-emphasis fw-bold">Plastik PP Orisinil</span>
              </div>
              <div class="d-flex justify-content-between font-monospace text-muted mt-1" style="font-size: 11px;">
                <span>DIMENSI:</span>
                <span class="text-secondary-emphasis fw-bold text-truncate" style="max-width: 150px;">${p.dimensi}</span>
              </div>
            </div>

            <button class="btn btn-outline-primary btn-round w-full mt-3 py-2 fw-bold text-xs view-details-btn" data-id="${p.id}" style="font-size: 12px;">
              Detail & Pesanan Grosir
            </button>
          </div>
        </div>
      `;
      catalogGrid.appendChild(card);
    });

    // Add event listeners to newly rendered detail buttons
    document.querySelectorAll(".view-details-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const prodId = btn.getAttribute("data-id");
        const found = products.find(p => p.id === prodId);
        if (found) openProductDetailModal(found);
      });
    });

    // Add event listeners to newly rendered image click triggers as well
    document.querySelectorAll(".product-img-wrapper").forEach((wrapper, idx) => {
      wrapper.addEventListener("click", () => {
        const prodId = filtered[idx].id;
        const found = products.find(p => p.id === prodId);
        if (found) openProductDetailModal(found);
      });
    });
  };

  // Add click events to filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("btn-primary", "text-white");
        b.classList.add("btn-outline-primary");
      });
      btn.classList.add("btn-primary", "text-white");
      btn.classList.remove("btn-outline-primary");

      const filterValue = btn.getAttribute("data-filter");
      renderProducts(filterValue);
    });
  });

  // Initial products render
  renderProducts("semua");


  // 6. Interactive Detail Lightbox/Modal
  const lightbox = document.getElementById("productLightbox");
  const lightboxClose = document.getElementById("lightboxClose");
  const closeLightboxBtn = document.getElementById("closeLightboxBtn");

  const openProductDetailModal = (product) => {
    if (!lightbox) return;

    // Fill details
    document.getElementById("lb-image").setAttribute("src", product.image);
    document.getElementById("lb-title").innerText = product.name;
    document.getElementById("lb-description").innerText = product.description;
    document.getElementById("lb-material").innerText = product.material;
    document.getElementById("lb-dimensi").innerText = product.dimensi;

    const volumeRow = document.getElementById("lb-volume-row");
    if (product.volume !== "N/A" && product.volume) {
      document.getElementById("lb-volume").innerText = product.volume;
      volumeRow.style.display = "flex";
    } else {
      volumeRow.style.display = "none";
    }

    // Perks
    const perksContainer = document.getElementById("lb-perks");
    perksContainer.innerHTML = "";
    product.perks.forEach(perk => {
      const li = document.createElement("li");
      li.innerText = perk;
      perksContainer.appendChild(li);
    });

    // Varian Colors
    const colorsContainer = document.getElementById("lb-colors");
    colorsContainer.innerHTML = "";
    
    let selectedColor = product.colors[0];

    product.colors.forEach((color, idx) => {
      const colBtn = document.createElement("button");
      colBtn.className = `btn btn-sm btn-outline-secondary me-2 mb-2 ${idx === 0 ? "active text-primary fw-bold" : ""}`;
      colBtn.innerText = color;
      
      colBtn.addEventListener("click", () => {
        colorsContainer.querySelectorAll("button").forEach(b => {
          b.classList.remove("active", "text-primary", "fw-bold");
        });
        colBtn.classList.add("active", "text-primary", "fw-bold");
        selectedColor = color;
        // Update WhatsApp button link
        updateWhatsAppLink(product, selectedColor);
      });

      colorsContainer.appendChild(colBtn);
    });

    // Create / Update WhatsApp Order link
    const updateWhatsAppLink = (p, c) => {
      const waButton = document.getElementById("lb-wa-btn");
      if (!waButton) return;

      const phone = "6282210210020";
      const text = `Halo PT. Dimas Febry Prasetyo, saya melihat katalog di website dan tertarik dengan produk:

- *Nama Produk*: ${p.name}
- *Kategori*: ${p.category.toUpperCase()}
- *Warna Pilihan*: ${c}
- *Tujuan*: Permintaan Info Stok & Penawaran Harga Grosir (B2B)

Mohon informasi harga partai besar dan minimal pembelian. Terima kasih.`;
      
      waButton.setAttribute("href", `https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
    };

    updateWhatsAppLink(product, selectedColor);

    // Show Lightbox Modal
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove("show");
      document.body.style.overflow = "";
    }
  };

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
  
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }


  // 7. Contact Form Quick Submission Simulation
  const contactForm = document.getElementById("contactForm");
  const formSuccessAlert = document.getElementById("formSuccessAlert");

  if (contactForm && formSuccessAlert) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Show instant simulation success state
      formSuccessAlert.classList.remove("d-none");
      contactForm.classList.add("d-none");

      setTimeout(() => {
        formSuccessAlert.classList.add("d-none");
        contactForm.classList.remove("d-none");
        contactForm.reset();
      }, 5000);
    });
  }


  // 8. Scroll To Top Click Function
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // 9. Interactive PWA App Installation Installer
  let deferredPrompt;
  const pwaBanner = document.getElementById("pwaBanner");
  const pwaInstallBtn = document.getElementById("pwaInstallBtn");
  const pwaLaterBtn = document.getElementById("pwaLaterBtn");
  const pwaCloseBtn = document.getElementById("pwaCloseBtn");

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent default Chrome mobile installation bar
    e.preventDefault();
    deferredPrompt = e;

    // Show custom engaged installer banner after 3.5 seconds
    setTimeout(() => {
      if (pwaBanner) pwaBanner.style.display = "block";
    }, 3500);
  });

  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User installation decision outcome: ${outcome}`);
      deferredPrompt = null;
      if (pwaBanner) pwaBanner.style.display = "none";
    });
  }

  const hidePwaBanner = () => {
    if (pwaBanner) pwaBanner.style.display = "none";
  };

  if (pwaLaterBtn) pwaLaterBtn.addEventListener("click", hidePwaBanner);
  if (pwaCloseBtn) pwaCloseBtn.addEventListener("click", hidePwaBanner);

  // 10. Register Service Worker for Offline-First Capability
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('PWA Service Worker registered successfully:', registration.scope);
        })
        .catch((error) => {
          console.error('PWA Service Worker registration failed:', error);
        });
    });
  }
});
