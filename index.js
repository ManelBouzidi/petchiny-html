function each(array, func) { 
    for (var i = 0; i < array.length; i++) { 
          func(array[i], i); 
    } 
  }
  
  function map(array, f) { 
    var acc = []; 
    each(array, function(element, i) { 
          acc.push(f(element, i)); 
    }); 
    return acc; 
  }
  
  function filter(array, predicate) {
  var acc = [];
  each(array, function (element, index) {

   if (predicate(element, index)) {
    
     acc.push(element);
   }
  });
  return acc;
  }
  
  function reduce(array, f, acc) {
  if (acc === undefined) {
   acc = array[0];
   array = array.slice(1);
  }
  each(array, function (element, i) {
   acc = f(acc, element, i);
  });
  return acc;
  }
/////////////////////////////////////////////////////////
function generateID() {
    var count = 0;
    return function () {
      return count++;
    };
  }
var id = generateID();

function makePet(price,name,image,category){
    return{
      price:price,
      name:name,
      image:image,
      category:category,
      id:id(),
    }
}

function MakeShop(name){
return { 
    name:name, 
    list:[],
    add:add,
    removeElement:removeElement ,
    update:update,
    categoryFilter:categoryFilter,
    sortByPriceCheapest:sortByPriceCheapest,
    sortByPriceExpensive:sortByPriceExpensive,
    }
}
var add=function(price,name,image,category){
    var item=makePet(price,name,image,category)
    this.list.push(item)
}
var removeElement=function(id){
    this.list =  filter(this.list,function(e,i){
    return e.id!==id
    })
}
var update=function(id,prop,value){
this.list=map(this.list,function(e,i){
    if(e.id===id)
    {this.list[i][prop]=value}
    return e
})
}
var categoryFilter=function(category){
this.list = filter(this.list,function(e,i){
    return category===e.category
})
}
var sortByPriceCheapest=function(){
    this.list.sort(function(a,b){
    return a.price-b.price
    })
}

var sortByPriceExpensive=function(){
    this.list.sort(function(a,b){
    return b.price-a.price
    })
}

// create shop
var shop=MakeShop("petchiny")


//add pets to shop
shop.add(150, "Chester", "images/pet1.jpg", "Cat")
shop.add(150, "Rex", "images/pet2.jpg", "Dog")
shop.add(75, "Romana", "images/pet3.jpg", "Cat")
shop.add(50, "sad hamster", "images/pet4.jpg", "Hamster")
shop.add(120, "tiwtiw", "images/pet5.jpg", "Bird")
shop.add(200, "slither", "images/pet6.jpg", "Snake")
shop.add(130, "Bobby", "images/pet7.jpg", "Dog")
shop.add(90, "mittens", "images/pet8.jpg", "Cat")
shop.add(45, "fuzzy", "images/pet9.jpg", "Hamster")
shop.add(110, "tweetie", "images/pet10.jpg", "Bird")
shop.add(180, "cobra", "images/pet11.jpg", "Snake")
shop.add(140, "max", "images/pet12.jpg", "Dog")
shop.add(80, "shadow", "images/pet13.jpg", "Cat")
shop.add(55, "squeaky", "images/pet14.jpg", "Hamster")
shop.add(210, "python", "images/pet15.jpg", "Snake")

console.log(shop.list)

//display single pets
function display(item){
$('.pets').append(
`<div class="pet">
<img src=${item.image} class="image">
<h3>${item.name}</h3>
<p>Price : ${item.price}DT</p>
<p>Type : ${item.category}</p>
<button class="adoptbutton">Adopt</button>
</div>`
)}

// display all pets in html
each(shop.list,function(e,i){
    console.log(e);
    display(e)
})

//filters
//sort by cheapest
$("#sortcheap").click(function(){
    shop.sortByPriceCheapest(); 
    //empty pet first
    $(".pets").html("");
    //display again
    each(shop.list,function(e,i){
        display(e)
    })
})

//sort by expensive
$("#sortexp").click(function(){
    shop.sortByPriceExpensive();
    //empty pets first 
    $(".pets").html("");
    //display again
    each(shop.list,function(e,i){
        display(e)
    })
})

$("#cats").click(function(){
    shop.categoryFilter("Cat");
    //empty pets first
    $(".pets").html("");
    //display again
    each(shop.list,function(e,i){
        display(e)    
    })
})

$("#dogs").click(function(){
    shop.categoryFilter("Dog");
    //empty pets first
    $(".pets").html("");
    //display again
    each(shop.list,function(e,i){
        display(e)    
    })
})


//slider
var images = ['images/slider/dog-pink.jpeg','images/slider/dog-blue.jpg','images/slider/0.jpg','images/slider/1.jpg','images/slider/2.jpg','images/slider/3.jpg','images/slider/4.jpg','images/slider/5.jpg','images/slider/6.jpg','images/slider/7.jpg','images/slider/8.jpg']
var index = 0;
// show first image first time 
$("#slider").html('<img id="e" src="'+images[index]+'">');

//change to previous image
$("#prev").click(function(){
    if (index > 0) {
        index--
        // $("#slider").html('<img id="e" src="'+images[index]+'">');
        $("#slider").html(`<img id="e" src="${images[index]}">`);
    }
});

//change to next image
$("#next").click(function(){
    if (index < images.length - 1) {
        index++
        $("#slider").html('<img id="e" src="'+images[index]+'">');
    }else{
        index = 0;
        $("#slider").html('<img id="e" src="'+images[index]+'">');
    }
});




/// match script ////

$('#findPet').click(function() {
    var traits = $('#personality').val().toLowerCase();
    var pet = getPetRecommendation(traits);
    $('#result').text("Your matching pet is: " + pet);
});

function getPetRecommendation(traits) {
    if (traits.includes('loyal') || traits.includes('funny')) {
        return 'a dog';
    } else if (traits.includes('independent') || traits.includes('graceful')) {
        return 'a cat';
    } else if (traits.includes('sweet') || traits.includes('cute')) {
        return 'a hamster';
    } else if (traits.includes('unique') || traits.includes('calm')) {
        return 'a snake';
    } else if (traits.includes('cheerful') || traits.includes('talkative')) {
        return 'a bird';
    } else {
        return 'another type of pet!';
    }
}
