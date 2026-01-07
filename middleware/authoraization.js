const autoraization = (req,res,next)=>{
  if(req.session.user){
    return next();
  }
  else{
    return res.redirect('/login')
  }
}

// export default  autoraization ;
//  const token = req.cookies.token;
//   if (!token) {
//     return res.redirect("/login");
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // 👈 user info
//     next();
//   } catch (err) {
//     return res.redirect("/login");
//   }