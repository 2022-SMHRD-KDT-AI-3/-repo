const { response } = require("express");
const express = require("express") // router에서도 express 라는 걸 쓰겠다라는걸 알려줌
const router = express.Router(); // express 안에서 Router 사용하겠다
const conn = require("../config/DB.js")  // 저 경로의 파일안에 있는 내용을 가져온다
// const {request} = require("express");

// router.get("/main", function(request, response){

    
//     response.render("message", {        // -> ejs파일 실행      render는 파일의 이름만!!
//         user : request.session.user     // 로그인x : null / 로그인o : 회원정보

//     })         

// })

router.get("/main", function(request, response){

    // response.render("index", {        // -> ejs파일 실행      render는 파일의 이름만!!
    //     user : request.session.user     // 로그인x : null / 로그인o : 회원정보
    // })

    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower order by news_date";

    conn.query(sql, function(err, rows){
        if(rows){
            console.log(rows);
            response.render("key", {
                user : request.session.user,
                rows : rows
            })

        } else{
            console.log(err);
        }
    })  
      

})

router.get("/join", function(request, response){

    response.render("join", {
        user : request.session.user
    })
    
})

router.post("/join_exe", function(request, response){      

    let id = request.body.id;
    let pw = request.body.pw;
    let nick = request.body.nick;
    let name = request.body.name;   

    let sql = "insert into users values(?,?,?,?)";    // sql 자체에있는 세미콜론은 안가져와도됨 !!!   
                                                                    // 물음표에 사용자가 입력한값 들어감
                                                                    // now() : mysql 현재 시간값    
    conn.query(sql,[id,pw,nick,name],function(err, rows){  //sql 실행되면 만들었던 nodejs_member 테이블로 가서 입력함  그다음에 명령이 성공하든 실패하든 이쪽 뻥션으로 들어옴 실패하면 err 에 뭔가들어가고 성공하면 rows 변수에 들어감 
        //sql,[id,pw,nick] 사용자가 입력할값 순서대로 넣어준다
        if(rows) { //만약 rows 값이 트루면
            response.redirect("http://127.0.0.1:3000/main")
            console.log("성공");
        }else{ // 실패시 
            console.log(err);
        }
    })
})

router.get("/login", function(request, response){

    response.render("login", {
        user : request.session.user
    })
    
})

router.post("/login_exe", function(request, response){        

    let id = request.body.id;
    let pw = request.body.pw;

    let sql = "select * from users where user_id = ? and user_pw = ?";    // sql 자체에있는 세미콜론은 안가져와도됨 !!!   // 물음표에 사용자가 입력한값 들어감
      
    conn.query(sql,[id,pw],function(err, rows){  //sql 실행되면 만들었던 nodejs_member 테이블로 가서 입력함  그다음에 명령이 성공하든 실패하든 이쪽 뻥션으로 들어옴 실패하면 err 에 뭔가들어가고 성공하면 rows 변수에 들어감 
        //sql,[id,pw,nick] 사용자가 입력할값 순서대로 넣어준다
        console.log(rows.length);

        if(rows.length > 0){

            request.session.user = {
                "id" : rows[0].user_id,
                "nick" : rows[0].user_nick,
                "username" : rows[0].user_name
            }

            response.redirect("http://127.0.0.1:3000/main");
        }else{

            response.redirect("http://127.0.0.1:3000/LoginF.html")
            
        }
    })
 
})

router.get("/logout", function(request, response){

    delete request.session.user;

    response.redirect("http://127.0.0.1:3000/main");

})

router.get("/society", function(request, response){
    
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_cg in ('사회', '경제', '정치', '국제') order by news_date"; // query문 작성

    conn.query(sql, function(err, rows){
        if(rows){
            console.log(rows);
            response.render("society", {
                user : request.session.user,
                rows : rows                
            })

        } else{
            console.log(err);
        }
    })
   
})

