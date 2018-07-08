module.exports = function (req, res, next) {
    let user = {};
    
    try {
        user = {
            usename: req.user.username
        }
    } catch (err) {
        console.log('User not found');
        console.log(err); 
    }
   
    res.render('admin/pages/common-dashboard', { title: 'Express Dashboard Home', user: user });
}