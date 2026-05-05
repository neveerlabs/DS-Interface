const translations = {
    en: {
        home: "Home",
        documentation: "Documentation",
        changelog: "Changelog",
        features: "Features",
        about: "About",
        getting_started: "Getting Started",
        commands_reference: "Commands Reference",
        tutorials: "Tutorials",
        ping_tools: "Ping Tools",
        ip_changer: "IP Changer",
        network_scanner: "Network Scanner",
        hotspot_manager: "Hotspot Manager",
        wireshark: "Wireshark",
        hero_title: "Network Command Center",
        hero_subtitle: "Simplify network diagnostics, scanning, and management with a clean, modern terminal toolkit.",
        get_started: "Get Started",
        github: "GitHub",
        feature_network_scanner_title: "Network Scanner",
        feature_network_scanner_desc: "Find every device on your network with a single command. Fast ARP and Nmap integration.",
        feature_device_info_title: "Device Info",
        feature_device_info_desc: "Deep hardware insights: CPU, RAM, disks, GPU, and more. All from your terminal.",
        feature_hotspot_manager_title: "Hotspot Manager",
        feature_hotspot_manager_desc: "Create and control Wi‑Fi hotspots effortlessly. Monitor clients and share internet.",
        footer_text: "Powered by <strong>neveerlabs/Interface</strong> — Released under the MIT License."
    },
    id: {
        home: "Beranda",
        documentation: "Dokumentasi",
        changelog: "Catatan Perubahan",
        features: "Fitur",
        about: "Tentang",
        getting_started: "Mulai Cepat",
        commands_reference: "Referensi Perintah",
        tutorials: "Tutorial",
        ping_tools: "Alat Ping",
        ip_changer: "Pengubah IP",
        network_scanner: "Pemindai Jaringan",
        hotspot_manager: "Manajer Hotspot",
        wireshark: "Wireshark",
        hero_title: "Pusat Kendali Jaringan",
        hero_subtitle: "Sederhanakan diagnostik, pemindaian, dan manajemen jaringan dengan perangkat terminal modern yang bersih.",
        get_started: "Mulai",
        github: "GitHub",
        feature_network_scanner_title: "Pemindai Jaringan",
        feature_network_scanner_desc: "Temukan setiap perangkat di jaringan Anda dengan satu perintah. Integrasi ARP dan Nmap cepat.",
        feature_device_info_title: "Info Perangkat",
        feature_device_info_desc: "Wawasan perangkat keras mendalam: CPU, RAM, disk, GPU, dan lainnya. Semua dari terminal Anda.",
        feature_hotspot_manager_title: "Manajer Hotspot",
        feature_hotspot_manager_desc: "Buat dan kendalikan hotspot Wi‑Fi dengan mudah. Pantau klien dan bagikan internet.",
        footer_text: "Didukung oleh <strong>neveerlabs/Interface</strong> — Dirilis di bawah Lisensi MIT."
    }
};

let currentLang = 'en';

function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            const svg = el.querySelector('svg');
            if (svg) {
                const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (textNode) {
                    textNode.textContent = translations[lang][key];
                } else {
                    const firstChild = el.firstChild;
                    if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
                        firstChild.textContent = translations[lang][key];
                    } else {
                        el.innerHTML = translations[lang][key] + (svg ? svg.outerHTML : '');
                    }
                }
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    document.getElementById('langText').textContent = lang === 'en' ? 'US' : 'IN';
    document.getElementById('mobileLangText').textContent = lang === 'en' ? 'US' : 'IN';
    currentLang = lang;
}

applyLanguage('en');

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const body = document.body;
const langToggle = document.getElementById('langToggle');
const mobileLangToggle = document.getElementById('mobileLangToggle');

const desktopDropdowns = document.querySelectorAll('.dropdown');
const desktopToggles = document.querySelectorAll('.dropdown-toggle');

desktopToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggle.parentElement;
        parent.classList.toggle('open');
    });
});

document.addEventListener('click', (e) => {
    desktopDropdowns.forEach(drop => {
        if (!drop.contains(e.target)) {
            drop.classList.remove('open');
        }
    });
});

const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
const mobileToggles = document.querySelectorAll('.mobile-dropdown-toggle');

mobileToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggle.parentElement;
        parent.classList.toggle('open');
    });
});

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

document.querySelectorAll('.nav-link, .icon-btn').forEach(item => {
    item.addEventListener('click', (e) => {
        if (!item.classList.contains('dropdown-toggle') && !item.classList.contains('mobile-dropdown-toggle') && !item.closest('.lang-toggle') && !item.closest('.lang-toggle-mobile')) {
            navMenu.classList.remove('active');
        }
    });
});

function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        body.classList.remove('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    setTheme(!isDark);
});

setTheme(true);

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'id' : 'en';
    applyLanguage(newLang);
});

mobileLangToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const newLang = currentLang === 'en' ? 'id' : 'en';
    applyLanguage(newLang);
    navMenu.classList.remove('active');
});
