 $(document).ready(function(){
   
    $('form').on('submit', function(e){
        e.preventDefault(); 
        console.log($('input').val())
        makeApiCall($('input').val())
    })


});
    makeApiCall(97219)
//http://api.petfinder.com/pet.getRandom?format=json&key=a4d4d400939b10647da19b7593286b34&animal=dog&output=basic
function makeApiCall(zipcode){

 //var zipcode = (zipcode);
    var url = `http://api.petfinder.com/pet.find?location=${zipcode}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;
    $.ajax({
        type : 'GET',
        data : {},
        url : url+'&callback=?' ,
        dataType: 'json',
        success : function(data) {              
           // console.log(data)
            //for(var i =0; i<20; i++){
               // console.log(data.petfinder.pets.pet[i].description.$t)
           // }
           let html = ""
           let pets = data.petfinder.pets.pet;
           pets.forEach(function(pet,e) { 
            

                console.log(pet,e) 
                let name = pet.name.$t;
                html += '<h4>'+name+'</h4>'
                let description = pet.description.$t;
                //html += '<h5>'+description+ '</h5>'
                //html +='<img src ="http://photos.petfinder.com/photos/pets/38751785/1/?bust=1499974270&width=50&-t.jpg"/>'
                //html += '<img src ="http://photos.petfinder.com/photos">'
                for(var k = 0; k<pet.media.photos.photo.length; k++){
                    if(pet.media.photos.photo[k]['@size'] == "x") {
                        html +=`<img src = "${pet.media.photos.photo[k].$t}"/>`
                    }

                }
                html += `<h5>${description}</h5>` 
                //objective is to show all images for each pet. This will require an additional for each loop within the current for each loop.
            } )
           
        
            

           $('#petfinderInfo').html(html)

        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });
}