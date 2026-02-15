# Performance Optimization Guide

Az oldal teljesítménye többféle caching és optimalizálási módszer segítségével lett javítva.

## 🚀 Implementált Optimalizációk

### 1. **GZIP Compression** (Express Middleware)
- Minden HTTP válasz automatikusan gzip-el tömörítve van
- A CSS, JavaScript, HTML, és JSON fájlok ~60-80% méretcsökkenést tapasztalnak
- **Függőség:** `compression` npm package
- **Implementáció:** `app.js` middleware

### 2. **HTTP Caching Headers** (Cache-Control)
A szerver különböző cache időtartamokat állít be az adatok típusa alapján:

| Tartalom Típusa | Cache Idő | Alkalmazas |
|---|---|---|
| **HTML oldalak** | 1 óra (3600s) | Dinamikus tartalom, de nem nagyon gyakran változik |
| **CSS/JavaScript** | 7 nap (604800s) | Statikus assets, immutable |
| **Képek** | 30 nap (2592000s) | Ritkán változnak, nagy fájlméretek |
| **JSON adatok** | 30 perc (1800s) | Közepes gyakoriságú frissítések |

**Előnyök:**
- Browser cache: Felhasználó második látogatása nem tölt le adatokat
- CDN cache: Ha CDN-t használsz (pl. Cloudflare), azok is cachel fognak
- Szerver terhelés csökkentés

### 3. **Lazy Loading Images** (HTML5 Attribute)
Minden `<img>` tag-hez hozzáadva: `loading="lazy"`

```html
<img src="/picture.jpg" loading="lazy">
```

**Előnyök:**
- Képek csak akkor töltődnek le, amikor a felhasználó szétlapolódik ehhez
- Kezdeti oldalbetöltés gyorsabb
- Sávszélesség megtakarítás

### 4. **Static File Caching** (Express Static Middleware)
```javascript
app.use(express.static('public', {
  maxAge: '7d',
  etag: false
}));
```

**Előnyök:**
- CSS, JS, és képek 7 napig cachel-ódnak
- Szerver nem küldi el újra a fájlokat, ha nem változtak

---

## 📊 Teljesítmény Tesztelés

### Teszteléshez használható eszközök:

1. **Chrome DevTools**
   - F12 → Network tab → Nézd meg a válasm headereket
   - Keress: `Cache-Control` header

2. **GTmetrix**
   - https://gtmetrix.com/
   - Teljes oldal sebességteszt

3. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Mobile és Desktop sebességteszt

4. **curl parancs**
   ```powershell
   curl -I http://localhost:3000/
   # Nézd meg a válasz headereket, pl: Cache-Control: public, max-age=3600
   ```

---

## 🔧 Szerver Indítása

```bash
npm start
# vagy
node app.js
```

**Az alábbiak történnek automatikusan:**
1. ✅ Compression middleware aktív: Minden válasz gzip-el tömörített
2. ✅ Cache headers beállítva: Az oldal böngésző cache-t használ
3. ✅ Lazy loading: Képek csak szükség szerint töltődnek le
4. ✅ Static file caching: CSS/JS 7 napra cachel-ódnak

---

## 📈 Várt Teljesítmény Javulás

### Első Oldalbetöltés
- **Compression:** ~40-50% sávszélesség megtakarítás
- **Lazy Loading:** ~30-50% gyorsabb kezdeti betöltés (képek nélkül)
- **Összesen:** **2-3x gyorsabb oldalbetöltés**

### Második és Későbbi Látogatások
- **Browser Cache:** 95%+ adatok cachel-ódottak
- **Szerver nem kell újra küldenie ugyanazokat a fájlokat**
- **Szinte azonnali betöltés (csak az új tartalom töltődik le)**

---

## 🌐 Production Deployment Notes

Ha producere telepítesz (pl. Heroku, DigitalOcean):

1. **CDN-t fontolj meg** (pl. Cloudflare)
   - Még jobb caching és DDoS védelem
   
2. **HTTP/2 vagy HTTP/3 szervert** használj (nginx, Cloudflare)
   - Multiplexing = még gyorsabb

3. **Image optimization** (opcionális)
   - WebP formátum: 25-35% kisebb
   - Tool: ImageMagick, ffmpeg, vagy online service

4. **Database cache** (ha később adatbázis lesz)
   - Redis vagy Memcached
   - Csökkenti a lekérdezéseket

---

## 🎯 Following Best Practices

- ✅ **Compression:** Gzip enable
- ✅ **Caching:** Cache-Control headers
- ✅ **Lazy Loading:** Képek késleltetett betöltése
- ✅ **Static Assets:** CDN vagy long-lived cache
- ✅ **Monitoring:** DevTools-ban ellenőrizd a teljesítményt

---

## 📝 Implementálás Részletei

### app.js Módosítások

```javascript
// 1. Compression middleware
const compression = require('compression');
app.use(compression());

// 2. Static file cache
app.use(express.static('public', {
  maxAge: '7d',
  etag: false
}));

// 3. Cache-Control middleware
app.use((req, res, next) => {
  if (req.url.endsWith('.html') || req.path === '/') {
    res.set('Cache-Control', 'public, max-age=3600');  // 1 óra
  }
  if (req.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    res.set('Cache-Control', 'public, max-age=2592000, immutable');  // 30 nap
  }
  // ... további cache rules
  next();
});
```

### View Módosítások

```html
<!-- Lazy loading a képeknél -->
<img src="/picture.jpg" loading="lazy" alt="Description">
```

---

## 🎁 Extra Tippek

1. **Monitorozd az oldal teljesítményét rendszeresen**
   - Heroku: New Relic vagy Scout
   - DigitalOcean: Prometheus/Grafana

2. **Minimize CSS/JS** (opcionális, de ajánlott)
   - Tools: UglifyJS, CSSNano
   - Csökkenti a fájlméretet további 10-20%-kal

3. **Server-side rendering optimization** (ha nagyobb oldal)
   - EJS caching
   - View caching

---

**Utolsó frissítés:** 2026.02.15
**Verzió:** 1.0
