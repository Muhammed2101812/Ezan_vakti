# Proje İyileştirme Görevleri

Bu dosyada, projenin kalitesini ve sürdürülebilirliğini artırmak için tamamlanması gereken görevler listelenmektedir.

1.  **Test Altyapısı Kurulumu (Vitest):**
    - `vitest` ve ilgili paketlerin kurulumu.
    - `vite.config.js` dosyasına test yapılandırmasının eklenmesi.
    - Örnek bir test dosyasının oluşturulması.

2.  **Uluslararasılaştırma (i18n) Kütüphanesi Entegrasyonu (react-i18next):**
    - `i18next` ve `react-i18next` paketlerinin kurulumu.
    - `i18n.js` yapılandırma dosyasının oluşturulması.
    - Mevcut çeviri dosyalarının yeni yapıya uygun hale getirilmesi.
    - Bileşenlerde `useTranslation` hook'unun kullanılması.

3.  **Durum Yönetimi Kütüphanesi Ekleme (Zustand):**
    - `zustand` paketinin kurulumu.
    - Basit bir state store (örneğin, tema veya dil state'i için) oluşturulması.
    - Bileşenlerde store'un kullanılması.

4.  **Pre-commit Kancaları Kurulumu (Husky):**
    - `husky` paketinin kurulumu ve yapılandırılması.
    - `pre-commit` kancası oluşturularak `lint` ve `test` betiklerinin eklenmesi.

5.  **Prop Types Entegrasyonu:**
    - `prop-types` paketinin kurulumu.
    - Bileşenlere `propTypes` eklenerek prop türlerinin belirlenmesi.
