const express = require('express');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const path = require('path');

const methodOverride = require('method-override');
const { parse } = require('path');
 
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,'static')));
app.set('view engine','hbs');
app.use(express.urlencoded({extended: true}));

hbs.registerPartials(__dirname + '/views/partials');
let num = 4;
let blogs = [
    {
        id: 1,
        username: 'riyuzaki',
        blogContent: "this is my first blogg"
    },
    {
        id: 2,
        username: 'Yash',
        blogContent: `this is a good site`
    },
    {
        id: 3,
        username: 'Bhawansh Baleja',
        blogContent: `I love writing blogs`
    }
]

// GET ALL THE BLOGS
app.get('/blogs',(req,res)=>{
    res.render('blogs',{
        blogs: blogs,
        blogsPresent: blogs.length>0
    });
})

// CREATE NEW BLOG PAGE
app.get('/blogs/new',(req,res)=>{
    res.render('newBlog');
})

// ADDING A NEW BLOG
app.post('/blogs',(req,res)=>{
    const {username, blogContent} = req.body;
    blogs.push({
        id:num,
        username,
        blogContent
    })
    num++;
    res.redirect('/blogs');
})

// SHOW A SINGLE BLOG TO USER
app.get('/blogs/:id',(req,res)=>{
    const {id} = req.params;

    const myBlog = blogs.filter((blog)=>blog.id === parseInt(id));
    // console.log(myBlog[0]);
    res.render('singleBlog',myBlog[0]);
})


// EDIT A SINGLE BLOG
app.get('/blogs/:id/edit',(req,res)=>{
    const {id} = req.params;
    const myBlog = blogs.filter((blog)=>parseInt(id) === blog.id);
    res.render('editBlog',myBlog[0]);
})

//  Update a particular blog
app.put('/blogs/:id',(req,res)=>{ 
    const {id} = req.params;
    let myBlogIndex;
    blogs.map((blog,indx)=>{
        if(blog.id == parseInt(id)){
            myBlogIndex = indx;
        }
    })
    const {username,blogContent} = req.body;
    // console.log(username,blogContent);
    blogs[myBlogIndex].username = username;
    blogs[myBlogIndex].blogContent = blogContent;

    res.redirect('/blogs');
})

// DELETE A BLOG
app.delete('/blogs/:id',(req,res)=>{
    const {id} = req.params;
    const newBlogs = blogs.filter((blog)=>blog.id!==parseInt(id));
    blogs =  newBlogs;
    res.redirect('/blogs');
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/blogs`);
})