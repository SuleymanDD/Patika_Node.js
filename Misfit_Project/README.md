# 🚀 Misfit Project - Node.js Web Application

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## 📌 Proje Hakkında (About The Project)

Bu proje, statik bir web şablonunun (HTML/CSS/JS) tamamen **sıfırdan dinamik bir Node.js uygulamasına** dönüştürülmesiyle oluşturulmuştur. Projenin temel amacı, sadece ön yüzden ibaret olan bir tasarımı arka plan (backend) mimarisiyle entegre ederek tam donanımlı, yönetilebilir ve veri tabanı bağlantılı bir web uygulaması haline getirmektir.

Özellikle Node.js ve Express.js mimarisini anlamak, veritabanı bağlantılarını kurmak ve bir web sitesini canlı, veri odaklı bir sisteme dönüştürmek amacıyla geliştirilmiştir.

## 🛠 Neler Yapıldı? (What Was Done?)

Bu süreçte projeyi statik halden dinamik hale getirmek için şu adımlar izlendi:

1. **Sunucu Kurulumu:** Node.js ve Express.js kullanılarak yerel bir web sunucusu (server) ayağa kaldırıldı.
2. **Template Engine Entegrasyonu:** Statik HTML dosyaları parçalanarak dinamik sayfalar oluşturmak için bir şablon motoru (View Engine) ile render edilecek formata getirildi. Sayfa tekrarları (Header, Footer vb.) önlendi.
3. **Statik Dosya Yönetimi:** CSS, fontlar, resimler ve istemci taraflı JS dosyaları Express üzerinden "public" klasöründe dışarıya sunuldu.
4. **Veritabanı Modellemesi:** MongoDB ile bağlantı kurularak, Mongoose ODM kullanıldı ve projenin ihtiyaç duyduğu veri şemaları (modeller) oluşturuldu.
5. **Dinamik Yönlendirme (Routing):** Uygulama içindeki sayfalar arası geçişler, form gönderimleri ve API istekleri için MVC (Model-View-Controller) mantığına uygun Route ve Controller yapıları kuruldu.

## 💻 Kullanılan Teknolojiler (Built With)

Proje geliştirme sürecinde aşağıdaki temel teknolojiler kullanılmıştır:

* **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
* **Veritabanı:** [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
* **Görünüm (View) / Template Engine:** EJS (veya projede kullanılan şablon motoru)
* **Araçlar:** Nodemon, dotenv, nodemailer
* **Frontend:** Temel statik web şablonu (HTML5, CSS3, JavaScript)

## 🚀 Kurulum ve Çalıştırma (Getting Started)

Projeyi kendi bilgisayarınızda (lokalinizde) çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

### Gereksinimler (Prerequisites)
* Bilgisayarınızda [Node.js](https://nodejs.org/) kurulu olmalıdır.
* Bilgisayarınızda veya bulutta (MongoDB Atlas) çalışan bir [MongoDB](https://www.mongodb.com/try/download/community) bağlantısı olmalıdır.

### Kurulum Adımları (Installation)

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/SuleymanDD/Patika_Node.js.git
   ```
2. İlgili proje dizinine gidin:
   ```bash
   cd Patika_Node.js/Misfit_Project
   ```
3. Gerekli bağımlılıkları (paketleri) yükleyin:
   ```bash
   npm install
   ```
4. Veritabanı bağlantısı vb. ayarlar için ana dizinde bir `.env` dosyası oluşturun:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/misfit-db
   ```
5. Projeyi başlatın:
   ```bash
   npm start
   ```
   

6. Tarayıcınızda `http://localhost:3000` adresine giderek projeyi görüntüleyin.

## 📁 Proje Yapısı (Project Structure)

```text
Misfit_Project/
├── controllers/    # Sayfa ve API iş kurallarının yazıldığı bölüm
├── models/         # MongoDB (Mongoose) veritabanı koleksiyon yapıları
├── public/         # Statik dosyalar (CSS, JS, Görseller)
├── utils/          # Mail gönderme fonksiyonları
├── views/          # Dinamik HTML şablonları 
├── app.js          # Express URL yönlendirmeleri, Middleware ve sunucu ayarları
└── package.json    # Proje bağımlılıkları (dependencies)
```

## 🤝 Katkıda Bulunma (Contributing)
Projeye öneri veya katkıda bulunmak isterseniz:
1. Bu repoyu "Fork"layın.
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/YeniOzellik`)
3. Değişikliklerinizi commit'leyin (`git commit -m 'Harika bir özellik eklendi'`)
4. Dalınızı push'layın (`git push origin feature/YeniOzellik`)
5. Bir "Pull Request" (Çekme İsteği) oluşturun.

---
⭐ *Eğer projeyi beğendiyseniz repoya yıldız (star) vermeyi unutmayın!*