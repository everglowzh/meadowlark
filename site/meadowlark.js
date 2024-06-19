const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')
// const path = require('path');
// const fortunes = [
//     "Conquer your fears or they will conquer you.",
//     "Rivers need springs.",
//     "Do not fear what you don't know.",
//     "You will have a pleasant surprise.",
//     "Whenever possible, keep it simple.",
// ]

// 配置Handlebars视图引擎
// app.engine('handlebars', expressHandlebars({
//     defaultLayout: 'main',
// }))
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));

// 主页路由
app.get('/', handlers.home)
// app.get('/', (req, res) => res.render('home'))
// app.get('/', (req, res) => {
//     res.type('text/plain')
//     res.send('Meadowlark Travel')
// })

// 关于页路由
app.get('/about', handlers.about)
// app.get('/about', (req, res) => {
//     // const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
//     res.render('about', { fortune: fortune.getFortune() })
// })
// app.get('/about', (req, res) => {
//     res.type('text/plain')
//     res.send('About Meadowlark Travel')
// })

// 定制404页
app.use(handlers.notFound)
// app.use((req, res) => {
//     res.status(404)
//     res.send('404')
// })
// app.use((req, res) => {
//     res.type('text/plain')
//     res.status(404)
//     res.send('404 - Not Found')
// })

// 定制500页
app.use(handlers.serverError)
// app.use((err, req, res, next) => {
//     console.error(err.message)
//     res.status(500)
//     res.send('500')
// })
// app.use((err, req, res, next) => {
//     console.error(err.message)
//     res.type('text/plain')
//     res.status(500)
//     res.send('500 - Server Error')
// })

// app.listen(port, () => console.log(
//     `Express started on http://localhost:${port}; ` +
//     `press Ctrl-C to terminate.`
// ))

if(require.main === module) {
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.' )
    })
} else {
    module.exports = app
}