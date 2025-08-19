/*  --- Ödev 2 ---
Blog oluşturmaya hazır mısınız? Konsol ekranında postlarımızı sıralayalım, 
sonrasında yeni bir post oluşturalım ve 
yeni post ile birlikte postlarımızı tekrar sıralayalım.    
*/ 

let posts = [
    { id: 1, postTitle: "İlk Postum" },
    { id: 2, postTitle: "Merhaba Ben Denis!" },
    { id: 3, postTitle: "Yorumlarınız İçin Teşekkürler!!!" }
];

async function doTasks() {
    try {
        showPosts()
        console.log("-".repeat(20))
        let isJobDone = await newPost({ id: 4, postTitle: "Bu Post Sevenlere Gelsin..." })
        console.log(`${isJobDone} \n${"-".repeat(20)}`)
        showPosts()
    } catch (error) {
        console.log(error)
    }

}

doTasks()

function newPost(data) {
    return new Promise((resolve, reject) => {
        if (data) {
            resolve("Post Verisi Alındı.")
            posts.push(data)
        } else {
            reject("Post Verisi Alınamadı.")
        }
    })
}

function showPosts() {
    posts.map(item => console.log(item))
}