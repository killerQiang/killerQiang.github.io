$(function(){
	/*菜单切换*/
	(function(){
		var $self=$("#search");
		var $text=$self.find(".search_text");
		var index=0;
		var $oli=$self.find(".tab").find("li")
		var arr=["例如：荷棠鱼坊烤鱼 或 樱花日本料理","例如：北京市朝阳区又有明星吸毒了！","例如：消费10元立减50，还在等什么？","例如：想吃什么随便挑,我请你吃，你买单！","例如：跟着跑男过一个热闹的元宵节！"];
		$oli.click(function(){
			index=$self.find(".tab").find("li").index(this);
			$oli.removeClass("active").eq(index).addClass("active");
			$(this).removeClass("gradient1").siblings().addClass("gradient1");
			$text.val(arr[index]);
		})
		$text.focus(function(){		
			$text.val("");
		})
		$text.blur(function(){
			if(!$text.val()){
				$text.val(arr[index]);				
			}
		})
	})();

	/*update滚动*/
	(function(){
		var $self=$("#search").find(".upDate");
		var $ul=$self.find("ul");

		setInterval(function(){
			upDate($ul);
		},3000)

		function upDate(obj){
			var $liHeight=obj.find("li").height();
			var len=obj.find("li").length;
			obj.animate({"marginTop":-$liHeight},1000,function(){
			obj.css({marginTop:0}).find("li:first").appendTo(obj);
			})
		}
	})();

	/*内容切换1*/
	tabOne(".tab_title",".tab_con");
	tabOne(".tab_title1",".tab_con1");
	function tabOne(tab,con){
		var $li=$(tab).find("li");
		$li.click(function(){
			var index=$li.index(this);
			$(this).addClass("active").siblings().removeClass("active");
			$li.find("a").attr("class","sign_normal");
			$(this).find("a").attr("class","sign_active");
			$(con).siblings().hide().eq(index).show();
		})			
	}

	/*内容切换2*/
	tabTwo(".tab_title2",".tab_con2");	
	tabTwo(".tab_title3",".tab_con3");	
	function tabTwo(tab,con){
		var $li=$(tab).find("li");
		$li.mouseover(function(){
			var index=$li.index(this);
			$(this).addClass("active").siblings().removeClass("active");
			$li.find("a").attr("class","");
			$(this).find("a").attr("class","show");
			$(con).siblings().hide().eq(index).show();
		})			
	}

	/*幻灯片*/
	(function (){
		var now=0;
		var timer=null;
		var $pic=$(".pic");
		var len=$pic.find("ol li").length;
		var arr=["爸爸去哪儿啦~","美女户外显真~","性感模特大尺度~"];
		$pic.find("ol li").click(function(){
			now=$pic.find("ol li").index(this);
			show();
		})
		$pic.find("ol li").hover(function(){
			clearInterval(timer);
		},function(){
			timer=setInterval(next,3000);
		});
		function next(){
			now++;
			if(now==len){
				now=0;
			}
			show();
		}
		timer=setInterval(next,3000);
		function show(){
			$pic.find("ul li").fadeOut().eq(now).fadeIn();
			$pic.find("ol li").removeClass("active").eq(now).addClass("active");
			$pic.find("p").html(arr[now]);
		}
	})();

	/*BBS论坛*/
	(function(){
		var $self=$(".bbs");
		$self.find("li").mouseover(function(){
			$(this).addClass("active").siblings().removeClass("active");
		});
	})();

	/*日历*/
	(function (){
		var arr=[{"link":"img/content/hot7.gif","data":"THU","text":"时尚美女户外亮相！"},{"link":" ","data":" ","text":" "},{"link":"img/content/today2.gif","data":"MON","text":"迟到的荣誉————维米尔的写实主义风俗画迟到的荣誉维米尔"}];
		var $self=$(".calendar");
		var $img=$self.find("li img");
		var $today=$self.find(".today_info");
		$img.hover(function(){
			var index=$img.index(this);
			var $left=$(this).parent().position().left+50;
			var $top=$(this).parent().position().top-35;
			$today.css({left:$left,top:$top,display:"block"});
			$today.find("img").attr("src",arr[index].link);
			$today.find("strong").html(arr[index].data);
			$today.find("p").html(arr[index].text);
			if($(this).attr("class")=="img"){
				$today.css({display:"none"});
			}
		},function(){
			$today.css({display:"none"});
		})		
	})();

	/*红人烧客*/
	(function(){
		var arr=["","用户1<br/>人气1",
			"用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气：99999",
			"用户3<br/>人气3",
			"用户4<br/>人气4",
			"用户5<br/>人气5",
			"用户6<br/>人气6",
			"用户7<br/>人气7",
			"用户8<br/>人气8",
			"用户9<br/>人气9",
			"用户10<br/>人气10"];
		var $self=$(".hot_area").find("li:not(:first)");
		$self.hover(function(){
			var index=$self.index(this);
			$(this).find("a").append('<p style="width:'+($(this).width()-20)+'px;height:'+($(this).height()-20)+'px;">'+ arr[index+1] +'</p>')
		},function(){
			$(this).find("p").remove();
		})
	})();
})

