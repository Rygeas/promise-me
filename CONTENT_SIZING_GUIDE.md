# Dinamik İçerik Sığdırma Rehberi (A4 Sayfalar)

## Sorun

Dinamik gelen veriler (örneğin 360.320 x 363.871 karakterlik uzun metinler) A4 sayfasına sığmayabiliyor. Bu durumda:

- Metin sayfada kalmıyor
- Otomatik yeni sayfaya geçemiyor
- Tasarım bozuluyor

## Çözüm

### 1. **CSS Overflow Kontrol** ✅

`src/input.css` dosyasında aşağıdaki kurallar tanımlandı:

```css
.a4-page {
  width: 210mm;
  height: 297mm;
  display: flex;
  flex-direction: column;
  break-after: page;
}

.a4-content {
  max-height: 267mm; /* 297mm - 30mm padding */
  overflow: hidden;
  word-break: break-word;
}

.page-content p {
  word-break: break-word;
  overflow-wrap: break-word;
  page-break-inside: avoid;
  orphans: 3;
  widows: 3;
}
```

**Ne yapıyor?**

- `word-break: break-word` → Uzun kelimeler kırılır
- `overflow-wrap: break-word` → Uzun satırlar kaydırılmaz
- `page-break-inside: avoid` → Paragraflar sayfalar arasında bölünmez
- `orphans: 3; widows: 3` → Yetim/dul satırları engeller

### 2. **PDF Rendererlama Ayarları** ✅

`src/common/utils/pdfGenarator.ts` düzeltildi:

```typescript
await page.setViewport({
  width: 794, // A4 width in pixels
  height: 1123, // A4 height in pixels
});

await page.pdf({
  format: "A4",
  printBackground: true,
  margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
});
```

**Ne yapıyor?**

- Tarayıcı viewport'u A4 boyutunda ayarlanıyor
- PDF 0 margin ile tam sayfa kullanılıyor
- Text wrapping önceden hesaplanıyor

### 3. **Template Yapısı** ✅

`src/templates/allBorder.html` örneği:

```html
<p style="word-break: break-word; overflow-wrap: break-word;">
  <strong>{{this.title}}</strong>
  <span>{{this.description}}</span>
</p>
```

**Chunk Helper Kullanımı:**

```handlebars
{{#chunk conditions 3}}
  <!-- Her 3 item'den sonra yeni sayfa -->
  <div class="a4-page">
    {{#each this.items}}
      <p>{{this.description}}</p>
    {{/each}}
  </div>
{{/chunk}}
```

### 4. **Metin Ölçüm Utilities** ✅

`src/common/utils/textMeasurement.ts` ile tahmini:

```typescript
// Metni A4'e sığdırıp sığmadığını kontrol et
const result = fitsInPage(longText);
if (!result.fits) {
  console.log(`Metin ${result.capacityPercentage}% kapasite alıyor`);
  // Yeni sayfa ekle
}

// Metni otomatik sayfalara böl
const pages = splitTextIntoPages(longText);
pages.forEach((pageContent, i) => {
  // Her sayfayı render et
});
```

### 5. **Handlebars Helpers** ✅

`src/common/utils/handlebarsHelpers.ts` properly typed:

```typescript
// chunk: Arrayı parçalara böler
{{#chunk items 3}}...{{/chunk}}

// if: Koşullu render
{{#if isFirst}}...{{/if}}

// isFirst/isLast: Sayfa pozisyonunu kontrol et
```

---

## Pratik Örnek: Uzun Metinle Test

### TestPdf.ts'te:

```typescript
export const mockData = {
  title: "Başlık",
  description: "Çok uzun açıklama metin...",
  conditions: [
    {
      title: "Madde 1",
      description: "360 karakter: Lorem ipsum dolor sit amet... (uzun metin)",
    },
    {
      title: "Madde 2",
      description: "363 karakter: Consectetur adipiscing elit... (uzun metin)",
    },
    // Daha fazla maddeler...
  ],
};
```

### Sonuç:

1. **Ilk sayfa:** Başlık + ilk 3 madde
2. **Ikinci sayfa:** Sonraki 3 madde
3. Otomatik page-break (CSS break-after: page)
4. Metin kaydırılmıyor, wrap ediliyor

---

## Font Size Ayarı (Sığdırma)

Eğer metni daha küçültmek istersen:

```html
<!-- Heading -->
<h1 class="text-4xl">{{title}}</h1>
<!-- 36px → büyük -->
<h1 class="text-3xl">{{title}}</h1>
<!-- 30px → medium -->
<h1 class="text-2xl">{{title}}</h1>
<!-- 24px → small -->

<!-- Content -->
<p class="text-lg">{{description}}</p>
<!-- 18px -->
<p class="text-base">{{description}}</p>
<!-- 16px -->
<p class="text-sm">{{description}}</p>
<!-- 14px -->
```

---

## Margin/Padding Ayarı

```html
<div class="a4-content p-40">
  <!-- p-40 = 10rem = 160px -->
  <!-- İçerik -->
</div>

<!-- Daha fazla yer için: -->
<div class="a4-content p-10">
  <!-- p-10 = 2.5rem = 40px -->
  <!-- İçerik -->
</div>
```

---

## Kontrol Listesi ✅

- [x] CSS word-break ve overflow-wrap kuralları
- [x] PDF viewport A4 boyutunda
- [x] Page break rules tanımlandı
- [x] Handlebars helpers typed
- [x] Metin ölçüm utilities
- [x] Template examples

---

## Sorun Giderme

### Metin hala taşıyor?

```css
/* Margin/padding kısalt */
.a4-content {
  padding: 10mm;
} /* 15mm → 10mm */

/* Font size küçült */
p {
  font-size: 0.9rem;
}
```

### Çok fazla boşluk?

```css
/* Line-height kısalt */
p {
  line-height: 1.3;
} /* 1.5 → 1.3 */
```

### Tasarım bozuluyor?

```css
/* Her sayfa kaydırma yerine break yap */
.page-content p {
  page-break-inside: avoid;
}
```
