function dlStripLocalePrefix(pathname) {
    if (pathname === '/en') return '/';
    if (pathname.indexOf('/en/') === 0) {
        var rest = pathname.slice(3);
        return rest.charAt(0) === '/' ? rest : '/' + rest;
    }
    return pathname;
}

function dlPathForLang(lang) {
    var bare = dlStripLocalePrefix(location.pathname) || '/';
    if (lang === 'en') return bare === '/' ? '/en' : '/en' + bare;
    return bare;
}

function dlPathLang() {
    var p = location.pathname;
    return (p === '/en' || p.indexOf('/en/') === 0) ? 'en' : null;
}

function dlReadCookieLang() {
    var m = document.cookie.match(/(?:^|; )dl_lang=(pt|en)/);
    return m ? m[1] : null;
}

function dlShouldLocalizePath(path) {
    return path === '/' ||
        path.indexOf('/reservar') === 0 ||
        path.indexOf('/tours/') === 0 ||
        path.indexOf('/executive') === 0 ||
        path.indexOf('/privacidade') === 0 ||
        path.indexOf('/cookies') === 0 ||
        path.indexOf('/termos') === 0 ||
        path.indexOf('/sgpd') === 0;
}

/** Mantém links internos alinhados com /en quando o idioma é inglês. */
function localizeInternalLinks(lang) {
    document.querySelectorAll('a[href]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) !== '/') return;
        if (href.indexOf('//') === 0) return;

        var path = href;
        var qs = '';
        var hash = '';
        var qi = path.indexOf('?');
        if (qi >= 0) { qs = path.slice(qi); path = path.slice(0, qi); }
        var hi = path.indexOf('#');
        if (hi >= 0) { hash = path.slice(hi); path = path.slice(0, hi); }

        path = dlStripLocalePrefix(path);
        if (!dlShouldLocalizePath(path)) return;

        if (lang === 'en') {
            path = path === '/' ? '/en' : '/en' + path;
        }
        a.setAttribute('href', path + qs + hash);
    });
}

// Função para definir idioma
function setLanguage(lang, opts) {
    var normalized = (lang === 'en' || lang === 'pt') ? lang : 'pt';
    opts = opts || {};

    localStorage.setItem('language', normalized);
    try {
        document.cookie = 'dl_lang=' + normalized + ';path=/;max-age=31536000;SameSite=Lax';
    } catch (e) { /* ignore */ }

    document.documentElement.lang = normalized === 'en' ? 'en' : 'pt-PT';
    document.documentElement.setAttribute('data-lang', normalized);

    if (opts.navigate) {
        var next = dlPathForLang(normalized);
        if (next !== location.pathname) {
            location.assign(next + location.search + location.hash);
            return;
        }
    }

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[normalized] && translations[normalized][key] !== undefined) {
            if (element.hasAttribute('data-html')) {
                element.innerHTML = translations[normalized][key];
            } else {
                element.textContent = translations[normalized][key];
            }
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach((element) => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[normalized] && translations[normalized][key]) {
            element.setAttribute('placeholder', translations[normalized][key]);
        }
    });

    document.querySelectorAll('.language-flag').forEach(flag => {
        flag.classList.remove('active');
    });
    var activeFlag = document.querySelector('.flag-' + normalized);
    if (activeFlag) {
        activeFlag.classList.add('active');
    }

    localizeInternalLinks(normalized);

    try {
        window.dispatchEvent(new CustomEvent("discoverlangchange", { detail: normalized }));
    } catch (e) { /* ignore */ }
}

function initTranslation() {
    var pathLang = dlPathLang();
    var saved = localStorage.getItem('language');
    var cookieLang = dlReadCookieLang();
    var initial = pathLang || saved || cookieLang || 'pt';
    if (initial !== 'pt' && initial !== 'en') initial = 'pt';

    setLanguage(initial);

    document.querySelectorAll('.language-flag').forEach(flag => {
        flag.addEventListener('click', () => {
            const lang = flag.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang, { navigate: true });
            }
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTranslation);
} else {
    initTranslation();
}

if (typeof window !== "undefined") {
    window.setLanguage = setLanguage;
    window.initTranslation = initTranslation;
}
