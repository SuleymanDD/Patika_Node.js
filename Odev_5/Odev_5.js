/* -- Ödev 5 --
createServer metodunu kullanacağız.
index, hakkimda ve iletisim sayfaları oluşturalım.
Sayfalara içerik olarak xxx sayfasına hoşgeldiniz şeklinde h2 başlıkları yazdıralım.
port numarası olarak 5000'i kullanalım.
*/

const http = require("http")

const server = http.createServer((req,res) => {

    let url = req.url;

    if(url === "/index"){
        res.writeHead(200, {"Content-Type": "text/html"})
        res.write("<h2>Index sayfasina hosgeldiniz")
    }else if(url === "/hakkimda"){
        res.writeHead(200, {"Content-Type": "text/html"})
        res.write("<h2>Hakkimda sayfasina hosgeldiniz")
    }else if(url === "/iletisim"){
        res.writeHead(200, {"Content-Type": "text/html"})
        res.write("<h2>Iletisim sayfasina hosgeldiniz")
    }

    res.end()
});

const port = 5000
server.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatıldı.`);
});

