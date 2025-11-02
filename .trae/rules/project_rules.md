# Prayer Times Lite – Proje Kuralları ve Uygulama Standartları

Bu doküman, Prayer Times Lite projesi için teknik, mimari ve süreç kurallarını belirler. Amaç; minimal, odaklı ve çok dilli bir ezan vakti uygulamasını sürdürülebilir şekilde geliştirmek ve yayınlamaktır. Kurallar; QWEN yönergeleri ve “Ezan_vakti_plan.md” gereksinimleriyle uyumludur.

## Amaç ve Kapsam
- Odak: 6 vakit göstergesi, bir sonraki vakte geri sayım, konum seçimi, tema ve çoklu dil.
- Minimalist tasarım; dikkat dağıtmayan bir arayüz ve akıcı performans.
- Offline dostu: Cache ve localStorage kullanımı.
- TR/EN/AR dillerinde tam destek; Arapça için RTL dikkate alınır.

## Teknoloji ve Versiyonlar
- Framework: `React 18.x` + `Vite 6.x`.
- Stil: `TailwindCSS` (dark mode class yaklaşımı; v4 CSS-first destekli yapı uygunsa kullanılır).
- Tarih/Zaman: `day.js` (+ duration/timezone eklentileri gerekirse).
- İkonlar: `lucide-react`.
- Depolama: `LocalStorage API`.
- Konum: `Browser Geolocation API`.
- API’ler: Birincil `ezanvakti.imsakiyem.com`, yedek `aladhan.com`.

## Mimari İlkeler
- Fonksiyonel bileşenler ve React hooks; sınıf bileşeni yok.
- Tek sorumluluk prensibi; her bileşen ve hook net bir amaç taşır.
- Basit veri akışı: Props + custom hooks; global state eklemek gerekmedikçe kaçınılır.
- Yerleşik proje yapısı korunur; dosya yerleşimi tutarlı ve öngörülebilir olur.

## Kodlama Standartları
- React en iyi pratikleri ve modern hook pattern’leri.
- Yeni dosyalarda tip güvencesi: Tercihen TypeScript; JS ise JSDoc ile türler belgelenir.
- Tailwind utility sınıfları kullanılır; özel CSS sadece gerekliyse.
- Tutarlı biçimlendirme ve isimlendirme; dosya ve fonksiyon adları anlamlı.
- Hata ve kenar durumları her zaman ele alınır (loading, empty, error).

## Dizin Yapısı ve Yerleşim
- Bileşenler: `src/components/`
- Hook’lar: `src/hooks/`
- Yardımcılar: `src/utils/`
- Sabitler: `src/constants/`
- Ana girişler: `src/App.jsx`, `src/main.jsx`, `src/index.css`
- Çeviri sistemi: `src/constants/translations.js`
- Mevcut dosya ve klasör yapısı korunur; yeni öğeler ilgili dizine eklenir.

## UI/UX İlkeleri
- Minimal ve modern; gereksiz görsel karmaşadan kaçın.
- Büyük, dokunulabilir hedefler; mobil öncelikli tasarım.
- Karanlık/Aydınlık tema arasında yumuşak geçiş.
- Aktif vakitler net vurgulanır; geçmiş vakitler soluk gösterilir.
- Animasyonlar hafif ve performans dostu; SVG progress için akıcı stroke animasyonu.

## Çoklu Dil ve RTL
- Tüm yeni UI metinleri `src/constants/translations.js` içine eklenir.
- Dil anahtarı: `tr` (varsayılan), `en`, `ar`.
- Arapça için RTL düzeni ve tipografi uyumu (gerekirse `dir="rtl"` konteksinde).
- Dil değişimi `useLanguage` ile yönetilir; `document.documentElement.lang` güncellenir.

## TailwindCSS Kullanımı
- Dark mode: `document.documentElement` üzerine `dark` sınıfı.
- Tema renkleri: Ana yeşil `#10b981`, vurgu amber `#f59e0b` (index.css temasıyla uyumlu).
- Responsive grid ve spacing; utility-first yaklaşım.
- CSS yazımı kaçınılır; gerektiğinde sınırlı, bileşen içi stiller.

## Zaman ve Tarih İşlemleri
- `day.js` kullanılır; zaman farkları ve geri sayım için `duration` eklentisi.
- Gece yarısı (midnight) geçişleri ve son vakitten sonraki Fajr hesaplaması doğru ele alınır.
- Zaman dilimi farklılıklarında tutarlılık (tarayıcı time zone; gerekirse plugin).

## API Stratejisi ve Entegrasyon
- Birincil: `ezanvakti.imsakiyem.com`. Yedek: `aladhan.com` (koordinat bazlı zamanlar).
- Tüm çağrılar `src/utils/api.js` üzerinden yapılır; doğrudan fetch çağrılarından kaçınılır.
- Aylık veri çekilip cache’lenir; bugünün verileri filtrelenerek kullanılır.
- Uç nokta ve parametrelerde hata yönetimi, zaman aşımı (örn. 10sn) ve geri dönüş değerleri açıkça ele alınır.

## Cache, Offline ve Storage
- Cache anahtarı: `districtId` + `startDate`; süre: 30 gün.
- LocalStorage yazma/okuma hataları güvenli şekilde ele alınır (try/catch, doğrulama).
- İnternet yoksa mevcut cache ile çalışma; cache yoksa kullanıcıya anlaşılır hata.

