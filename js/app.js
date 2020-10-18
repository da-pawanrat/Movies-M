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

$(function(){

  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        window.location.href = 'index.html';
      }
    });

    $("#signingoogle").click(function(){
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            
          }
          // The signed-in user info.
          var user = result.user;
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          $("#error").text(errorMessage);
        });
  });


  $("#signinemail").click(function(){
      var email = $("#email").val();
      var password = $("#password").val();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          
        });

        


        
        
  });

  

})



document.addEventListener('prechange', function (event) {
  document.querySelector('ons-toolbar .center')


});

$(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyCCOpytQ9b-iPLC7IRtE7S4BK3AitxkdUk",
    authDomain: "plearnhub-509b2.firebaseapp.com",
    databaseURL: "https://plearnhub-509b2.firebaseio.com",
    projectId: "plearnhub-509b2",
    storageBucket: "plearnhub-509b2.appspot.com",
    messagingSenderId: "59399787997",
    appId: "1:59399787997:web:deee24f3c7840853a91234",
    measurementId: "G-WYRXEDJQ1V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();
  var index = 1;
  db.collection("trailer").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      var id = doc.id
      var vedioUrl = doc.data().videoURL
      var pic = `<ons-carousel-item id="${id}" class='header'
      style="background-image:url(${doc.data().posterURL});background-repeat: no-repeat;background-size: cover;">
      </ons-carousel-item>`
      $("#carousel").append(pic);

      var vedio = `<video style='width:100%; height:100%' id='vedio_${id}' >
      <source src="${vedioUrl}" ></video>`
      $("#" + id).append(vedio);
      $("#vedio_" + id).hide();
      hover(id, vedioUrl);
    })
  })

  var db = firebase.firestore();
  var index = 1;
  db.collection("favourites").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      var id = doc.id
      var vedioUrl = doc.data().videoURL
      var pic = ` <ons-col width="30%" style="margin: 1%;"><img src="${doc.data().posterURL}" style="width:100%; height: 100%;">
      </ons-col>`
      $("#fav").append(pic);
    })
  })

  var db = firebase.firestore();
  var index = 1;
  db.collection("trailer").limit(3).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      var id = doc.id
      var vedioUrl = doc.data().videoURL
      var pic =
        ` <ons-list-item style="grid-auto-rows: max-content;"> 
          <ons-row>
            <ons-col width="100px" style="margin-bottom: 10px;"><img src="${doc.data().posterURL}" style="width:100%; height: 100%;"></ons-col>
              <ons-col>
                <ons-row style="margin-left: 10px; margin-top: 10p"><B>${doc.data().title}</B></ons-row>
                <ons-row style="margin-left: 10px; margin-top: 10px; text-align: left">${doc.data().shortstory}</ons-row>
              </ons-col>
          </ons-row>
      `
      $("#trailer").append(pic);
    })
  })

  function hover(id) {

    $("#" + id).mouseover(function () {
      $("#vedio_" + id).show();
      $("#vedio_" + id).get(0).play();
    })
    $("#" + id).mouseleave(function () {
      $("#vedio_" + id).hide();
      $("#vedio_" + id).get(0).pause();
      $("#vedio_" + id).get(0).currentTime = 0;
    })


  }


  db.collection("movies").limit(5).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.data());

      var row = `<div class="card">
        <img class="card-img-top" src="${doc.data().posterURL}" alt="">
        <div class="card-body">
          <h4 class="card-title">${doc.data().title}(${doc.data().year})</h4>
        </div>
      </div>`
      $("#list").append(row);
    });
  });

  db.collection("movies").limit(10).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(${doc.id} => ${doc.data()});
      console.log(doc.data());
      var row = `<ons-list-item style="grid-auto-rows: max-content;">
           
      
      <ons-row>
      <ons-col width="100px" style="margin-bottom: 10px;"><img src="${doc.data().posterURL}"
      style="width:100%; height: 100%;">
  </ons-col>
  <ons-col style="margin-left: 10px; margin-top: 10px">${doc.data().title}<br>${doc.data().year}
  </ons-col></ons-row></ons-list-item>`
      $("#noti").append(row);
    });
  });
});

