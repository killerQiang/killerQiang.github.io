//运动框架
function startMove(obj, json, fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//假设：所有值都已经到
		for(var attr in json){
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else{
				cur=parseInt(getStyle(obj, attr));
			}
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur!=json[attr])
				bStop=false;
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else{
				obj.style[attr]=cur+speed+'px';
			}
		}
		if(bStop){
			clearInterval(obj.timer);		
			if(fnEnd)fnEnd();
		}
	}, 30);
}

//获取非行间样式
function getStyle(obj,name){
	if(obj.currentStyle){
	return obj.currentStyle[name];
	}else{
	return getComputedStyle(obj,false)[name];
	}
}

//获取class
function getByClass(parent,oClass){
	var oparent=parent.getElementsByTagName("*");
	var arr=[];
	for(var i=0;i<oparent.length;i++){
		if(oparent[i].className.search(new RegExp("\\b"+oClass+"\\b"))!=-1){
			arr.push(oparent[i]);
		}
	}
	return arr;
}

window.onload=function(){
	myTB();
	slide();
	menuTab();
	catEar();

	//我的淘宝
	function myTB(){
		var oli=document.getElementById("my");
		var ospan=oli.getElementsByTagName("span")[0];
		oli.onmouseover=function(){
			ospan.className="up center1";
			this.children[1].style.display="block";
			this.style.background="#fff";
		}
		oli.onmouseout=function(){
			ospan.className="down center1";
			this.children[1].style.display="none";
			this.style.background="#f2f2f2";
		}
	}

	//轮播
	function slide(){
		var now=0;
		var oSlide=document.getElementById("slide");
		var oul=oSlide.getElementsByTagName("ul")[0];
		var ool=oSlide.getElementsByTagName("ol")[0];
		var ali=ool.getElementsByTagName("li");
		for(var i=0;i<ali.length;i++){
			ali[i].index=i;
			ali[i].onclick=function(){
				now=this.index;
				tab();
			}	
		}
		function tab(){
			for(var i=0;i<ali.length;i++){
				ali[i].className="";
			}
			ali[now].className="active";
			startMove(oul, {left:-1180*now});
		}
		function next(){
			now++;
			if(now==ali.length){
				now=0;
			}
			tab();
		}
		setInterval(next,4000);
	}

	//菜单切换
	function menuTab(){
		var now;
		var Menu=document.getElementById("menu");
		var olist=getByClass(Menu,"menu_list");
		var submenu=getByClass(Menu,"submenu");
		for(var i=0;i<olist.length;i++){	
			olist[i].index=i;
			olist[i].onmouseover=function(){
				now=this.index;
				this.style.background="#fff";
				for(var i=0;i<submenu.length;i++){
					submenu[now].style.display="block";
				}
			}
			olist[i].onmouseout=function(){	
				this.style.background="";
				for(var i=0;i<submenu.length;i++){
					submenu[now].style.display="none";
				}
			}
		}
	}

	//导航猫耳朵
	function catEar(){
		var oDiv=document.createElement("div");
		oDiv.setAttribute("id","catear");
		var catear=document.getElementById("catear");
		oDiv.innerHTML="<img src='images/site/catear.gif' class='catStyle'>";
		var olist=document.getElementById("nav_list");
		var oA=olist.getElementsByTagName("a");
		olist.appendChild(oDiv);
		var oWidth=getStyle(oDiv,"width");
		var catWidth=oWidth.substring(0,oWidth.indexOf("px"));
		var left;
		var top;
		var width;
		for(var i=0;i<oA.length;i++){
			oA[i].onmouseover=function(){
				left=this.offsetLeft;
				width=this.offsetWidth;
				oDiv.style.left=(left+width/2-catWidth/2)+"px";
				oDiv.style.display="block";
			}
			oA[i].onmouseout=function(){
				oDiv.style.display="none";
			}
		}
	}
	
	//解决IE6下固定定位失效
	var ie6=!-[1,]&&!window.XMLHttpRequest;
	if(ie6){
			window.onscroll=function(){
			var box=document.getElementById("side");
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			startmove(document.documentElement.clientHeight-box.offsetHeight+scrollTop);
		}
		var move=null;
		function startmove(iTarget){
		var box=document.getElementById("side");
			clearInterval(move);
		move=setInterval(function(){
				var speed=(iTarget-box.offsetTop)/4;
				speed=speed<0?Math.floor(speed):Math.ceil(speed);
				if(box.offsetTop==iTarget){
					clearInterval(move);
				}else{
				box.style.top=box.offsetTop+speed+"px";
				}
			},30)
		}
	}
	
}









