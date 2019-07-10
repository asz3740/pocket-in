/**
 * 패스포트 라우팅 함수 정의
 *
 * @date 2016-11-10
 * @author Mike
 */

module.exports = function(router, passport) {
    console.log('user_passport 호출됨.');
    // 홈 화면
    router.route('/').get(function(req, res) { //홈에서 메인으로 넘어갈 때 검증하기
        console.log('/ 패스 요청됨.');

        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.render('index.ejs', {login_success:false,user:req.user});
        } else {
            console.log('사용자 인증된 상태임.');
            console.log('req.user',req.user);
            res.render('index.ejs', {login_success:true,user:req.user});
        }
    });
    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/'); 
    });
    // 패스포트 - 페이스북 인증 라우팅 
    router.route('/auth/facebook').get(passport.authenticate('facebook', { 
        scope : 'email',
    }));

    // 패스포트 - 페이스북 인증 콜백 라우팅
    router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {
        successRedirect:'http://localhost:3000/',
        failureRedirect : '/'
    }));
};