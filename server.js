const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://i.pinimg.com/564x/79/2f/34/792f3447d9ef5fee7bf99cf1c79e5384.jpg",
        name: "Caio Chrithian",
        role: "Modelo, Streamer, Programador",
        description: "Caio aos 18 anos já é o homem mais bonito e o melhor programador que existiu. Veja seu perfil no <a href='https://www.instagram.com/caiochristhian' target='_blank'>Insta</a>.",
        links: [
            { name: "Github", url: "https://github.com/CaioChristhian" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/caio-christhian-lopes-silva-6429421b8/" },
            { name: "Twitter", url: "https://twitter.com/ChristhianCaio" },
        ]
    }

    return res.render("about", { about })
})

server.get("/mood", function(req, res){

    return res.render("mood", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id
    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found")
    }

    return res.render("video", { item: video })
}) 

server.listen(5000, function() {
    console.log("server is running")
})