$(function(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        $("#username").text(email)

      } else {
        window.location.href = 'signin.html';
      }
    });
    
  $("#signout").click(function(){
     
  });
})

function signout() {
  firebase.auth().signOut().then(function() {
    window.location.href = 'signin.html';
  }).catch(function(error) {
    // An error happened.
  });
  
}