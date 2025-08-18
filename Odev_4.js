/* -- Ödev 4 --
employees.json dosyası oluşturalım ve içerisine {"name": "Employee 1 Name", "salary": 2000} verisini ekleyelim. (CREATE)
Bu veriyi okuyalım. (READ)
Bu veriyi güncelleyelim.
Dosyayı silelim.
*/

const fs = require("fs")

fs.writeFile("employees.json", '{"name": "Employee 1 Name","salary": 2000}', "utf8", (err) => {
    err ? console.log(err) : console.log("Dosya Oluşturuldu!!")
});

fs.readFile("employees.json","utf8", (err,data) => {
    if(err){
        console.log(err)
    }else{
        console.log(data)
        console.log("Dosya Okundu!!")
    }
});

fs.appendFile("employees.json", "  ",(err) => {
    err ? console.log(err) : console.log("Dosya Düzenlendi!!")
});

fs.unlink("employees.json", (err) => {
    err ? console.log(err) : console.log("Dosya Silindi!!")
});