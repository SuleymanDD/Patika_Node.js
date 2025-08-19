/* -- Ödev 6 --
koa paketini indirelim.
index, hakkimda ve iletisim sayfaları oluşturalım.
Sayfalara içerik olarak xxx sayfasına hoşgeldiniz şeklinde h1 başlıkları yazdıralım.
port numarası olarak 3000'i kullanalım.
*/
/*
const Koa = require('koa');
const app = new Koa();


app.use(ctx => {
    let url=ctx.req.url

    if(url === "/index"){
        ctx.is('text/html')
        ctx.body = '<h1>Index sayfasina hosgeldiniz</h1>'
    }else if(url === "/hakkimda"){
        ctx.is('text/html')
        ctx.body = '<h1>Hakkimda sayfasina hosgeldiniz</h1>'
    }else if(url === "/iletisim"){
        ctx.is('text/html')
        ctx.body = '<h1>Iletisim sayfasina hosgeldiniz</h1>'
    }

});

app.listen(3000);
*/