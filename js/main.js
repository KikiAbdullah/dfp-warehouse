/* PT. Dimas Febry Prasetyo - Website Company Profile 2026 v3.0 */

document.addEventListener("DOMContentLoaded", () => {
  // ================================================================
  // 1. LOADING SCREEN
  // ================================================================
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 600);
      }, 400);
    });
  }

  // ================================================================
  // 2. THEME ENGINE
  // ================================================================
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const htmlElement = document.documentElement;

  const getSavedTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggleBtns.forEach((btn) => {
      const sun = btn.querySelector(".lucide-sun");
      const moon = btn.querySelector(".lucide-moon");
      if (theme === "dark") {
        if (sun) sun.classList.remove("d-none");
        if (moon) moon.classList.add("d-none");
      } else {
        if (sun) sun.classList.add("d-none");
        if (moon) moon.classList.remove("d-none");
      }
    });
    // Re-init Lucide icons after theme change
    if (window.lucide) lucide.createIcons();
  };

  applyTheme(getSavedTheme());

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = htmlElement.getAttribute("data-bs-theme");
      applyTheme(current === "dark" ? "light" : "dark");
      showToast("Tema berhasil diubah", "info");
    });
  });

  // ================================================================
  // 3. NAVBAR SCROLL + PROGRESS BAR
  // ================================================================
  const navbar = document.querySelector(".navbar-custom");
  const progressBar = document.getElementById("scrollProgress");

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollY > 50);
    }
    if (progressBar) {
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + "%";
    }

    const backToTop = document.getElementById("backToTopBtn");
    if (backToTop) {
      backToTop.classList.toggle("show", scrollY > 400);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // ================================================================
  // 4. ACTIVE NAV LINKS (Intersection Observer)
  // ================================================================
  const navLinks = document.querySelectorAll(".nav-link-custom");
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const target = link.getAttribute("data-target");
            if (target === id) {
              link.classList.add("active", "text-primary");
              link.classList.remove("text-secondary-emphasis");
            } else {
              link.classList.remove("active", "text-primary");
              link.classList.add("text-secondary-emphasis");
            }
          });
        }
      });
    },
    { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));

  // ================================================================
  // 5. SMOOTH SCROLL
  // ================================================================
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      const target = document.getElementById(targetId);
      const offcanvas = document.getElementById("mobileNavDrawer");
      if (offcanvas) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        if (bsOffcanvas) bsOffcanvas.hide();
      }
      if (target) {
        const offset = 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: "smooth",
        });
      }
    });
  });

  // ================================================================
  // 6. BACK TO TOP
  // ================================================================
  document.getElementById("backToTopBtn")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ================================================================
  // 7. PRODUCT DATA - Load from a.json
  // ================================================================
  let products = [];

  const loadProducts = async () => {
    try {
      const response = await fetch("products.json");
      const data = await response.json();
      products = data.map((item) => {
        const id = item.kategori.toLowerCase().replace(/\s+/g, "-");
        return {
          id: id,
          name: item.nama_produk,
          category: id,
          image: `assets/images/product/${encodeURIComponent(item.nama_produk)}/thumb.png`,
          description: item.deskripsi,
          material: item.bahan,
          harga: item.harga,
          satuan: item.satuan,
          berat: item.berat,
          colors: item.warna && item.warna !== "-" ? [item.warna] : ["Standard"],
          status: "Stok Tersedia",
          badgeClass: "bg-success",
        };
      });
    } catch (error) {
      console.error("Failed to load products:", error);
      products = [];
    }
  };

  // ================================================================
  // 8. RENDER PRODUCTS + SEARCH + FILTER
  // ================================================================
  const catalogGrid = document.getElementById("catalogGrid");
  const noResults = document.getElementById("noResults");
  const searchInput = document.getElementById("productSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let currentFilter = "semua";
  let currentSearch = "";

  const renderProducts = async () => {
    if (!catalogGrid) return;
    await loadProducts(); // Ensure products are loaded
    catalogGrid.innerHTML = "";

    const filtered = products.filter((p) => {
      const matchCategory =
        currentFilter === "semua" || p.category === currentFilter;
      const matchSearch =
        p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
        p.material.toLowerCase().includes(currentSearch.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      if (noResults) noResults.classList.remove("d-none");
      return;
    }
    if (noResults) noResults.classList.add("d-none");

    filtered.forEach((p) => {
      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4";
      card.innerHTML = `
        <div class="product-card">
          <div class="product-img-wrapper">
            <span class="badge product-badge ${p.badgeClass}">${p.status}</span>
            <img src="${p.image}" alt="${
        p.name
      }" loading="lazy" referrerPolicy="no-referrer">
          </div>
          <div class="p-4 flex-grow-1 d-flex flex-column justify-content-between">
            <div>
              <span class="text-uppercase font-monospace text-primary fw-bold" style="font-size:11px;">${
                p.category
              }</span>
              <h4 class="mt-1 h5 fw-bold text-truncate">${p.name}</h4>
              <p class="text-muted mt-2" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:13px;">${
                p.description
              }</p>
            </div>
            <div class="border-top pt-3 mt-3">
              <div class="d-flex justify-content-between text-muted" style="font-size:11px;">
                <span class="font-monospace">MATERIAL:</span>
                <span class="text-secondary-emphasis fw-bold">${
                  p.material
                }</span>
              </div>
              <div class="d-flex justify-content-between text-muted mt-1" style="font-size:11px;">
                <span class="font-monospace">HARGA:</span>
                <span class="text-secondary-emphasis fw-bold">Rp ${p.harga.toLocaleString()}</span>
              </div>
              <div class="d-flex justify-content-between text-muted mt-1" style="font-size:11px;">
                <span class="font-monospace">BERAT:</span>
                <span class="text-secondary-emphasis fw-bold">${p.berat} ${
        p.satuan
      }</span>
              </div>
            </div>
            <button class="btn btn-outline-primary btn-round w-100 mt-3 py-2 fw-bold view-details-btn" data-id="${
              p.id
            }" style="font-size:12px;">Detail & Pesan</button>
          </div>
        </div>
      `;
      catalogGrid.appendChild(card);
    });

    // Attach events
    document.querySelectorAll(".view-details-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const found = products.find((p) => p.id === btn.dataset.id);
        if (found) openProductDetailModal(found);
      });
    });
    document.querySelectorAll(".product-img-wrapper").forEach((w, idx) => {
      w.addEventListener("click", () => {
        const found = products.find((p) => p.id === filtered[idx]?.id);
        if (found) openProductDetailModal(found);
      });
    });
  };

  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("btn-primary", "text-white");
        b.classList.add("btn-outline-primary");
      });
      btn.classList.add("btn-primary", "text-white");
      btn.classList.remove("btn-outline-primary");
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim();
      renderProducts();
    });
  }

  // Initial render
  renderProducts();

  // ================================================================
  // 9. PRODUCT LIGHTBOX + QUANTITY SELECTOR
  // ================================================================
  const lightbox = document.getElementById("productLightbox");
  let currentQty = 1;

  const openProductDetailModal = (product) => {
    if (!lightbox) return;
    currentQty = 1;
    document.getElementById("qtyDisplay").textContent = "1";

    document.getElementById("lb-image").src = product.image;
    document.getElementById("lb-title").textContent = product.name;
    document.getElementById("lb-description").textContent = product.description;
    document.getElementById("lb-material").textContent = product.material;

    // Hide dimensi row if not available
    const dimensiEl = document.getElementById("lb-dimensi");
    const dimensiRow = dimensiEl?.parentElement;
    if (dimensiRow) {
      if (product.dimensi) {
        dimensiEl.textContent = product.dimensi;
        dimensiRow.style.display = "flex";
      } else {
        dimensiRow.style.display = "none";
      }
    }

    // Hide volume row if not available
    const volRow = document.getElementById("lb-volume-row");
    if (volRow) {
      if (product.volume && product.volume !== "N/A") {
        document.getElementById("lb-volume").textContent = product.volume;
        volRow.style.display = "flex";
      } else {
        volRow.style.display = "none";
      }
    }

    // Perks - hide if not available
    const perksContainer = document.getElementById("lb-perks");
    if (perksContainer) {
      if (product.perks && product.perks.length > 0) {
        perksContainer.innerHTML = "";
        product.perks.forEach((perk) => {
          const li = document.createElement("li");
          li.textContent = perk;
          perksContainer.appendChild(li);
        });
      } else {
        perksContainer.innerHTML = "<li class='text-muted'>Tidak ada informasi tambahan</li>";
      }
    }

    // Colors
    const colorsContainer = document.getElementById("lb-colors");
    colorsContainer.innerHTML = "";
    let selectedColor = product.colors[0] || "Standard";
    product.colors.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.className = `btn btn-sm btn-outline-secondary me-2 mb-2 ${
        idx === 0 ? "active text-primary fw-bold" : ""
      }`;
      btn.textContent = c;
      btn.addEventListener("click", () => {
        colorsContainer.querySelectorAll("button").forEach((b) => {
          b.classList.remove("active", "text-primary", "fw-bold");
        });
        btn.classList.add("active", "text-primary", "fw-bold");
        selectedColor = c;
        updateWhatsAppLink(product, selectedColor);
      });
      colorsContainer.appendChild(btn);
    });

    const updateWhatsAppLink = (p, color) => {
      const waBtn = document.getElementById("lb-wa-btn");
      if (!waBtn) return;
      const phone = "6282210210020";
      const text = `Halo PT. Dimas Febry Prasetyo, saya tertarik dengan produk:

*Nama*: ${p.name}
*Kategori*: ${p.category.toUpperCase()}
*Warna*: ${color}
*Jumlah*: ${currentQty} pcs
*Tujuan*: Info stok & harga grosir (B2B)

Mohon dibalas via WhatsApp. Terima kasih.`;
      waBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    };

    // Quantity controls
    document.getElementById("qtyDec").addEventListener("click", () => {
      if (currentQty > 1) {
        currentQty--;
        document.getElementById("qtyDisplay").textContent = currentQty;
        updateWhatsAppLink(product, selectedColor);
      }
    });
    document.getElementById("qtyInc").addEventListener("click", () => {
      currentQty++;
      document.getElementById("qtyDisplay").textContent = currentQty;
      updateWhatsAppLink(product, selectedColor);
    });

    updateWhatsAppLink(product, selectedColor);

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove("show");
      document.body.style.overflow = "";
    }
  };

  document
    .getElementById("lightboxClose")
    ?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ================================================================
  // 10. CONTACT FORM
  // ================================================================
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccessAlert");
  if (contactForm && formSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formSuccess.classList.remove("d-none");
      contactForm.classList.add("d-none");
      setTimeout(() => {
        formSuccess.classList.add("d-none");
        contactForm.classList.remove("d-none");
        contactForm.reset();
        showToast("Pesan berhasil dikirim! ✅", "success");
      }, 4000);
    });
  }

  // ================================================================
  // 11. COOKIE CONSENT
  // ================================================================
  const cookieConsent = document.getElementById("cookieConsent");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieSettings = document.getElementById("cookieSettings");

  if (cookieConsent && !localStorage.getItem("cookieConsent")) {
    setTimeout(() => {
      cookieConsent.style.display = "block";
    }, 2000);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      cookieConsent.style.display = "none";
      showToast("Preferensi cookie disimpan 🍪", "info");
    });
  }
  if (cookieSettings) {
    cookieSettings.addEventListener("click", () => {
      cookieConsent.style.display = "none";
      // In production, show a settings modal
      showToast("Pengaturan cookie dibuka", "info");
    });
  }

  // ================================================================
  // 14. TOAST NOTIFICATION SYSTEM
  // ================================================================
  function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast-custom";
    const colors = {
      success: "#25d366",
      info: "#0d6efd",
      warning: "#ffc107",
      error: "#dc3545",
    };
    const borderColor = colors[type] || colors.info;
    toast.style.borderLeft = `4px solid ${borderColor}`;
    toast.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <span>${message}</span>
        <button class="btn btn-sm p-0 ms-auto text-muted" onclick="this.parentElement.parentElement.remove()" style="font-size:16px;">&times;</button>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4000);
  }
  window.showToast = showToast;

  // ================================================================
  // 15. PWA INSTALLATION
  // ================================================================
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById("pwaBanner");
    if (banner) {
      setTimeout(() => {
        banner.style.display = "block";
      }, 4000);
    }
  });

  document
    .getElementById("pwaInstallBtn")
    ?.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("PWA install outcome:", outcome);
        deferredPrompt = null;
        document.getElementById("pwaBanner").style.display = "none";
      }
    });

  document.getElementById("pwaLaterBtn")?.addEventListener("click", () => {
    document.getElementById("pwaBanner").style.display = "none";
  });
  document.getElementById("pwaCloseBtn")?.addEventListener("click", () => {
    document.getElementById("pwaBanner").style.display = "none";
  });

  // ================================================================
  // 16. SERVICE WORKER
  // ================================================================
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("SW registered"))
        .catch(() => console.log("SW registration failed"));
    });
  }

  console.log("✅ PT. Dimas Febry Prasetyo — Website v3.0 loaded");
});
