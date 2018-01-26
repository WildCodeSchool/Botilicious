// $(function(){
//     var container = $('#chat');
//     var minTop = $('header').outerHeight();
//     var maxTop = $('footer').offset().top - container.outerHeight(); 

//     $(document).scroll(function() {
//         container.css('top', Math.min( Math.max(minTop, $(document).scrollTop()), maxTop ));
//     });
// });

// $(window).scroll(function() {
//     if($(window).scrollTop() >= 147) {
//         $('footer').addClass('fixed');
//     } else {
//         $('footer').removeClass('fixed');
//     }
    
    
//       console.log(checkOffset());
// })


// $(window).scroll(function(){
//     if ($(window).scrollTop() >= 147) {
//         $("#top_nav").addClass("fixed");

//     } else {
//         $("#top_nav").removeClass("fixed");
//     }
// });


// $(document).ready(function(){
//     var eTop = $("#pageWithHeaderAndFooter  ).offset().top; 
//     // offset() = get the current position of #alPage 
//     // returns an object containing the properties 'top' and 'left' 
//     $(document).scrollTop(eTop); 
//     // set the current position of the scroll bar for 'etop'
//     var eHeight = $('#pageWithHeaderAndFooter').height();
//     // get the current height of '#allPage'
//     var eBottom = eTop + eHeight - $(window).height();
//     $(document).on("scroll", function(e){
//         var windowScrollTop = $(window).scrollTop();
//         if(windowScrollTop < eTop){
//             console.log("not allowed");
//             $(document).scrollTop(eTop);
//         }
//         else if(windowScrollTop > eBottom){
//             $(document).scrollTop(eBottom);
//         }
//         else{
//             console.log("allowed");
//         }
//     });
// });

