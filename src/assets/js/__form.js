function validateNonEmpty(selector, title, text) {
	var elem = $(selector);
	var value = elem.val();
	if (value === "") {
		swal({ title: title, text: text, type: "error", confirmButtonText: "ок" });
		elem.addClass("error");
		setTimeout(function () {
			elem.removeClass("error");
		}, 3000);
		return false;
	}

	elem.removeClass("error");
	return value;
}

function validateName(selector, data) {
	var value = validateNonEmpty(selector, "Поле Имя пустое", "Заполните поле Имя");
	if (value === false) return false;
	data.name = value;
	return true;
}

function validatePhone(selector, data) {
	var value = validateNonEmpty(selector, "Поле Телефон пустое", "Заполните поле Телефон");
	if (value === false) return false;
	data.phone = value;
	return true;
}

function validateMessage(selector, data) {
	var value = validateNonEmpty(selector, "Пустое сообщение", "Заполните текст сообщения");
	if (value === false) return false;
	data.message = value;
	return true;
}

var emailRegex = /^[\w.\d-_]+@[\w.\d-_]+\.\w{2,4}$/i;

function validateEmail(selector, data) {
	var elem = $(selector);
	var value = elem.val();

	if (value === "") {
		swal({ title: "Ошибка Email", text: "Заполните поле Email", type: "error", confirmButtonText: "ок" });
		elem.addClass("error");
		setTimeout(function () {
			elem.removeClass("error");
		}, 3000);
		return false;
	}

	if (!emailRegex.test(value)) {
		swal({ title: "Ошибка", text: "Корректно заполните поле e-mail", type: "error", confirmButtonText: "ок" });
		elem.addClass("error");
		setTimeout(function () {
			elem.removeClass("error");
		}, 3000);
		return false;
	}

	elem.removeClass("error");
	data.email = value;
	return true;
}

function validateWorkEmail(selector) {
	var elem = $(selector);
	var value = elem.val();
	if (value !== "") {
		swal({ title: "Ах ты жулик", text: "Уберите робота от компьютера", type: "error", confirmButtonText: "ок" });
		return false;
	}
	return true;
}

function validateCheckbox(selector) {
	var elem = $(selector);
	if (!elem.is(":checked")) {
		swal({ title: "Отметьте чекбокс", text: "Дайте свое согласие на обработку данных!", type: "error", confirmButtonText: "ок" });
		return false;
	}
	return true;
}

var mailUrl = "/sendmail";

$(function () {
	//Форма на главной
	$(".form_m3").on("click", ".submit_m3", function (e) {
		e.preventDefault();

		var data = { subj: "Форма главной страницы" };

		if (validateName(".name_m3", data) && validatePhone(".phone_m3", data) && validateWorkEmail(".work_email_m3") && validateCheckbox(".checkbox_m3")) {
			$.post(mailUrl, data,
				function () {
					swal({ title: "Спасибо", text: "Ваше сообщение отправлено", type: "success", confirmButtonText: "ок" });
					$(".name_m3, .phone_m3").val("");
					$(".checkbox_m3:checked").prop("checked", false);
				}
			);
		}
	});

	//Форма на странице внизу
	$(".form13").on("click", ".submit13", function (e) {
		e.preventDefault();

		var data = { subj: $(".subj13").text() };

		if (validateName(".name13", data) && validatePhone(".phone13", data) && validateWorkEmail(".work_email13") && validateCheckbox(".checkbox13")) {
			$.post(mailUrl, data,
				function () {
					swal({ title: "Спасибо", text: "Ваше сообщение отправлено", type: "success", confirmButtonText: "ок" });
					$(".name13, .phone13").val("");
					$(".checkbox13:checked").prop("checked", false);
				}
			);
		}
	});

	//Форма на странице контактов
	$(".form3").on("click", ".submit3", function (e) {
		e.preventDefault();

		var data = { subj: "Сообщение со страницы контактов" };

		if (validateName(".name3", data) && validatePhone(".phone3", data) && validateEmail(".email3", data) && validateWorkEmail(".work_email3")
			&& validateMessage(".message3", data) && validateCheckbox(".checkbox3")
		) {
			data.name += " " + $(".surname3").val();
			$.post(mailUrl, data,
				function () {
					swal({ title: "Спасибо", text: "Ваше сообщение отправлено", type: "success", confirmButtonText: "ок" });
					$(".name3, .surname3, .phone3, .email3, .message3").val("");
					$(".checkbox3:checked").prop("checked", false);
				}
			);
		}
	});

	//Форма на всплывашке позвонить (заказать звонок)
	$(".callback").on("click", ".submit_callback", function (e) {
		e.preventDefault();
		e.stopPropagation();

		var data = { subj: "Форма заказа обратного звонка" };

		if (validateName(".name_callback", data) && validatePhone(".phone_callback", data) && validateWorkEmail(".work_email_callback") && validateCheckbox(".checkbox_callback")) {
			$.post(mailUrl, data,
				function () {
					swal({ title: "Спасибо", text: "Заказ обратного звонка отправлен, наши менеджеры свяжутся с Вами в ближайшее время", type: "success", confirmButtonText: "ок" });
					$(".name_callback, .phone_callback").val("");
					$(".checkbox_callback:checked").prop("checked", false);
					$(".callBackBtn").removeClass("active");
					$(".callBack__form").addClass("bounceOutUp").removeClass("bounceInDown").fadeOut(600);
					setTimeout(function () {
						$(".callBack__overlay").fadeOut();
					}, 800);
				}
			);
		}
	});

	//Форма мастера на десктопе
	$(".mf3").on("click", ".submit_mf3", function (e) {
		e.preventDefault();
		var masterName = $(".mf3_subj").text();
		var data = { subj: "Форма со страницы мастера" + masterName };

		if (validateName(".name_mf3", data) && validatePhone(".phone_mf3", data) && validateWorkEmail(".work_email_mf3") && validateCheckbox(".checkbox_mf3")) {
			$.post(mailUrl, data,
				function () {
					swal({ title: "Спасибо", text: "Ваше сообщение отправлено", type: "success", confirmButtonText: "ок" });
					$(".name_mf3, .phone_mf3").val("");
					$(".checkbox_mf3:checked").prop("checked", false);
				}
			);
		}
	});

	//Форма мастера всплывашка на мибиле
	$(".mf3_popup").on("click", ".submit_mf3_popup", function (e) {
		e.preventDefault();
		var masterName = $(".mf3_subj_popup").text();
		var data = { subj: "Форма со страницы мастера" + masterName };

		if (validateName(".name_mf3_popup", data) && validatePhone(".phone_mf3_popup", data) && validateWorkEmail(".work_email_mf3_popup") && validateCheckbox(".checkbox_mf3_popup")) {
			$.post(mailUrl, data,
				function () {
					swal({ title: "Спасибо", text: "Ваше сообщение отправлено", type: "success", confirmButtonText: "ок" });
					$(".name_mf3_popup, .phone_mf3_popup").val("");
					$(".checkbox_mf3_popup:checked").prop("checked", false);
					$(".name_mf3_popup").val("").removeClass("error");
					$(".phone_mf3_popup").val("").removeClass("error");
					$(".form_mf3alrightBox_popup").val("").removeClass("error");
					$(".checkbox_mf3_popup:checked").prop("checked", false);
					$(".masterWindowForm__overlay").fadeOut(300);
					$("body").removeClass("stop");
				}
			);
		}
	});

});