router.get("/sports", function(request, response){
    
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_cg = '스포츠' order by news_date"; // query문 작성

    conn.query(sql, function(err, rows){
        if(rows){
            console.log(rows);
            response.render("sports", {
                user : request.session.user,
                rows : rows                
            })

        } else{
            console.log(err);
        }
    })
   
})

router.get("/life", function(request, response){
    
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_cg = '생활·문화' order by news_date"; // query문 작성

    conn.query(sql, function(err, rows){
        if(rows){
            console.log(rows);
            response.render("life", {
                user : request.session.user,
                rows : rows                
            })

        } else{
            console.log(err);
        }
    })
   
})

router.get("/entertain", function(request, response){
    
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_cg = '연예' order by news_date"; // query문 작성

    conn.query(sql, function(err, rows){
        if(rows){
            console.log(rows);
            response.render("entertain", {
                user : request.session.user,
                rows : rows                
            })

        } else{
            console.log(err);
        }
    })
   
})

router.post("/keyword", function(request, response){
    
    let keyword = request.body.keyword;
    let keyword1 = "%" + request.body.keyword + "%";    
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_head like ? order by news_date;";

    conn.query(sql, [keyword1],function(err, rows){        
        if(rows){
            response.render("keyword", {
                user : request.session.user,
                rows : rows,
                keyword : keyword
            })
        } else{
            console.log(err);
        }
    })
   
})

router.post("/sportskeyword", function(request, response){
    
    let keyword = request.body.keyword;
    let keyword1 = "%" + request.body.keyword + "%";    
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_cg = '스포츠' and news_head like ? order by news_date;";
    
    conn.query(sql, [keyword1],function(err, rows){        
        if(rows){
            response.render("sportskeyword", {
                user : request.session.user,
                rows : rows,
                keyword : keyword
            })
        } else{
            console.log(err);
        }
    })
   
})

router.post("/societykeyword", function(request, response){
    
    let keyword = request.body.keyword;
    let keyword1 = "%" + request.body.keyword + "%";
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_cg in ('사회', '경제', '정치', '국제') and news_head like ? order by news_date;";
    
    conn.query(sql, [keyword1],function(err, rows){        
        if(rows){
            response.render("societykeyword", {
                user : request.session.user,
                rows : rows,
                keyword : keyword
            })
        } else{
            console.log(err);
        }
    })
   
})

router.post("/lifekeyword", function(request, response){
    
    let keyword = request.body.keyword;
    let keyword1 = "%" + request.body.keyword + "%";    
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_cg = '생활·문화' and news_head like ? order by news_date;";
    
    conn.query(sql, [keyword1],function(err, rows){        
        if(rows){
            response.render("lifekeyword", {
                user : request.session.user,
                rows : rows,
                keyword : keyword
            })
        } else{
            console.log(err);
        }
    })
   
})

