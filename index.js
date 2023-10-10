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

function generateID() {
    var count = 0;
    return function () {
      return count++;
    };
  }
var id = generateID();

function makePerfume(price,name,image,category){
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
    var item=makePerfume(price,name,image,category)
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

var shop=MakeShop("manel")


shop.add(118,"Idole","images/idole.jpg","women")
shop.add(130,"miss Dior","images/missd.jpg","women")
shop.add(194,"Libre","images/libre.webp","women")
shop.add(165,"Coco chanel","images/coco.jpg","women")
shop.add(98,"Jimmy choo","images/jimmy.webp","men")
shop.add(109,"Eternity","images/eternity.webp","men")
shop.add(115,"Sauvage","images/sauvage.jpg","men")
shop.add(148,"Yves","images/yves.jpeg","men")


function display(item){
$('.perfumes').append(
`<div class="perfume">
<img src=${item.image} class="image">
<h3>${item.name}</h3>
<p>Price : ${item.price}$</p>
</div>`
)}

each(shop.list,function(e,i){
    display(e)
})


$("#sortcheap").click(function(){
    shop.sortByPriceCheapest();
    
    $(".perfumes").html("");
   
    each(shop.list,function(e,i){
        display(e)
    })
})


$("#sortexp").click(function(){
    shop.sortByPriceExpensive();
    $(".perfumes").html("");
    
    each(shop.list,function(e,i){
        display(e)
    })
})

$("#women").click(function(){
    shop.categoryFilter("women");
    
    $(".perfumes").html("");
   
    each(shop.list,function(e,i){
        display(e)
    })
})



var images = ['images/goodgirlll.png','images/badboy.webp','images/depp.jpg','images/dior.jpg',]
var index = 0;
$("#slider").html('<img id="e" src="'+images[index]+'">');


$("#prev").click(function(){
    if (index > 0) {
        index--
        
        $("#slider").html(`<img id="e" src="${images[index]}">`);
    }
});


$("#next").click(function(){
    if (index < images.length - 1) {
        index++
        $("#slider").html('<img id="e" src="'+images[index]+'">');
    }
});


