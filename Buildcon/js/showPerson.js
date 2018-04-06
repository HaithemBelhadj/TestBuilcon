var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

function getPersonById(id) {

  const person = personData.filter(x => x.id == id);
  return person;

}

$(document).ready(function() {

  var id = getUrlParameter("id");
  const personne = getPersonById(id)[0];
  render(personne);
  getSuggestedFriends(personne, personData);
});

function render(personne) {
    function friendl(friendl) {
        return `
      <h4>List of his friends</h4>
      
      ${ friendl.map(id => {
        const p = getPersonById(id)[0];
        return `<p>${p.firstName + '  ' + p.surname}</p>`;
      }).join('') }

      `;
      }
      
      function PERSONW(person) {
        return `
      <div class="card">
        <img src="picture/profile.jpg" alt="John" style="width:100%">
        <h1>${person.firstName}</h1>
        <h2>${person.surname}</h2>
        <p class="title">${person.gender}</p>
        <p>${person.age}</p>
      
      ${person.friends ? friendl(person.friends) : ""}
      <h3>Suggested Friends</h3>
      <ul id="friend-sug"></ul>
      
        <div style="margin: 24px 0;">
          <a href="#"><i class="fa fa-dribbble"></i></a> 
          <a href="#"><i class="fa fa-twitter"></i></a>  
          <a href="#"><i class="fa fa-linkedin"></i></a>  
          <a href="#"><i class="fa fa-facebook"></i></a> 
      
       </div>
          <a href="mainP.html"><button>Go back</button></a> 
      
      </div>
      
      <br>
       `;
      }
      document.getElementById("App").innerHTML = `
        
      ${PERSONW(personne)}
        
      `;
      
}

function getSuggestedFriends(friend, allFriends) {
    
      var secondDegreeNode = document.createElement('span');
      var friendsElement = document.querySelector('#friend-sug');
      var secondDegreeFriends = [];
      var text = '';
      var index = 0;
  
      // Loop through the each user's friends and determine who is two degrees from that friend.
      friend.friends.forEach(function (theirFriend) {
        var friendOfFriend = allFriends.find(function (oneDegreeFriend) {
          return oneDegreeFriend.id === theirFriend;
        });
        // Figure out the second degrees minus who you are
        secondDegreeFriends = friendOfFriend.friends.filter(function (twoDegrees) {
          return twoDegrees !== friend.id;
        });
      });
  
      // A small helper function to format the names of the second degree friends
      function separateNames(secondDegreeIds) {
        return secondDegreeIds.map(function (secondDegreeId) {
          return allFriends.find(function (person) {
            return person.id === secondDegreeId;
          }).firstName;
        });
        
      };
      console.log(separateNames(secondDegreeFriends));
      separateNames(secondDegreeFriends).forEach(f => {
        $('#friend-sug').append(`<li>${f}</li>`);
      });
      
  }