router.post("/entertainkeyword", function(request, response){
    
    let keyword = request.body.keyword; 
    let keyword1 = "%" + request.body.keyword + "%";   
    let sql = "select distinct news_head, news_url, news_summ, news_img, news_date from sbsdatapower where news_cg = '연예' and news_head like ? order by news_date;";
    
    conn.query(sql, [keyword1],function(err, rows){        
        if(rows){
            response.render("entertainkeyword", {
                user : request.session.user,
                rows : rows,
                keyword : keyword
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/today", function(request, response){
    
    let sql = "select distinct news_head, news_url, news_summ, news_img from sbsdatapower order by news_view desc";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("today", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/societytoday", function(request, response){
       
    let sql = "select distinct news_head, news_url, news_summ, news_img from sbsdatapower where news_cg in ('사회', '경제', '정치', '국제') order by news_view desc";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("societytoday", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })   
})

router.get("/sportstoday", function(request, response){
       
    let sql = "select distinct news_head, news_url, news_summ, news_img from sbsdatapower where news_cg = '스포츠' order by news_view desc";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("sportstoday", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/lifetoday", function(request, response){
       
    let sql = "select distinct news_head, news_url, news_summ, news_img from sbsdatapower where news_cg = '생활·문화' order by news_view desc";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("lifetoday", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/entertaintoday", function(request, response){
       
    let sql = "select distinct news_head, news_url, news_summ, news_img from sbsdatapower where news_cg = '연예' order by news_view desc";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("entertaintoday", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/feed", function(request, response){
    
    let user_nick = request.session.user.nick;
    let sql = "select * from board where text_user = ?";
    
    conn.query(sql, [user_nick],function(err, rows){        
        if(rows){
            response.render("feed", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
          
})

router.get("/board", function(request, response){
       
    let sql = "select * from board order by text_date";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("board", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/societyboard", function(request, response){
       
    let sql = "select * from board where text_cg = '정치/경제/사회' order by text_date";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("societyboard", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/sportsboard", function(request, response){
       
    let sql = "select * from board where text_cg = '스포츠' order by text_date";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("sportsboard", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/lifeboard", function(request, response){
       
    let sql = "select * from board where text_cg = '생활/문화' order by text_date";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("lifeboard", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/entertainboard", function(request, response){
       
    let sql = "select * from board where text_cg = '연예' order by text_date";
    
    conn.query(sql, function(err, rows){        
        if(rows){
            response.render("entertainboard", {
                user : request.session.user,
                rows : rows
            })
        } else{
            console.log(err);
        }
    })
   
})

router.get("/board_write", function(request, response){

    response.render("board_write", {
        user : request.session.user
    })
   
})

router.post("/board_submit", function(request, response){
    
    let user_nick = request.session.user.nick;
    let title = request.body.title;
    let content = request.body.content;
    let category = request.body.category;
    let sql = "insert into board(text_title, text_content, text_user, text_date, text_view, text_cg) values(?,?,?, now(), 0, ?)";

    conn.query(sql,[title,content,user_nick,category],function(err, rows){  
            response.redirect("http://127.0.0.1:3000/board");
    })  
})

router.get("/board_read", function(request, response){
       
    response.render("board_read", {
        user : request.session.user
    })
   
})

router.get("/delete", function(request, response){

    let text_no = request.body.text_no;

    let sql = "delete from board where text_no=?";

    conn.query(sql, [text_no], function(err, rows){
        if(rows){
            response.redirect("http://127.0.0.1:3000/board");
        } else{
            console.log(err);
        }
    })

})

router.get("/link/:news_head", function(request, response){

    let news_head = request.params.news_head;
    let sql1 = 'select distinct news_url from sbsdatapower where news_head = ?;';
    let sql2 = 'update sbsdatapower set news_view = news_view + 1 where news_head = ?;';
    
    conn.query(sql2,[news_head],function(err, rows){         
        if(rows) {
            console.log("성공");
        }else{ 
            console.log(err);
        }        
    })

    conn.query(sql1,[news_head],function(err, rows){         
        if(rows) {
            let url = 'https://news.sbs.co.kr/'+ rows[0].news_url;
            response.redirect(url);
            console.log("성공");
        }else{ 
            console.log(err);
        }        
    })
    
   
})

router.get("/update", function(request, response){

    response.render("update", {
        user : request.session.user
    })
    
})

router.post("/update_exe", function(request, response){

    let pw = request.body.pw;
    let nick = request.body.nick;
    let name = request.body.name;
    let id = request.session.user.id;
    let sql = "";
    
    sql = "update users set user_pw=?, user_nick=?, user_name=?, user_id = ? where user_id = ?";
        
    conn.query(sql, [pw,nick,name,id], function(err, rows){
        if(rows){
            
            request.session.user = {
                "email" : email,
                "pw" : pw,
                "nick" : nick,
                "name" : name
            }

            response.redirect("http://127.0.0.1:3000/feed");
        } else{
            console.log(err);
        }
    })

})

module.exports = router;
