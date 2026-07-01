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
  const sections = document.querySelectorAll("section[id]");

  if (navLinks.length && sections.length) {
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
  }

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
  // 8. PRODUCT DATA - Load from products.json
  // ================================================================
  let products = [];
  let productsLoaded = false;

  const loadProducts = async () => {
    if (productsLoaded) return;
    try {
      const response = await fetch("products.json");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      products = data.map((item) => {
        const id =
          item.kategori.toLowerCase().replace(/\s+/g, "-") +
          "-" +
          item.nama_produk
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-")
            .slice(0, 20);
        return {
          id: id,
          name: item.nama_produk,
          category: item.kategori,
          image: `assets/images/product/${encodeURIComponent(
            item.nama_produk
          )}/thumb.png`,
          description: item.deskripsi || "Deskripsi produk tidak tersedia.",
          material: item.bahan || "Plastik",
          harga: item.harga || 0,
          satuan: item.satuan || "pcs",
          berat: item.berat || 0,
          colors:
            item.warna && item.warna !== "-" && item.warna !== null
              ? item.warna.includes("&")
                ? item.warna.split("&").map((c) => c.trim())
                : [item.warna.trim()]
              : ["Standard"],
          dimensi: item.dimensi || null,
          volume: item.volume || null,
          perks: item.perks || [
            "Bahan berkualitas tinggi",
            "Tahan lama",
            "Harga kompetitif",
          ],
          status: "Stok Tersedia",
          badgeClass: "bg-success",
        };
      });
      productsLoaded = true;
    } catch (error) {
      console.error("Failed to load products:", error);
      products = [];
      showToast("Gagal memuat data produk", "error");
    }
  };

  // ================================================================
  // 9. RENDER PRODUCTS + SEARCH + FILTER
  // ================================================================
  const catalogGrid = document.getElementById("catalogGrid");
  const noResults = document.getElementById("noResults");
  const searchInput = document.getElementById("productSearch");

  let currentFilter = "semua";
  let currentSearch = "";

  const renderProducts = async () => {
    if (!catalogGrid) return;
    await loadProducts();

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

    filtered.forEach((p, index) => {
      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4";
      card.setAttribute("data-product-id", p.id);
      card.innerHTML = `
        <div class="product-card">
          <div class="product-img-wrapper" data-id="${p.id}">
            <span class="badge product-badge ${p.badgeClass}">${p.status}</span>
            <img src="${p.image}" alt="${
        p.name
      }" loading="lazy" onerror="this.src='assets/images/favicon.png'">
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

    // Attach events using data-id
    document.querySelectorAll(".view-details-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const found = products.find((p) => p.id === btn.dataset.id);
        if (found) openProductDetailModal(found);
      });
    });

    document.querySelectorAll(".product-img-wrapper").forEach((wrapper) => {
      wrapper.addEventListener("click", () => {
        const found = products.find((p) => p.id === wrapper.dataset.id);
        if (found) openProductDetailModal(found);
      });
    });

    // Recreate Lucide icons for new elements
    if (window.lucide) lucide.createIcons();
  };

  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
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
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        renderProducts();
      }, 300);
    });
  }

  // Initial render
  renderProducts();

  // ================================================================
  // 10. PRODUCT LIGHTBOX + QUANTITY SELECTOR
  // ================================================================
  const lightbox = document.getElementById("productLightbox");
  let currentQty = 1;
  let selectedColor = "Standard";

  const openProductDetailModal = (product) => {
    if (!lightbox) return;
    currentQty = 1;
    selectedColor = product.colors[0] || "Standard";

    document.getElementById("qtyDisplay").textContent = "1";

    const img = document.getElementById("lb-image");
    img.src = product.image;
    img.alt = product.name;

    document.getElementById("lb-title").textContent = product.name;
    document.getElementById("lb-description").textContent = product.description;
    document.getElementById("lb-material").textContent = product.material;

    // Dimensi
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

    // Volume
    const volRow = document.getElementById("lb-volume-row");
    if (volRow) {
      if (product.volume && product.volume !== "N/A") {
        document.getElementById("lb-volume").textContent = product.volume;
        volRow.style.display = "flex";
      } else {
        volRow.style.display = "none";
      }
    }

    // Perks
    const perksContainer = document.getElementById("lb-perks");
    if (perksContainer) {
      perksContainer.innerHTML = "";
      if (product.perks && product.perks.length > 0) {
        product.perks.forEach((perk) => {
          const li = document.createElement("li");
          li.className = "d-flex align-items-start gap-2 mb-1";
          li.innerHTML = `<i data-lucide="check-circle-2" class="text-primary mt-0.5" style="width:14px;height:14px;"></i><span>${perk}</span>`;
          perksContainer.appendChild(li);
        });
      } else {
        perksContainer.innerHTML =
          "<li class='text-muted'>Tidak ada informasi tambahan</li>";
      }
    }

    // Colors
    const colorsContainer = document.getElementById("lb-colors");
    colorsContainer.innerHTML = "";
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
        updateWhatsAppLink(product);
      });
      colorsContainer.appendChild(btn);
    });

    // Quantity controls - remove old listeners by cloning
    const qtyDec = document.getElementById("qtyDec");
    const qtyInc = document.getElementById("qtyInc");
    const qtyDisplay = document.getElementById("qtyDisplay");

    const newQtyDec = qtyDec.cloneNode(true);
    const newQtyInc = qtyInc.cloneNode(true);
    qtyDec.parentNode.replaceChild(newQtyDec, qtyDec);
    qtyInc.parentNode.replaceChild(newQtyInc, qtyInc);

    newQtyDec.addEventListener("click", () => {
      if (currentQty > 1) {
        currentQty--;
        qtyDisplay.textContent = currentQty;
        updateWhatsAppLink(product);
      }
    });

    newQtyInc.addEventListener("click", () => {
      currentQty++;
      qtyDisplay.textContent = currentQty;
      updateWhatsAppLink(product);
    });

    const updateWhatsAppLink = (p) => {
      const waBtn = document.getElementById("lb-wa-btn");
      if (!waBtn) return;
      const phone = "6282210210020";
      const text = `Halo PT. Dimas Febry Prasetyo, saya tertarik dengan produk:

*Nama*: ${p.name}
*Kategori*: ${p.category.toUpperCase()}
*Warna*: ${selectedColor || "Standard"}
*Jumlah*: ${currentQty} pcs
*Tujuan*: Info stok & harga grosir (B2B)

Mohon dibalas via WhatsApp. Terima kasih.`;
      waBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    };

    updateWhatsAppLink(product);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";

    // Recreate icons inside lightbox
    if (window.lucide) setTimeout(() => lucide.createIcons(), 100);
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

  // Close lightbox with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // ================================================================
  // 11. CONTACT FORM (jika ada)
  // ================================================================
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccessAlert");
  if (contactForm && formSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formSuccess.classList.remove("d-none");
      contactForm.classList.add("d-none");
      showToast("Pesan berhasil dikirim! ✅", "success");
      setTimeout(() => {
        formSuccess.classList.add("d-none");
        contactForm.classList.remove("d-none");
        contactForm.reset();
      }, 4000);
    });
  }

  // ================================================================
  // 12. COOKIE CONSENT
  // ================================================================
  const cookieConsent = document.getElementById("cookieConsent");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieSettings = document.getElementById("cookieSettings");

  if (cookieConsent && !localStorage.getItem("cookieConsent")) {
    setTimeout(() => {
      cookieConsent.style.display = "block";
    }, 1500);
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
      showToast("Pengaturan cookie dibuka", "info");
    });
  }

  // ================================================================
  // 13. TOAST NOTIFICATION SYSTEM
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
        <button class="btn btn-sm p-0 ms-auto text-muted" style="font-size:16px;">&times;</button>
      </div>
    `;
    // Close button event
    toast.querySelector("button")?.addEventListener("click", () => {
      if (toast.parentElement) toast.remove();
    });
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4000);
  }
  window.showToast = showToast;

  // ================================================================
  // 14. PWA INSTALLATION
  // ================================================================
  let deferredPrompt;
  const pwaBanner = document.getElementById("pwaBanner");
  const pwaInstallBtn = document.getElementById("pwaInstallBtn");
  const pwaLaterBtn = document.getElementById("pwaLaterBtn");
  const pwaCloseBtn = document.getElementById("pwaCloseBtn");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaBanner) {
      setTimeout(() => {
        pwaBanner.style.display = "flex";
      }, 3000);
    }
  });

  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("PWA install outcome:", outcome);
        deferredPrompt = null;
        if (pwaBanner) pwaBanner.style.display = "none";
      }
    });
  }

  if (pwaLaterBtn) {
    pwaLaterBtn.addEventListener("click", () => {
      if (pwaBanner) pwaBanner.style.display = "none";
    });
  }

  if (pwaCloseBtn) {
    pwaCloseBtn.addEventListener("click", () => {
      if (pwaBanner) pwaBanner.style.display = "none";
    });
  }

  // ================================================================
  // 15. SERVICE WORKER
  // ================================================================
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ SW registered"))
        .catch(() => console.log("⚠️ SW registration failed"));
    });
  }

  // ================================================================
  // 16. AOS INIT
  // ================================================================
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }

  // ================================================================
  // 17. LUCIDE INIT
  // ================================================================
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  console.log("✅ PT. Dimas Febry Prasetyo — Website v3.0 loaded");
});
