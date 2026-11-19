(() => {
  const pageCount = 12;
  const pages = document.getElementById("pages");
  const strip = document.getElementById("thumbnail-strip");
  const readerLayout = document.querySelector(".reader-layout");
  const countLabel = document.getElementById("page-count");
  const progressTrack = document.getElementById("progress-track");
  const progressFill = document.getElementById("progress-fill");
  const navPage = document.getElementById("nav-page");
  const scriptPanel = document.getElementById("script-panel");
  const scriptText = document.getElementById("script-text");
  const scriptPageLabel = document.getElementById("script-page-label");
  const voiceSelect = document.getElementById("voice-select");
  const audioStatus = document.getElementById("audio-status");
  const languageToggle = document.getElementById("language-toggle");
  const speechAvailable = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  const messages = {
    ru: {
      homeLink: "На главную", chapterLink: "К главе", heroEyebrow: "ВЕБ-МАНГА · 1 ГЛАВА",
      heroTitle: "Не пиши<br>первым", heroDescription: "Одно сообщение. Одно правило. И бан, которого можно было избежать.",
      readManga: "Читать мангу", chapterLength: "12 страниц", readingTime: "~5 минут",
      heroCaption: "ИСТОРИЯ О ПРАВИЛЕ, КОТОРОЕ ЛУЧШЕ НЕ НАРУШАТЬ", scrollToChapter: "Прокрутить к главе",
      readerLabel: "Читалка манги", readerTitle: "Не пиши первым", chapterNumber: "Глава 01",
      readingProgress: "Прогресс чтения", zoomOut: "Уменьшить страницу", zoomOutTitle: "Уменьшить (−)",
      resetZoom: "Сбросить масштаб", zoomIn: "Увеличить страницу", zoomInTitle: "Увеличить (+)",
      toggleReadingMode: "Переключить режим чтения", readingMode: "Режим: лента",
      singleMode: "Режим: одна страница", textAndAudio: "Текст и озвучка",
      openNarration: "Открыть текст для озвучки", fullscreen: "Полноэкранный режим",
      fullscreenTitle: "Полный экран (F)", navigateHint: "листать", spaceKey: "Пробел",
      speakHint: "озвучить страницу", chapterEnd: "КОНЕЦ ГЛАВЫ",
      thanksForReading: "Спасибо за чтение", backToCover: "На обложку ↑",
      pageNavigation: "Навигация по страницам", previous: "Назад", next: "Дальше",
      selectPage: "Выбрать страницу", narrationText: "Текст для озвучки", narration: "ОЗВУЧКА",
      pageText: "Текст страницы", closePanel: "Закрыть панель",
      currentPageNarration: "Текст для озвучки текущей страницы",
      scriptPlaceholder: "Вставьте сюда текст для этой страницы. Он сохранится в этом браузере.",
      scriptNote: "Текст хранится только в этом браузере. Вставьте реплики — и читалка озвучит их.",
      voice: "Голос", automatic: "Автоматический", speak: "Озвучить",
      stopNarration: "Остановить озвучку", playback: "воспроизвести", pages: "страницы",
      footerRead: "ЧИТАЙ В СВОЁМ ТЕМПЕ", footerSave: "СОХРАНЯЙ ЛЮБИМЫЕ МОМЕНТЫ",
      pageAlt: (page) => `Страница ${page} манги «Не пиши первым»`,
      pageLoadError: (page, name) => `Не удалось загрузить страницу ${page}: ${name}`,
      goToPage: (page) => `Перейти к странице ${page}`,
      pageOf: (page) => `Страница ${page} из 12`, pageLabel: (page) => `Страница ${page}`,
      modeToggle: (mode) => `Переключить режим чтения, сейчас: ${mode}`,
      switchLanguage: "Switch language to Turkish",
      pageReadError: "Не удалось прочитать сохранённый текст.",
      pageSaveError: "Не удалось сохранить текст в этом браузере.",
      textSaved: "Текст сохранён в этом браузере.",
      unsupported: "Озвучка не поддерживается этим браузером.",
      textRequired: "Сначала добавьте текст для этой страницы.",
      speaking: "Страница озвучивается…", speechDone: "Озвучка завершена.",
      speechError: (error) => `Не удалось озвучить текст: ${error}.`,
      fullscreenError: "Полноэкранный режим недоступен."
    },
    tr: {
      homeLink: "Ana sayfa", chapterLink: "Bölüme git", heroEyebrow: "WEB MANGA · 1. BÖLÜM",
      heroTitle: "İlk mesajı<br>sen atma", heroDescription: "Tek bir mesaj. Tek bir kural. Ve önlenebilecek bir hesap yasağı.",
      readManga: "Manga'yı oku", chapterLength: "12 sayfa", readingTime: "~5 dakika",
      heroCaption: "UYMAMAK GEREKEN BİR KURALIN HİKÂYESİ", scrollToChapter: "Bölüme git",
      readerLabel: "Manga okuyucu", readerTitle: "İlk mesajı sen atma", chapterNumber: "Bölüm 01",
      readingProgress: "Okuma ilerlemesi", zoomOut: "Sayfayı küçült", zoomOutTitle: "Uzaklaştır (−)",
      resetZoom: "Yakınlaştırmayı sıfırla", zoomIn: "Sayfayı büyüt", zoomInTitle: "Yakınlaştır (+)",
      toggleReadingMode: "Okuma modunu değiştir", readingMode: "Mod: kaydırma",
      singleMode: "Mod: tek sayfa", textAndAudio: "Metin ve seslendirme",
      openNarration: "Seslendirme metnini aç", fullscreen: "Tam ekran",
      fullscreenTitle: "Tam ekran (F)", navigateHint: "sayfaları çevir", spaceKey: "Boşluk",
      speakHint: "sayfayı seslendir", chapterEnd: "BÖLÜM SONU",
      thanksForReading: "Okuduğun için teşekkürler", backToCover: "Kapağa dön ↑",
      pageNavigation: "Sayfa gezintisi", previous: "Geri", next: "İleri",
      selectPage: "Sayfa seç", narrationText: "Seslendirme metni", narration: "SESLENDİRME",
      pageText: "Sayfa metni", closePanel: "Paneli kapat",
      currentPageNarration: "Bu sayfanın seslendirme metni",
      scriptPlaceholder: "Bu sayfanın metnini buraya yapıştırın. Bu tarayıcıya kaydedilir.",
      scriptNote: "Metin yalnızca bu tarayıcıda saklanır. Replikleri ekleyin, okuyucu seslendirsin.",
      voice: "Ses", automatic: "Otomatik", speak: "Seslendir",
      stopNarration: "Seslendirmeyi durdur", playback: "oynat", pages: "sayfalar",
      footerRead: "KENDİ TEMPOYLA OKU", footerSave: "FAVORİ ANLARINI SAKLA",
      pageAlt: (page) => `«İlk mesajı sen atma» mangasından ${page}. sayfa`,
      pageLoadError: (page, name) => `${page}. sayfa yüklenemedi: ${name}`,
      goToPage: (page) => `${page}. sayfaya git`,
      pageOf: (page) => `12 sayfadan ${page}. sayfa`, pageLabel: (page) => `${page}. sayfa`,
      modeToggle: (mode) => `Okuma modunu değiştir, mevcut mod: ${mode}`,
      switchLanguage: "Rusçaya geç",
      pageReadError: "Kaydedilmiş metin okunamadı.",
      pageSaveError: "Metin bu tarayıcıya kaydedilemedi.",
      textSaved: "Metin bu tarayıcıya kaydedildi.",
      unsupported: "Bu tarayıcı seslendirmeyi desteklemiyor.",
      textRequired: "Önce bu sayfanın metnini ekleyin.",
      speaking: "Sayfa seslendiriliyor…", speechDone: "Seslendirme tamamlandı.",
      speechError: (error) => `Metin seslendirilemedi: ${error}.`,
      fullscreenError: "Tam ekran modu kullanılamıyor."
    }
  };
  let language = "ru";
  try {
    language = localStorage.getItem("manga-reader-language") === "tr" ? "tr" : "ru";
  } catch (error) {
    language = "ru";
  }
  let currentPage = 1;
  let singleMode = false;
  let zoom = 1;
  let currentUtterance = null;
  let voices = [];

  const pad = (number) => String(number).padStart(2, "0");

  for (let number = 1; number <= pageCount; number += 1) {
    const imageName = `${number}-ru-tr_832x1248.png`;
    const page = document.createElement("figure");
    page.className = "manga-page";
    page.id = `page-${number}`;
    page.dataset.page = String(number);

    const image = document.createElement("img");
    image.src = imageName;
    image.alt = messages[language].pageAlt(number);
    image.loading = number < 3 ? "eager" : "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.alt = messages[language].pageLoadError(number, imageName);
      image.classList.add("image-error");
    });

    const index = document.createElement("figcaption");
    index.className = "page-index";
    index.textContent = pad(number);
    page.append(image, index);
    pages.append(page);

    const thumbnail = document.createElement("button");
    thumbnail.className = "thumbnail";
    thumbnail.type = "button";
    thumbnail.dataset.page = String(number);
    thumbnail.setAttribute("aria-label", messages[language].goToPage(number));
    const preview = document.createElement("img");
    preview.src = imageName;
    preview.alt = "";
    preview.loading = "lazy";
    const thumbnailNumber = document.createElement("span");
    thumbnailNumber.className = "thumbnail-number";
    thumbnailNumber.textContent = pad(number);
    thumbnail.append(preview, thumbnailNumber);
    thumbnail.addEventListener("click", () => setPage(number, true));
    strip.append(thumbnail);
  }

  const pageObserver = new IntersectionObserver((entries) => {
    if (singleMode) return;
    const mostVisible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
    if (mostVisible) setPage(Number(mostVisible.target.dataset.page), false);
  }, { threshold: [0.1, 0.3, 0.5] });
  document.querySelectorAll(".manga-page").forEach((page) => pageObserver.observe(page));

  function translateStaticContent() {
    const text = messages[language];
    document.documentElement.lang = language;
    document.title = language === "tr" ? "İlk mesajı sen atma — manga" : "Не пиши первым — манга";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const message = text[element.dataset.i18n];
      if (message) element.innerHTML = message;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const message = text[element.dataset.i18nAria];
      if (message) element.setAttribute("aria-label", message);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const message = text[element.dataset.i18nTitle];
      if (message) element.title = message;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const message = text[element.dataset.i18nPlaceholder];
      if (message) element.placeholder = message;
    });
    document.querySelectorAll(".manga-page img").forEach((image, index) => {
      image.alt = image.classList.contains("image-error")
        ? text.pageLoadError(index + 1, image.src.split(/[\\/]/).pop())
        : text.pageAlt(index + 1);
    });
    document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
      thumbnail.setAttribute("aria-label", text.goToPage(Number(thumbnail.dataset.page)));
    });
    languageToggle.textContent = language === "ru" ? "TR" : "RU";
    languageToggle.setAttribute("aria-label", text.switchLanguage);
    languageToggle.title = text.switchLanguage;
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    try {
      localStorage.setItem("manga-reader-language", language);
    } catch (error) {
      audioStatus.textContent = messages[language].pageSaveError;
    }
    translateStaticContent();
    updateVoices();
    setPage(currentPage, false);
  }

  function savedText(page) {
    try {
      return localStorage.getItem(`manga-script-page-${page}`) || "";
    } catch (error) {
      audioStatus.textContent = messages[language].pageReadError;
      return "";
    }
  }

  function saveText(page, text) {
    try {
      localStorage.setItem(`manga-script-page-${page}`, text);
      audioStatus.textContent = messages[language].textSaved;
    } catch (error) {
      audioStatus.textContent = messages[language].pageSaveError;
    }
  }

  function setPage(number, shouldScroll) {
    currentPage = Math.max(1, Math.min(pageCount, number));
    document.querySelectorAll(".manga-page").forEach((page) => {
      page.classList.toggle("is-active", Number(page.dataset.page) === currentPage);
    });
    document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
      const active = Number(thumbnail.dataset.page) === currentPage;
      thumbnail.classList.toggle("is-active", active);
      if (active) thumbnail.setAttribute("aria-current", "page");
      else thumbnail.removeAttribute("aria-current");
    });
    countLabel.innerHTML = `${pad(currentPage)} <span>/</span> ${pageCount}`;
    progressFill.style.width = `${(currentPage / pageCount) * 100}%`;
    progressTrack.setAttribute("aria-valuenow", String(currentPage));
    navPage.textContent = messages[language].pageOf(currentPage);
    document.getElementById("previous-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = currentPage === pageCount;
    scriptText.value = savedText(currentPage);
    scriptPageLabel.textContent = messages[language].pageLabel(currentPage);
    if (shouldScroll) {
      const target = document.getElementById(`page-${currentPage}`);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function stopSpeech() {
    if (speechAvailable) window.speechSynthesis.cancel();
    currentUtterance = null;
    audioStatus.textContent = "";
    updateSpeakButton("▶", messages[language].speak);
  }

  function updateSpeakButton(icon, label) {
    document.getElementById("speak-button").innerHTML = `<span aria-hidden="true">${icon}</span> <span>${label}</span>`;
  }

  function speakPage() {
    if (!speechAvailable) {
      audioStatus.textContent = messages[language].unsupported;
      return;
    }
    const text = scriptText.value.trim();
    if (!text) {
      audioStatus.textContent = messages[language].textRequired;
      scriptText.focus();
      return;
    }
    stopSpeech();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = language === "tr" ? "tr-TR" : "ru-RU";
    const selectedVoice = voices.find((voice) => voice.name === voiceSelect.value);
    if (selectedVoice) {
      currentUtterance.voice = selectedVoice;
      currentUtterance.lang = selectedVoice.lang;
    }
    currentUtterance.onstart = () => {
      audioStatus.textContent = messages[language].speaking;
      updateSpeakButton("Ⅱ", language === "tr" ? "Seslendiriliyor" : "Идёт озвучка");
    };
    currentUtterance.onend = () => {
      currentUtterance = null;
      audioStatus.textContent = messages[language].speechDone;
      updateSpeakButton("▶", messages[language].speak);
    };
    currentUtterance.onerror = (event) => {
      currentUtterance = null;
      audioStatus.textContent = messages[language].speechError(event.error);
      updateSpeakButton("▶", messages[language].speak);
    };
    window.speechSynthesis.speak(currentUtterance);
  }

  function updateVoices() {
    if (!speechAvailable) return;
    voices = window.speechSynthesis.getVoices();
    const previousValue = voiceSelect.value;
    voiceSelect.replaceChildren(new Option(messages[language].automatic, ""));
    voices.forEach((voice) => {
      const option = new Option(`${voice.name} (${voice.lang})`, voice.name);
      option.dataset.lang = voice.lang;
      voiceSelect.append(option);
    });
    if (voices.some((voice) => voice.name === previousValue)) voiceSelect.value = previousValue;
  }

  document.getElementById("previous-page").addEventListener("click", () => setPage(currentPage - 1, true));
  document.getElementById("next-page").addEventListener("click", () => setPage(currentPage + 1, true));
  document.getElementById("zoom-in").addEventListener("click", () => {
    zoom = Math.min(1.4, Math.round((zoom + 0.1) * 10) / 10);
    pages.style.setProperty("--page-zoom", zoom);
    document.getElementById("zoom-label").textContent = `${Math.round(zoom * 100)}%`;
  });
  document.getElementById("zoom-out").addEventListener("click", () => {
    zoom = Math.max(0.6, Math.round((zoom - 0.1) * 10) / 10);
    pages.style.setProperty("--page-zoom", zoom);
    document.getElementById("zoom-label").textContent = `${Math.round(zoom * 100)}%`;
  });
  document.getElementById("zoom-label").addEventListener("click", () => {
    zoom = 1;
    pages.style.setProperty("--page-zoom", zoom);
    document.getElementById("zoom-label").textContent = "100%";
  });
  document.getElementById("mode-toggle").addEventListener("click", (event) => {
    singleMode = !singleMode;
    pages.classList.toggle("single-mode", singleMode);
    const mode = singleMode
      ? (language === "tr" ? "tek sayfa" : "одна страница")
      : (language === "tr" ? "kaydırma" : "лента");
    event.currentTarget.title = language === "tr" ? `Mod: ${mode}` : `Режим: ${mode}`;
    event.currentTarget.setAttribute("aria-label", messages[language].modeToggle(mode));
    setPage(currentPage, false);
  });
  document.getElementById("script-toggle").addEventListener("click", () => {
    scriptPanel.hidden = false;
    readerLayout.classList.add("has-panel");
    scriptText.focus();
  });
  document.getElementById("script-close").addEventListener("click", () => {
    scriptPanel.hidden = true;
    readerLayout.classList.remove("has-panel");
  });
  document.getElementById("fullscreen-toggle").addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) await document.getElementById("reader").requestFullscreen();
      else await document.exitFullscreen();
    } catch (error) {
      audioStatus.textContent = messages[language].fullscreenError;
    }
  });
  languageToggle.addEventListener("click", () => setLanguage(language === "ru" ? "tr" : "ru"));
  scriptText.addEventListener("input", () => saveText(currentPage, scriptText.value));
  document.getElementById("speak-button").addEventListener("click", speakPage);
  document.getElementById("stop-speech").addEventListener("click", stopSpeech);

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement || target instanceof HTMLSelectElement) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPage(currentPage + 1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPage(currentPage - 1, true);
    } else if (event.code === "Space" && !event.repeat) {
      event.preventDefault();
      speakPage();
    } else if (event.key.toLowerCase() === "f") {
      document.getElementById("fullscreen-toggle").click();
    } else if (event.key === "+" || event.key === "=") {
      document.getElementById("zoom-in").click();
    } else if (event.key === "-") {
      document.getElementById("zoom-out").click();
    }
  });

  if (speechAvailable) {
    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
  } else {
    document.getElementById("speak-button").disabled = true;
    audioStatus.textContent = messages[language].unsupported;
  }

  translateStaticContent();
  setPage(1, false);
})();
