function siteResizeFunction() {
	topLine3 = $(".topLine3__area").height();
	header3 = $(".header3__area");
	header3Height = $(".header3__area").height();
	prevWindowWidth = windowWidth;
	windowWidth = $window.width();

	if (prevWindowWidth <= 1024 && windowWidth > 1024) {
		$(".eShopMenu__mobileBtn").removeClass("eShopMenu__mobileBtn_active");
		$(".eShopMenu__outer_catalogOnly").show();
		$(".floatBox__leftOverlay").fadeOut(300);
		$("body").removeClass("stop");

		//закрываем всплывашки брендов, фильтров и каталога при смене режима с мобильного на десктопный
		$(".eFilter__area").slideUp(300);
		$(".eFilter__mbBtn").removeClass("eFilter__mbBtn_active");
		$(".eFilter__overlay").fadeOut(300);
		$(".JS_Filters_reset").hide();
		$("body").removeClass("stop");
		$(".eFilterArea__wrapper").removeClass("mbBtn_100");
		setTimeout(function () {
			$(".eFilter__area").show();
		}, 300);
		$(".eShopMenu__overlay").fadeOut(300);
	}
	if (prevWindowWidth > 1024 && windowWidth <= 1024) {
		$(".eShopMenu__outer_catalogOnly").hide().removeClass("eShopMenu__outer_catalogOnly_active");

		//коррекция всплывашки брендов, фильтров и каталога при смене режима с мобильного на десктопный
		$(".eFilter__area").hide();
	}

	//* start - cabinetTabs **/ + __eShopCabinet.js
	if (prevWindowWidth <= 768 && windowWidth > 768) {
		$(".cab2__tab > a").removeClass("active");
		$(".cab2__tab > section").removeClass("openSection").hide();
		$(".cab2__tabs").children("li").first().children("a").addClass("active").next().addClass("openSection").show();

		//Закрываем бренды
		$(".eBrands__content").slideUp(300);
		$(".eBrands__btn").removeClass("eBrands__btn_active");
		$(".eBrands__btn").removeClass("eBrands__btn_active");
		$(".eBrands__overlay").fadeOut(300);
		$("body").removeClass("stop");
		$(".eBrands__area_x").removeClass("mbBtn_100");
		//закрываем фильтры
		$(".eFilter__area").slideUp(300);
		$(".eFilter__mbBtn").removeClass("eFilter__mbBtn_active");
		$(".eFilter__overlay").fadeOut(300);
		$(".JS_Filters_reset").hide();
		// $("body").removeClass("stop");
		$(".eFilterArea__wrapper").removeClass("mbBtn_100");
		//закрываем открытое меню
		$(".eShopMenu__mobileBtn").removeClass("eShopMenu__mobileBtn_active");
		$(".eShopMenu__outer_catalogOnly").slideUp(300).removeClass("eShopMenu__outer_catalogOnly_active");
		$(".eShopMenu__overlay").fadeOut(300);
	}
	if (prevWindowWidth > 768 && windowWidth <= 768) {
		$(".cab2__tab:not(:first) > a").removeClass("active");
		$(".cab2__tab:not(:first) > section").removeClass("openSection").slideUp();

		$(".cab2__tabs").children("li").first().children("a").addClass("active").next().addClass("openSection").slideDown();
		// $(".cab2__tabs").children("li").first().children("a").removeClass("active").next().removeClass("open").hide();

		$(".mobileTabs option:first").prop("selected", true);
	}
	//* end - cabinetTabs **/

	if (prevWindowWidth <= 600 && windowWidth > 600) {
		$(".masterWindowForm__overlay").fadeOut(300);
		$("body").removeClass("stop");
	}

	if (prevWindowWidth <= 800 && windowWidth > 800) {
		$(".xIntro__more").removeClass("xIntro__more_active").text("Подробнее...");
		$(".xMore").removeClass("xMore_active").hide();
		$(".brandIntro__right").show();
	}
	if (prevWindowWidth > 800 && windowWidth <= 800) {
		$(".xIntro__more").removeClass("xIntro__more_active").text("Подробнее...");
		$(".xMore").removeClass("xMore_active").hide();
		$(".brandIntro__right").hide();
	}

	// if (prevWindowWidth > 600 && windowWidth <= 600) {
	//   $(".eShopMenu__outer_catalogOnly").hide();
	// }
	if (prevWindowWidth <= 1080 && windowWidth > 1080) {
		leftSlideMenuClose();
	}

	// if ($(window).width() <= 600) {
	// 	floatOrderBtn();
	// 	console.log("ресайз");
	// }

	floatOrderBtn();

	if (prevWindowWidth > 600 && windowWidth <= 600) {
		floatActionOpen();
	}
}

$(function () {
	// siteResizeFunction();
	$window.on("resize", siteResizeFunction);
});
