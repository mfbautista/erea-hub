Main = {
	init:function(){
		Main.setVars();
	},
	setVars:function(){
		Main.setUp();
		navbar = $("nav");
		filters = $(".erea-filter-panel");
	},
	setUp:function(){
		//Deshabilitar Waffle
		$("nav ul.nav>li:last-child a").attr("data-toggle","");

		//FixedNavBar Function
		$(".erea-page").scroll(Main.setFixedNavBar());

		$("#filter-button").click(Main.toggleFilters);

		// Resizing de padding de tabs dinamico
		setInterval(Main.tabContentOffset, 1000);
		$(window).resize(Main.tabContentOffset);

		$(".tab").click(function(e){
			if(!$(this).hasClass("active"))
				$(".active").toggleClass("active");
			$(this).toggleClass("active");
			
			iframe = "iframe#" + $("a",this).attr("id");
			$("iframe.active").toggleClass("active");
			$(iframe).toggleClass("active");
		});
	},
	setFixedNavBar:function(){

	},
	toggleFilters:function(){

		if($(".erea-filter-panel").css('display') == 'none'){

			$(".erea-filter-panel").show(300, function(){

				$(".erea-wrapper").on("click", Main.hideFilters);
				
			});

		}else if($(".erea-filter-panel").css('display') == 'block'){
			Main.hideFilters();
		}

		return 0;
	},
	hideFilters:function(e){

		if($(e.target).parents(".erea-filter-panel").length == 0){
			$(".erea-filter-panel").hide(300, function(){
				$(".erea-wrapper").off("click",Main.hideFilters);
			});
		}
		return true;
	},
	tabContentOffset:function(e){

		$(".tab-content").each(function(){
			paddingTop = $(this).prev().height();
			$(this).attr("style", "padding-top: "+(paddingTop-1)+"px !important;");
		});

		$( ".erea-page" ).css("height", $(window).height()+"px");
		return true;
	}
}

$(Main.init);
