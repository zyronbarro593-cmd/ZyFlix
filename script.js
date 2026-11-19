// =========================================================
// ZYFLIX — Interactive Teleportation, Kinetic Cards, Modal,
// Dual-Mode Cigarettes After Sex Soundtrack & Screen-Crack Dark Mode
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Teleportation for all internal anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", targetId);
      }
    });
  });

  // 2. Interactive 3D Cursor Tilt on Navigation Boxes & Media Cards
  const interactiveCards = document.querySelectorAll(".nav-box, .media-card");
  interactiveCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = (x * 10).toFixed(2);
      const rotateX = (-y * 10).toFixed(2);
      card.style.transform = `translateY(-12px) scale(1.045) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // 3. Interactive Spotlight Modal when clicking any Card or Info Trigger
  const modal = document.getElementById("cardModal");
  const modalDialog = modal ? modal.querySelector(".modal-dialog") : null;
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalImg = document.getElementById("modalImg");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");

  const openModal = (card) => {
    if (!modal || !modalImg) return;
    const isWideBoard = card.classList.contains("btn-screen-info");
    if (modalDialog) {
      modalDialog.classList.toggle("is-wide-modal", isWideBoard);
    }

    // Center movie/series/game/song posters, frame upper-center faces for portrait photos
    const cat = (card.dataset.category || "").toUpperCase();
    if (
      cat.includes("MOVIES") ||
      cat.includes("SERIES") ||
      cat.includes("GAMES") ||
      cat.includes("SONGS") ||
      cat.includes("CONTACT") ||
      cat.includes("GRADE") ||
      cat.includes("SHS")
    ) {
      modalImg.style.objectPosition = "center center";
    } else {
      modalImg.style.objectPosition = "center 16%";
    }

    modalImg.src = card.dataset.img || "";
    modalImg.alt = card.dataset.title || "";
    if (modalCategory) modalCategory.textContent = card.dataset.category || "";
    if (modalTitle) modalTitle.textContent = card.dataset.title || "";
    if (modalSubtitle) modalSubtitle.textContent = card.dataset.subtitle || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll(".media-card, .media-card-trigger").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // 4. Floating Back-to-Top Teleport Button Visibility
  const backToTop = document.getElementById("backToTop");
  window.addEventListener(
    "scroll",
    () => {
      if (!backToTop) return;
      if (window.scrollY > 360) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    },
    { passive: true }
  );

  // 5. Dual-Mode Soundtrack (Light Mode vs. Dark Mode — Smooth Fade & Seamless Crossfade Loop)
  const lightTrack = {
    title: "DREAMS FROM BUNKER HILL",
    artist: "CIGARETTES AFTER SEX",
    src: "assets/dreams-from-bunker-hill.aac"
  };

  const darkTrack = {
    title: "SUNSETZ",
    artist: "CIGARETTES AFTER SEX",
    src: "assets/sunsetz.mp3"
  };

  let activeTrack = lightTrack;

  const toggleBtn = document.getElementById("umaasaToggle");
  const toggleText = document.getElementById("musicToggleText");
  const trackTitleEl = document.getElementById("trackTitle");
  const trackArtistEl = document.getElementById("trackArtist");
  const trackInfoBox = document.getElementById("trackInfoBox");
  const audioA = document.getElementById("bgMusicA");
  const audioB = document.getElementById("bgMusicB");

  let isPlaying = false;
  let isCrossfading = false;
  let activeAudio = audioA;
  let standbyAudio = audioB;
  let fadeTimer = null;

  const FADE_DURATION_MS = 2200; // 2.2-second smooth crossfade between modes & loops
  const AUTO_CROSSFADE_LEAD_SEC = 3.2; // Start seamless crossfade loop 3.2s before track ends

  const updateTrackUI = (trackObj, animate = true) => {
    if (!trackObj) return;
    if (animate && trackInfoBox) {
      trackInfoBox.classList.add("is-switching");
      setTimeout(() => {
        if (trackTitleEl) trackTitleEl.textContent = trackObj.title;
        if (trackArtistEl) trackArtistEl.textContent = trackObj.artist;
        trackInfoBox.classList.remove("is-switching");
      }, 160);
    } else {
      if (trackTitleEl) trackTitleEl.textContent = trackObj.title;
      if (trackArtistEl) trackArtistEl.textContent = trackObj.artist;
    }
  };

  const updateToggleStateUI = (playing) => {
    if (!toggleBtn) return;
    toggleBtn.classList.toggle("is-on", playing);
    toggleBtn.setAttribute("aria-pressed", playing ? "true" : "false");
    if (toggleText) toggleText.textContent = playing ? "ON" : "OFF";
  };

  const clearFadeTimer = () => {
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
  };

  const rampVolume = (audioEl, fromVol, toVol, durationMs, onComplete) => {
    clearFadeTimer();
    const steps = 24;
    const stepTime = Math.max(20, Math.floor(durationMs / steps));
    let currentStep = 0;
    audioEl.volume = Math.max(0, Math.min(1, fromVol));

    fadeTimer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const nextVol = fromVol + (toVol - fromVol) * progress;
      audioEl.volume = Math.max(0, Math.min(1, nextVol));

      if (currentStep >= steps) {
        clearFadeTimer();
        audioEl.volume = Math.max(0, Math.min(1, toVol));
        if (onComplete) onComplete();
      }
    }, stepTime);
  };

  const transitionToTrack = (trackObj) => {
    if (!activeAudio || !standbyAudio || !trackObj) return;
    activeTrack = trackObj;
    updateTrackUI(activeTrack, true);

    if (!isPlaying) {
      activeAudio.src = activeTrack.src;
      activeAudio.load();
      return;
    }

    isCrossfading = true;
    clearFadeTimer();

    const outgoing = activeAudio;
    const incoming = standbyAudio;
    const targetSrc = activeTrack.src;

    // If outgoing is paused, play directly on activeAudio to preserve browser user-gesture permission
    if (outgoing.paused) {
      outgoing.src = targetSrc;
      outgoing.currentTime = 0;
      outgoing.volume = 0;
      outgoing
        .play()
        .then(() => {
          updateToggleStateUI(true);
          rampVolume(outgoing, 0, 1, 1200, () => {
            isCrossfading = false;
          });
        })
        .catch((err) => {
          console.warn("Direct playback error:", err);
          isCrossfading = false;
          isPlaying = false;
          updateToggleStateUI(false);
        });
      return;
    }

    incoming.src = targetSrc;
    incoming.currentTime = 0;
    incoming.volume = 0;

    const startOutVol = outgoing.volume || 1;

    incoming
      .play()
      .then(() => {
        updateToggleStateUI(true);
        const steps = 28;
        const stepTime = Math.max(25, Math.floor(FADE_DURATION_MS / steps));
        let step = 0;

        fadeTimer = setInterval(() => {
          step++;
          const progress = step / steps;
          incoming.volume = Math.max(0, Math.min(1, progress));
          if (!outgoing.paused) {
            outgoing.volume = Math.max(0, Math.min(1, startOutVol * (1 - progress)));
          }

          if (step >= steps) {
            clearFadeTimer();
            outgoing.pause();
            outgoing.currentTime = 0;
            incoming.volume = 1;
            activeAudio = incoming;
            standbyAudio = outgoing;
            isCrossfading = false;
          }
        }, stepTime);
      })
      .catch(() => {
        // Fallback: if standbyAudio was not yet unlocked by browser, reuse outgoing element seamlessly
        clearFadeTimer();
        outgoing.pause();
        outgoing.src = targetSrc;
        outgoing.currentTime = 0;
        outgoing.volume = 0;
        outgoing
          .play()
          .then(() => {
            updateToggleStateUI(true);
            rampVolume(outgoing, 0, 1, 1100, () => {
              isCrossfading = false;
            });
          })
          .catch((err2) => {
            console.warn("Fallback playback error:", err2);
            isCrossfading = false;
          });
      });
  };

  if (toggleBtn && audioA && audioB) {
    const handleTimeUpdate = (e) => {
      const el = e.target;
      if (el !== activeAudio || !isPlaying || isCrossfading) return;
      if (
        el.duration &&
        isFinite(el.duration) &&
        el.duration > 10 &&
        el.duration - el.currentTime <= AUTO_CROSSFADE_LEAD_SEC
      ) {
        // Seamlessly crossfade-loop the current mode's song
        transitionToTrack(activeTrack);
      }
    };

    const handleTrackEnded = (e) => {
      const el = e.target;
      if (el !== activeAudio || !isPlaying || isCrossfading) return;
      transitionToTrack(activeTrack);
    };

    [audioA, audioB].forEach((aud) => {
      aud.addEventListener("timeupdate", handleTimeUpdate);
      aud.addEventListener("ended", handleTrackEnded);
    });

    toggleBtn.addEventListener("click", () => {
      if (standbyAudio && standbyAudio.paused && !standbyAudio.getAttribute("src")) {
        standbyAudio.volume = 0;
      }

      if (!isPlaying) {
        isPlaying = true;
        isCrossfading = false;
        if (!activeAudio.getAttribute("src")) {
          activeAudio.src = activeTrack.src;
        }
        activeAudio.volume = 0;
        activeAudio
          .play()
          .then(() => {
            updateToggleStateUI(true);
            rampVolume(activeAudio, 0, 1, 900);
          })
          .catch((err) => {
            console.warn("Audio playback blocked:", err);
            isPlaying = false;
            updateToggleStateUI(false);
          });
      } else {
        isPlaying = false;
        isCrossfading = false;
        updateToggleStateUI(false);
        standbyAudio.pause();
        const startVol = activeAudio.volume || 1;
        rampVolume(activeAudio, startVol, 0, 650, () => {
          activeAudio.pause();
        });
      }
    });

    updateTrackUI(lightTrack, false);
  }

  // 6. Activities "Remind Me" Interactive Button
  const remindMeBtn = document.getElementById("remindMeBtn");
  const remindMeText = document.getElementById("remindMeText");
  if (remindMeBtn && remindMeText) {
    remindMeBtn.addEventListener("click", () => {
      const active = remindMeBtn.classList.toggle("is-reminded");
      remindMeBtn.setAttribute("aria-pressed", active ? "true" : "false");
      remindMeText.textContent = active ? "Reminder Set ✓" : "Remind Me";
    });
  }

  // 7. Copy Contact Handle/Email to Clipboard on Contact Card Click
  document.querySelectorAll(".contact-wide-card").forEach((card) => {
    card.addEventListener("click", () => {
      const copyVal = card.dataset.copy;
      if (copyVal && navigator.clipboard) {
        navigator.clipboard.writeText(copyVal).catch(() => {});
      }
    });
  });

  // 8. Circular Crescent Moon Dark Mode Toggle with Screen-Crack Animation
  //    & Synchronous User-Gesture Audio Switch
  const darkModeBtn = document.getElementById("darkModeToggle");
  const crackOverlay = document.getElementById("screenCrackOverlay");
  const heroBgImg = document.getElementById("heroBgImg");
  const themeBgImgs = document.querySelectorAll(".theme-bg-img");
  const navBoxImgs = document.querySelectorAll(".nav-box-img");
  const aboutLightContent = document.getElementById("aboutLightContent");
  const aboutDarkContent = document.getElementById("aboutDarkContent");

  let isDarkMode = false;
  let isTransitioningMode = false;

  const applyVisualModeState = (darkActive) => {
    document.body.classList.toggle("dark-mode", darkActive);

    if (darkModeBtn) {
      darkModeBtn.classList.toggle("is-on", darkActive);
      darkModeBtn.setAttribute("aria-pressed", darkActive ? "true" : "false");
    }

    // 1. Swap Homepage Background Picture & Ambient Section Backdrops
    if (heroBgImg) {
      heroBgImg.src = darkActive
        ? heroBgImg.dataset.darkSrc || "assets/hero-dark-ame.jpg"
        : heroBgImg.dataset.lightSrc || "assets/hero-ruki-gazette.jpg";
    }
    themeBgImgs.forEach((img) => {
      img.src = darkActive
        ? img.dataset.darkSrc || "assets/hero-dark-ame.jpg"
        : img.dataset.lightSrc || "assets/hero-ruki-gazette.jpg";
    });

    // 2. Swap the 5 Homepage Navigation Box Pictures
    navBoxImgs.forEach((img) => {
      img.src = darkActive
        ? img.dataset.darkSrc || img.src
        : img.dataset.lightSrc || img.src;
    });

    // 3. Swap About Me Rows Between Light Mode and Dark Mode
    if (aboutLightContent && aboutDarkContent) {
      if (darkActive) {
        aboutLightContent.classList.add("is-hidden");
        aboutLightContent.setAttribute("aria-hidden", "true");
        aboutDarkContent.classList.remove("is-hidden");
        aboutDarkContent.setAttribute("aria-hidden", "false");
      } else {
        aboutDarkContent.classList.add("is-hidden");
        aboutDarkContent.setAttribute("aria-hidden", "true");
        aboutLightContent.classList.remove("is-hidden");
        aboutLightContent.setAttribute("aria-hidden", "false");
      }
    }
  };

  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      if (isTransitioningMode) return;
      isTransitioningMode = true;
      const targetMode = !isDarkMode;

      // Switch track & start playback SYNCHRONOUSLY inside click gesture so browsers allow autoplay
      const nextTrack = targetMode ? darkTrack : lightTrack;
      isPlaying = true;
      updateToggleStateUI(true);
      transitionToTrack(nextTrack);

      // Trigger Screen-Crack Overlay & Screen Shake
      if (crackOverlay) {
        crackOverlay.classList.remove("is-cracking");
        void crackOverlay.offsetWidth;
        crackOverlay.classList.add("is-cracking");
      }
      document.body.classList.remove("is-shaking");
      void document.body.offsetWidth;
      document.body.classList.add("is-shaking");

      // Swap visual theme, homepage background, 5 nav boxes, and About Me rows at crack peak
      setTimeout(() => {
        isDarkMode = targetMode;
        applyVisualModeState(isDarkMode);
      }, 360);

      setTimeout(() => {
        if (crackOverlay) crackOverlay.classList.remove("is-cracking");
        document.body.classList.remove("is-shaking");
        isTransitioningMode = false;
      }, 940);
    });
  }
});
