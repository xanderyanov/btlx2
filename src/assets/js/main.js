$(function () {
	if ($(".summernote").length) {
		$(".summernote").summernote({
			placeholder: "Hello stand alone ui",
			tabsize: 2,
			prettifyHtml: true,
			height: 120,
			toolbar: [
				["style", ["style"]],
				["font", ["bold", "underline", "clear"]],
				["color", ["color"]],
				["para", ["ul", "ol", "paragraph"]],
				["table", ["table"]],
				["insert", ["link", "picture", "video"]],
				["view", ["codeview", "help"]],
			],
		});
		/* Auto format CodeView with indents */
		// var $codeMirror;
		// $summernote.on("summernote.codeview.toggled", event => {
		// 	var editor = $codeMirror || $("textarea.note-codable").data("cmEditor");
		// 	editor.execCommand("selectAll");
		// 	editor.execCommand("indentAuto");
		// 	editor.execCommand("goDocStart");
		// });

		$(".saveTextCode").on("click", function () {
			var markupStr = $(".summernote").summernote("code");
			console.log(markupStr);
		});
	}
	if ($(".xIntro__area").length) {
		$(".xIntro__more").on("click", function () {
			if ($(this).hasClass("xIntro__more_active")) {
				$(this).removeClass("xIntro__more_active").text("Подробнее...");
				$(".xMore").removeClass("xMore_active").slideUp();
				if ($window.width() <= 800) {
					$(".brandIntro__right").slideUp();
				}
			} else {
				$(this).addClass("xIntro__more_active").text("Скрыть");
				$(".xMore").addClass("xMore_active").slideDown();

				if ($window.width() <= 800) {
					$(".brandIntro__right").slideDown();
				}
			}
		});
	}
});
