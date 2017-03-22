//主页大图轮播
$(function(){
	var i=0;
	var timer;
	var $slide=$("#main .slide");
	var $warpHeight=$slide.height();
	var len=$slide.find("ul>li").length;
	$slide.find("ul>li:not(:first-child)").hide();
	$slide.find("ol>li").click(function(){
		i=$slide.find("ol>li").index(this);
		scroll(i);
	});
	$slide.hover(function(){
		clearInterval(timer);
	},function(){
		timer=setInterval(tab,3000);
	}).trigger("mouseleave");
	function tab(){
		i++;
		if(i==len){i=0;}
		scroll(i);
	}
	$slide.find(".button_left").click(function(){
		if(i==0){
			i=5;
		}
		i--;
		scroll(i);
	})
	$slide.find(".button_right").click(function(){
		i++;
		if(i==5){
			i=0;
		}
		scroll(i);
	})
	$slide.find(".bg").mouseover(function(){
		$(this).find("div").stop().show();
	}).mouseout(function(){
		$(this).find("div").stop().hide();
	})
})
function scroll(index){
	var $self=$("#main .slide");
	$self.find("ul>li").filter(":visible").stop().fadeOut(500)
	.parent().children().eq(index).stop().fadeIn(500);
	$self.find("ol>li").removeClass("active").eq(index).addClass("active");
}

//二级导航下拉框
$(function(){
	var $self=$("#nav");
	$self.find(".nav_left>li").mouseenter(function(){
		$(".subnav").stop().slideDown(500);
	}).mouseleave(function(){
		$(".subnav").stop().slideUp();
	})
	$self.find(".nav_left>li").mouseenter(function(){
		var index=$self.find(".nav_left>li").index(this);
		$(".subnav_list").stop().hide().eq(index).stop().show();
	})
	$(".subnav").mouseenter(function(){
		$(this).stop().slideDown(500);
	}).mouseleave(function(){
		$(this).stop().slideUp();
	});
})

//主菜单切换
$(function(){
	$("#main").find(".menu_list").mouseover(function(){
		$(this).find(".submenu").stop().show();
		$(this).css("background","#f67000");
	}).mouseout(function(){
		$(this).find(".submenu").stop().hide();
		$(this).css("background","");
	})
})

//滚动一
$(function(){
	var i=0;
	var j=5;
	var timer;
	var $self=$("#scroll_one");
	var len=$self.find("li").length;
	var num=Math.ceil(len/j);
	$self.find(".button").hover(function(){
		clearInterval(timer);
	},function(){
		timer=setInterval(
			function(){
				i++;
				if(i==num){i=0;}
				Move(i);
			},6000);
	}).trigger("mouseleave");
	$self.find(".left").click(function(){
		if(0<i){
			i--;
			Move(i);
		}
	})
	$self.find(".right").click(function(){
		if(i<(num-1)){
			i++;
			Move(i);
		}
	})
})
function Move(index){
	var $self=$("#scroll_one");
	var warpWidth=$self.find(".scroll_warp").width();
	$self.find("ul").stop().animate({left:-(warpWidth+14)*index},1000)
}

//滚动二
$(function(){
	var i=0;
	var j=5;
	var $self=$("#scroll_two");
	var len=$self.find("li").length;
	var num=Math.ceil(len/j);
	$self.find(".left").click(function(){
		if(0<i){
			i--;
			MoveOne(i);
		}
	})
	$self.find(".right").click(function(){
		if(i<(num-1)){
			i++;
			MoveOne(i);
		}
	})
})
function MoveOne(index){
	var $self=$("#scroll_two");
	var warpWidth=$self.find(".scroll_warp1").width();
	$self.find("ul").stop().animate({left:-(warpWidth+14)*index},500)
}

//中间模块切换
$(function(){
	tab("#section_one");
	tab("#section_two");
	tab("#section_three");
})
function tab(obj){
	var $self=$(obj);
	$self.find(".big_title li").mouseover(function(){
		var index=$self.find(".big_title li").index(this);
		$self.find(".product_main").hide().eq(index).show();
		$(this).addClass("active").siblings().removeClass("active");
	})
}

//应用切换
$(function(){
	liTab("#one");
	liTab("#two");
	liTab("#three");
	liTab("#four");
})
function liTab(obj){
	var i=0;
	var $self=$(obj);
	var ulwidth=$self.find(".nesting").width();
	var len=$self.find("ul li").length;
	$self.mouseover(function(){
		$(".tab",this).stop().animate({opacity:1},"fast");
	}).mouseout(function(){
		$(".tab",this).stop().animate({opacity:0},"fast");
	})
	$self.find(".round li").click(function(){
		i=$self.find(".round li").index(this);
		animate(i);
	})

	$self.find(".left_button").click(function(){
		if(0<i){
			i--;
			animate(i);
		}
	})
	$self.find(".right_button").click(function(){
		if(i<(len-1)){
			i++;
			animate(i);
		}
	})
	function animate(index){
		$self.find(".round li").siblings().removeClass("active").eq(index).addClass("active");
		$self.find(".nesting ul").stop().animate({left:-ulwidth*index},"fast");
	}
}

//IE下隐藏评论划出
$(function(){
	var ie6=!-[1,]&&!window.XMLHttpRequest;
	if(ie6){
		$(".product-evaluate").css("display","none");
	}
})





