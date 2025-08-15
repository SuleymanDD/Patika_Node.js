/* --- Ödev 1 ---
Hepimizin Matematik derslerinden bildiği üzere Dairenin Alanı = π x r2 şeklinde hesaplanır. 
Node.JS Javascript çalışma ortamında yarıçap değerini konsoldan parametre olarak girerek alanı bulmaya çalışacağız. 
Konsol çıktısı: Yarıçapı (Yarıçap) olan dairenin alanı: (Alan) şeklinde olmalıdır.
*/

const arguments=process.argv.slice(2)
let alan=Math.PI*(Number(arguments[0])**2)

console.log(`Yarıçapı ${arguments[0]} olan dairenin alanı: ${alan.toFixed(3)} şeklinde olmalıdır.`)
