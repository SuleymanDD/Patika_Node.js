/*  --- Ödev 3 ---
Daire alan : circleArea ve daire çevre : circleCircumference fonksiyonları içeren ve consola sonuçları yazdıran circle.js dosyası oluşturunuz.
module.exports yöntemi ile fonksiyonları oluştururken export ediniz.
require ve object destructing kullanarak index.js dosyasında yarıçap (r) 5 olacak şekilde ekran çıktısını alınız.
*/ 

function circleArea(radius){
    return Math.PI * (radius**2)
}
function circleCircumference(radius){
    return 2 * Math.PI * radius
}
function showResults(radius){
    console.log(`Daire Alanı => ${circleArea(radius).toFixed(2)} \nDaire Çevresi => ${circleCircumference(radius).toFixed(2)}`)
}

module.exports = {
    circleArea,
    circleCircumference,
    showResults
};