## Rate Limit ve Retry
- 429 durumunda bekleme (örn. 5dk) ve maksimum 3 deneme.
- Kullanıcıya durum bilgisi verilir; bekleme sırasında yeniden dene seçeneği sunulabilir.

## Geolocation ve Reverse Geocoding
- `useGeolocation` ile GPS izni ve konum alınır; tüm hata kodları kullanıcı dostu mesajlara çevrilir.
- Reverse geocode: Nominatim ile ilçe adı; ardından Ezanvakti API’de ilçe arama (districtId bulma).
- Alternatif: Koordinatla Aladhan zamanları; mümkünse Ezanvakti veri modeline geri dönüş.

## Custom Hooks Kullanım İlkeleri
- `useTheme`: Tema durumu + `dark` sınıf yönetimi; localStorage persistansı.
- `useLanguage`: Dil durumu; `document.documentElement.lang` ve localStorage.
- `useGeolocation`: `getLocation()` Promise; loading ve error state’leri.
- `usePrayerTimes`: Konuma göre aylık verileri al, bugünü filtrele; midnight auto-refresh.
- Hook’lar yan etkilerini temizler; `setInterval` temizliği şarttır.

## Bileşen Kuralları
- `Header`: Tema toggle, dil seçici, konum adı ve “Konumu Değiştir”; sticky, glass morphism.
- `LocationPicker`: GPS ve manuel seçenek; cascade dropdown (ülke/şehir/ilçe), arama ve localStorage kaydı.
- `CountdownTimer`: HH:MM:SS gerçek zamanlı; dairesel SVG progress; son vakitten sonra Fajr’a geri sayım.
- `PrayerTimesGrid`: 6 vakit kartı; aktif/gelecek/geçmiş durum stilleri; çeviri ve ikon eşlemesi.
- Hesaplama metodu seçici (opsiyonel): Mevcut mimariyle uyumlu ek bileşenler.

## Durum Yönetimi ve Persistans
- Yerel state + custom hooks; global state kütüphanesi gerekmedikçe kullanılmaz.
- `localStorage` ile tema, dil ve seçilen konum saklanır.
- `App.jsx` orkestrasyonu: konum yoksa `LocationPicker`, varsa ana modül.

## Erişilebilirlik (a11y)
- ARIA etiketleri ve roller; klavye ile gezilebilirlik.
- Yeterli renk kontrastı (> 4.5:1) ve odak göstergeleri.
- İkonlar için anlamlı `aria-label`/`title` metni.

## Performans ve Optimizasyon
- Uzun listelerde gerekirse virtualization/lazy.
- Hesaplamalar `useMemo`, eventler `useCallback` ile optimize edilir.
- SVG animasyonları akıcı ve düşük maliyetlidir.
- Gereksiz render’lar önlenir; uygun yerlerde `React.memo`.

## Test ve Doğrulama
- Çoklu dil testleri; TR/EN/AR metinleri ve RTL düzeni.
- Responsive kontroller: mobil, tablet, desktop; grid sütunları ve dokunma hedefleri.
- Tema geçişleri, geri sayım doğruluğu ve midnight yenileme.
- API hataları, offline durum ve cache fallback senaryoları.
- Entegre olduktan sonra bileşenlerin birlikte çalışması (App entegrasyonu).

## Dokümantasyon
- Yeni özelliklerde ilgili `docs/*.md` dosyaları güncellenir.
- Hook ve yardımcı fonksiyonlarda JSDoc açıklamaları eklenir.
- Bileşenlerin props ve kullanım örnekleri belgelendirilir.

## Dağıtım ve Build
- `npm run build` ile üretim derlemesi; çıktı `dist/`.
- Vercel (veya eşdeğeri) için `vercel.json` ve SPA yönlendirmeleri (gerekirse).
- `index.html` meta etiketleri ve font preload; favicon ve manifest (opsiyonel PWA).
- Bundle optimizasyonu: minify, tree-shake, kod bölme.

## Güvenlik ve Gizlilik
- GPS ve konum verileri sadece client tarafında; server’a hassas veri gönderilmez.
- LocalStorage’a yalnızca gerekli ve anonim veriler; kişisel veri saklanmaz.
- Üçüncü parti API kullanımında rate limit ve hizmet şartlarına uyum.

## İş Akışı ve İzleme
- `Progress.md` her görev sonrası güncellenir; harcanan süre ve durum eklenir.
- `docs/tasks.md` yönergelerine göre görevler belgelenir ve tamamlanma kriterleri kaydedilir.
- Pull request/commit mesajları açıklayıcı ve kapsamlı olur (gerektiğinde).

## Başarı Kriterleri
- Konum seçimi (GPS + manuel) sorunsuz.
- 6 vakit doğru ve tutarlı gösteriliyor.
- Countdown saniyelik güncelleniyor; midnight geçişi doğru.
- Dark mode tutarlı; dil değişimi tüm metinlere yansıyor.
- Mobile-first responsive; performans akıcı.
- Cache ve offline fallback çalışıyor; hata durumları yönetiliyor.
- Deploy edilmiş üretim sürümü doğrulanmış.

## V2 İçin Notlar (Opsiyonel)
- PWA desteği, bildirimler, widget modu.
- Kıble yönü, yakın camiler, dualar.
- Alternatif hesaplama metodları ve gelişmiş ayarlar.
