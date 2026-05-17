# Ada Koza Teknik Hırdavat — Proje Rehberi

Bu dosyayı her oturumda otomatik okursun. Kullanıcıya her zaman **Türkçe** cevap ver.

---

## Proje Künyesi

| Alan | Bilgi |
|------|-------|
| Site | https://adakozateknik.com.tr (ve www.) |
| Tip | 5 sayfalı statik HTML/CSS/JS — build process yok |
| Hosting | GitHub Pages — repo: `aycangh/adakoza-teknik`, branch: `master` |
| DNS | Cloudflare (nameserver: mitch + paris) |
| Bayi alt domain | `bayi.adakozateknik.com.tr` → 176.236.142.167 (Cloudflare Proxied) |
| SSL | Let's Encrypt (GitHub Pages otomatik), https_enforced=true |
| PageSpeed | Mobil 97 / Masaüstü 100 |

---

## Müşteri Bilgileri

- **Firma:** Ada Koza Teknik Hırdavat
- **Adres:** ARİFBEY MAH. DUMAN SK. No:20A — ARİFİYE / SAKARYA
- **Telefon:** 0545 559 54 57
- **E-posta:** bilgi@adakozateknik.com.tr
- **Çalışma saatleri:** Pzt-Cuma 08:30–18:30 · Cumartesi 08:30–14:00 · Pazar Kapalı

---

## Dosya Yapısı

```
C:\claude\ADAKOZA\
├── index.html          (Anasayfa)
├── hakkimizda.html
├── urunler.html
├── markalar.html
├── iletisim.html
├── CNAME               (GitHub Pages custom domain — dokunma)
├── assets/
│   ├── css/style.css   (tek CSS dosyası)
│   ├── js/main.js      (mobil menü, scroll reveal, aktif nav)
│   ├── fonts/          (self-hosted Inter & Manrope woff2 değişken fontlar)
│   └── images/
│       ├── logo.png + logo.webp
│       └── markalar/   (11 marka: .jpeg + .webp)
└── MARKALAR/           (kaynak görseller — .gitignore'da, dokunma)
```

---

## Tasarım Sistemi

**CSS değişkenleri** (`assets/css/style.css` başında tanımlı):

```css
--primary:      #1e63d8   /* ana mavi */
--primary-dark: #154aa1   /* hover / küçük renkli metin için */
--primary-light:#dbeafe   /* açık mavi arka plan */
--text:         #0f172a   /* koyu ana metin */
--text-muted:   #64748b   /* ikincil metin */
--bg:           #ffffff
--surface:      #f5f7fa   /* kart/section arka planı */
--border:       #e3e8ef
```

**Fontlar (self-hosted, `assets/fonts/`):**
- **Inter** — gövde metni, weights 400–700
- **Manrope** — başlıklar, weights 600–800

**Kontrast kuralı (WCAG AA):**
- Küçük renkli metin (badge, label): `--primary` değil, `--primary-dark` kullan
- Açık arka zeminde ikincil metin: `--text-muted` yerine `#475569` kullan

---

## Çalışma Kuralları

- **Commit:** Kullanıcı açıkça istemediği sürece commit yapma — değişiklikleri göster, onay al
- **Push:** Push'tan önce mutlaka onay iste
- **Riskli işlemler:** Cloudflare DNS, GitHub Pages ayarları, domain değişiklikleri gibi geri alınması zor adımlarda mutlaka sor
- **Ton:** Sade ve kısa; teknik jargon yerine günlük dil
- **Yeni dosya açma:** Gereksiz dosya (özellikle .md) açma

---

## Sık Kullanılan İşlemler

### Yeni marka logosu eklemek
1. Görseli `assets/images/markalar/<slug>.jpeg` olarak kaydet
2. WebP üret: `node -e "require('sharp')('assets/images/markalar/<slug>.jpeg').webp({quality:82}).toFile('assets/images/markalar/<slug>.webp',()=>{})"` 
3. `markalar.html` ve `index.html`'de `<picture>` + WebP fallback ile ekle:
   ```html
   <picture>
     <source srcset="assets/images/markalar/<slug>.webp" type="image/webp">
     <img src="assets/images/markalar/<slug>.jpeg" alt="Marka Adı" loading="lazy" width="200" height="90">
   </picture>
   ```

### Deploy
- Sadece `git push` — GitHub Pages 1-2 dk içinde canlıya alır
- Manuel rebuild: `gh api repos/aycangh/adakoza-teknik/pages/builds --method POST`

### Performans testi
- PageSpeed: https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fadakozateknik.com.tr
- Hedef: Mobil ≥95 · Masaüstü =100
