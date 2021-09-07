<?php
    $tstart= microtime(true);

    /* define this as true in another entry file, then include this file to simply access the API
     * without executing the MODX request handler */
    if (!defined('MODX_API_MODE')) {
        define('MODX_API_MODE', false);
    }

    /* include custom core config and define core path */
    @include(dirname(__FILE__) . '/config.core.php');
    if (!defined('MODX_CORE_PATH')) define('MODX_CORE_PATH', dirname(__FILE__) . '/core/');

    /* include the modX class */
    if (!@include_once (MODX_CORE_PATH . "model/modx/modx.class.php")) {
        $errorMessage = 'Site temporarily unavailable';
        @include(MODX_CORE_PATH . 'error/unavailable.include.php');
        header($_SERVER['SERVER_PROTOCOL'] . ' 503 Service Unavailable');
        echo "<html><title>Error 503: Site temporarily unavailable</title><body><h1>Error 503</h1><p>{$errorMessage}</p></body></html>";
        exit();
    }

    /* Create an instance of the modX class */
    $modx= new modX();
    if (!is_object($modx) || !($modx instanceof modX)) {
        @include(MODX_CORE_PATH . 'error/unavailable.include.php');
        header($_SERVER['SERVER_PROTOCOL'] . ' 503 Service Unavailable');
        echo "<html><title>Error 503: Site temporarily unavailable</title><body><h1>Error 503</h1><p>Not installed</p></body></html>";
        exit();
    }

    /* Set the actual start time */
    $modx->startTime= $tstart;

    /* Initialize the default 'web' context */
    $modx->initialize('web');

    // Main part
    if (isset($_POST['subj'])) { $subj = $_POST['subj']; } else $subj = "";
    if (isset($_POST['phone'])) { $phone = $_POST['phone']; } else $phone = "";
    if (isset($_POST['name'])) { $name = $_POST['name']; } else $name = "";
    if (isset($_POST['email'])) { $clientemail = $_POST['email']; } else $clientemail = "";
    if (isset($_POST['message'])) { $message = $_POST['message']; } else $message = "";

    $emailsender = 'site@bt-l.ru';

    $to0 = "beauty@bt-l.ru";
    $to1 = "spa.lounge@mail.ru";
    $to2 = "zokrat@yandex.ru";

    // $mes = "Тема: Заказ обратного звонка с сайта!\nТелефон: $phone\n";
    $mes = "Тема: $subj\nТелефон: $phone\nИмя: $name\nE-mail: $clientemail\nСообщение: $message";
    $sub = 'Сообщение или заказ звонка с сайта'; //сабж


    // Взято здесь: https://ilyaut.ru/reposts/sending-mail-through-modmail/

    /*Активируем почтовый сервис MODX*/
    $modx->getService('mail', 'mail.modPHPMailer');

    $mail = $modx->mail;
    $mail->set(modMail::MAIL_CHARSET, 'UTF-8');
 
    $mail->mailer->isSMTP();
    $mail->set(modMail::MAIL_SMTP_AUTH, true);
    $mail->mailer->SMTPDebug = 1;

    $mail->set(modMail::MAIL_SMTP_HOSTS, 'ssl://smtp.mail.ru');
    $mail->set(modMail::MAIL_SMTP_PORT, 465);
    $mail->set(modMail::MAIL_SMTP_USER,'site@bt-l.ru');
    $mail->set(modMail::MAIL_SMTP_PASS, '#S35aBFMnbuv');
    $mail->set(modMail::MAIL_FROM, $emailsender);
    $mail->set(modMail::MAIL_FROM_NAME, $modx->getOption('site_name'));

    /*Адрес получателя нашего письма*/
    $mail->address('to', $to0);
    $modx->mail->address('cc', $to1);
    $modx->mail->address('cc', $to2);

    /*Заголовок сообщения*/
    $mail->set(modMail::MAIL_SUBJECT, $sub);

    /*Подставляем чанк с телом письма (предварительно его нужно создать)*/
    $mail->set(modMail::MAIL_BODY, $mes);

    /*Отправляем*/
    $mail->setHTML(false);
    if (!$mail->send()) {
        $modx->log(modX::LOG_LEVEL_ERROR, 'An error occurred while trying to send the email: ' . $mail->mailer->ErrorInfo);
    }
    $mail->reset();

    ini_set('short_open_tag', 'On');
    header('Refresh: 3; URL=index.html');
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="refresh" content="3; url=index.html">
		<title>Ваше сообщение принято</title>
		<meta name="generator">

		<style type="text/css">
			body{
			   background: #93d0df;
			}
			.ok{
				width: 300px;
				height: 200px;
				position: fixed;
				left: 50%;
				top: 50%;
				margin-left: -150px;
				margin-top: -100px;
				text-align: center;
			}
			.ok p{
				font: 700 36px/42px Verdana;
				color: #2e59a8;
			}

		</style>
	</head>
<body>


	<div class="ok">
		<p>Ваше сообщение принято</p>
	</div>

	<script type="text/javascript">
	setTimeout('location.replace("/index.php")', 3000);
	/*Изменить текущий адрес страницы через 3 секунды (3000 миллисекунд)*/
	</script>

</body>
</html>

