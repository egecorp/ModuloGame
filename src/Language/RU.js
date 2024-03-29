import GAME_STATUS from '../Lib/GameStatus';

export function AddPackets(addPackFunction)
{
	var pack = addPackFunction('ru');

	pack.AddDictionary('common', 
	{
		'modalButtonContinue' : 'Продолжить',
		'modalButtonClose' : 'Закрыть',
		'modalButtonYes' : 'Да',
		'modalButtonNo' : 'Нет',


		'popupButtonContinue' : 'Продолжить',
		'popupButtonSend' : 'Отправить',
		'popupButtonCancel' : 'Отменить',
		'popupButtonBack' : 'Назад',
		'popupButtonAccept' : 'Принять',
		'popupButtonDecline' : 'Отказать',
		'popupButtonWait' : 'Подождать',
		'popupButtonWithdraw' : 'Отозвать'
		

	});

	pack.AddDictionary('signin', 
	{
		'welcomeIn' : 'Добро пожаловать в',
		'typeAnonimTitle' : 'Играть анонимно',
		'typeSignUpTitle' : 'Создать уч. запись',
		'typeSignInTitle' : 'Войти в аккаунт',
		'typeDefaultTipText' : 'Для продолжения игры выберите способ регистрации.',
		'typeAnonimTipText' : 'Играйте одиночные партии, но без изменения персонажа. При удалении приложения или смены устройства нельзя будет восстановить рейтинг.',
		'typeSignUpTipText' : 'Создание новой учётной записи для доступа ко всем функциям приложения, возможность участия в рейтинговых турнирах.',
		'typeSignInTipText' : 'Добавить данное устройство к уже существующей учётной записи.'
	});

	pack.AddDictionary('signup', 
	{
		'labelWindow' : 'Регистрация',
		'sublabelWindow' : 'Данные для регистрации:',
		'formLabelNicName' : 'Ник:',
		'formPlaceholderNicName' : 'Введите ник...',
		'formLabelEMail' : 'E-mail:',
		'formPlaceholderEMail' : 'Введите e-mail...',
		'formLabelCountry' : 'Страна:',
		'formPlaceholderCountry' : 'Выберите страну...',
		'formLabelPhone' : 'Номер телефона:',
		'formPlaceholderPhone' : '+7 (XXX) XXX-XX-XX',
		'formLabelDOB' : 'Дата рождения:',
		'formPlaceholderDOB' : 'дд.мм.гггг',
		'tipConditionBegin' : 'Нажимая кнопку «Зарегистрироваться», Вы принимаете наши',
		'tipConditionLink' : ' Условия и Политику использования данных',
		'tipConditionEnd' : '.',
		'continueButton' : 'Зарегистрироваться'
	});

	pack.AddDictionary('signup.ShowError.EmailExists', 
	{
		'labelWindow' : 'Пользователь с таким ником уже существует!',
		'text' : 'Возможно, Вы уже были зарегистрированы в Modulo.',
		'goAuth' : 'Авторизироваться?'
	});

	pack.AddDictionary('signin.modal.Success', 
	{
		'labelWindow' : 'Благодарим за регистрацию!',
		'text' : 'Для подтверждения Вашего почтового ящика и получения полных возможностей аккаунта - перейдите по ссылке в письме.'
	});


	pack.AddDictionary('signin.modal.MailCode', 
	{
		'text_1_Start' : 'На почту ',
		'text_1_End' : ' было отправлено письмо с кодом.',
		'text_2' : 'Пожалуйста, введите код в поле ниже для входа в игру:',
		'formLabel' : 'Код из письма:',
		'formPlaceholderCode' : 'Введите код...',
		'formError' : 'Неверный код, попробуйте ещё раз!',
        'linkRepeate' : 'Повторить отправку',
        'linkCancelTitle' : 'Чтобы изменить адрес почты или способ авторизации, нажмите',
        'linkCancel' : 'отменить'
	});

	pack.AddDictionary('signup.ShowError.BadEmail', 
	{
		'title' : 'Проверьте указанные данные!',
		'text' : 'Неверно указанна электронная почта',
		'continueButton' : 'Назад'
	});

	pack.AddDictionary('signup.ShowError.BadData', 
	{
		'title' : 'Проверьте указанные данные',
		'text' : 'Проверьте введённые данные и попробуйте ещё раз.',
		'continueButton' : 'Назад'
	});

	pack.AddDictionary('signup.ShowError.ServerError', 
	{
		'title' : 'Что-то пошло не так...',
		'text' : 'Проверьте подключение и попробуйте ещё раз.',
		'continueButton' : 'Назад'
	});

    pack.AddDictionary('signinauth', 
	{
		'labelWindow' : 'Вход в аккаунт',
		'sublabelWindow' : 'Авторизация:',
		'formLabelEMail' : 'E-mail:',
		'formPlaceholderEMail' : 'Введите e-mail...',
		'formLabelDeviceName' : 'Название устройства:',
		'formPlaceholderDeviceName' : 'Название вашего устройства...',
		'labelPhone' : 'Номер телефона:',
		'tipFAQ' : 'Введите e-mail, чтобы связать устройство с учётной записью. Затем нажмите "Войти" и на указанный адрес придёт письмо с кодом подтверждения.',
		'continueButton' : 'Войти'
	});


	pack.AddDictionary('signinanonim', 
	{
		'labelWindow' : 'Новый аккаунт',
		'labelYourNickname' : 'Ваш ник:',
		'tipCannotChooseImg' : 'Выбор персонажа недоступен в анонимной игре.',
		'linkGoToSignUp' : 'Создать учётную запись?',
		'tipConditionBegin' : 'Нажимая кнопку «Продолжить», Вы принимаете наши',
		'tipConditionLink' : ' Условия и Политику использования данных',
		'tipConditionEnd' : '.'
	});


	pack.AddDictionary('condition', 
	{
		'labelWindow' : 'Соглашение',
		'sublabelWindow' : 'Условия использования приложения Modulo:',
		'license' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	});

	pack.AddDictionary('gamelist', 
	{
		'labelWindow' : 'Modulo',
		'sublabelWindow' : 'Список игр:',
		'sublabelFinished' : 'Завершённые игры:',
		'buttonHeaderLabel' : 'Новая игра',
		'labelCup' : 'Турнир'
	});

	pack.AddDictionary('gamestart', 
	{
		'labelWindow' : 'Новая игра',
		'sublabelWindow' : 'Выберите режим:',
		'buttonRandomPlayer' : 'Случайный соперник',
		'buttonChoosePlayer' : 'Выбрать соперника',
		'buttonChooseBot' : 'Выбрать бота',
		'tip' : 'Выберите способ запуска новой игры.'
	});

	pack.AddDictionary('finduser', 
	{
		'labelWindow' : 'Выбор соперника',
		'sublabelRecentUsers' : 'Недавние соперники:',
		'inputPlaceholderSearch' : 'Поиск по нику...'
	});

	pack.AddDictionary('findrandom', 
	{
		'labelWindow' : 'Идёт поиск соперника...',
		'text' : 'Мы ищем случайного соперника для вашей игры. Будьте готовы!'
	});


    let dict = [];
    dict["" + GAME_STATUS.GAME_CREATING] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_WAIT_USER1] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_WAIT_USER2] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_ACCEPT] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_DECLINE_USER1] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_DECLINE_USER2] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_CANCEL] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_TIMEOUT] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_RANDOM_CREATING] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_RANDOM_FOUND] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_RANDOM_CANCEL] =  'Новая игра';
    dict["" + GAME_STATUS.GAME_RANDOM_TIMEOUT] =  'Новая игра';
    
    // 1 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_1_NOUSER] =  'Раунд 1';
    dict["" + GAME_STATUS.GAME_ROUND_1_USER1_DONE] =  'Раунд 1';
    dict["" + GAME_STATUS.GAME_ROUND_1_USER2_DONE] =  'Раунд 1';
    dict["" + GAME_STATUS.GAME_ROUND_1_USER1_GIVEUP] = 'Раунд 1';
    dict["" + GAME_STATUS.GAME_ROUND_1_USER2_GIVEUP] = 'Раунд 1';
    dict["" + GAME_STATUS.GAME_ROUND_1_TIMEOUT] =  'Раунд 1';
    
    // 2 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_2_NOUSER] =  'Раунд 2.';
    dict["" + GAME_STATUS.GAME_ROUND_2_USER1_DONE] =  'Раунд 2.';
    dict["" + GAME_STATUS.GAME_ROUND_2_USER2_DONE] =  'Раунд 2.';
    dict["" + GAME_STATUS.GAME_ROUND_2_USER1_GIVEUP] = 'Раунд 2.';
    dict["" + GAME_STATUS.GAME_ROUND_2_USER2_GIVEUP] = 'Раунд 2.';
    dict["" + GAME_STATUS.GAME_ROUND_2_TIMEOUT] =  'Раунд 2.';
    
    // 3 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_3_NOUSER] =  'Раунд 3.';
    dict["" + GAME_STATUS.GAME_ROUND_3_USER1_DONE] =  'Раунд 3.';
    dict["" + GAME_STATUS.GAME_ROUND_3_USER2_DONE] =  'Раунд 3.';
    dict["" + GAME_STATUS.GAME_ROUND_3_USER1_GIVEUP] = 'Раунд 3.';
    dict["" + GAME_STATUS.GAME_ROUND_3_USER2_GIVEUP] = 'Раунд 3.';
    dict["" + GAME_STATUS.GAME_ROUND_3_TIMEOUT] =  'Раунд 3.';

    // 4 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_4_NOUSER] = 'Раунд 4.';
    dict["" + GAME_STATUS.GAME_ROUND_4_USER1_DONE] =  'Раунд 4.';
    dict["" + GAME_STATUS.GAME_ROUND_4_USER2_DONE] =  'Раунд 4.';
    dict["" + GAME_STATUS.GAME_ROUND_4_USER1_GIVEUP] = 'Раунд 4.';
    dict["" + GAME_STATUS.GAME_ROUND_4_USER2_GIVEUP] = 'Раунд 4.';
    dict["" + GAME_STATUS.GAME_ROUND_4_TIMEOUT] =  'Раунд 4.';
    
    // 5 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_5_NOUSER] =  'Раунд 5.';
    dict["" + GAME_STATUS.GAME_ROUND_5_USER1_DONE] = 'Раунд 5.';
    dict["" + GAME_STATUS.GAME_ROUND_5_USER2_DONE] = 'Раунд 5.';
    dict["" + GAME_STATUS.GAME_ROUND_5_USER1_GIVEUP] = 'Раунд 5.';
    dict["" + GAME_STATUS.GAME_ROUND_5_USER2_GIVEUP] = 'Раунд 5.';
    dict["" + GAME_STATUS.GAME_ROUND_5_TIMEOUT] =  'Раунд 5.';
    
    // 6 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_6_NOUSER] =  'Раунд 6.';
    dict["" + GAME_STATUS.GAME_ROUND_6_USER1_DONE] = 'Раунд 6.';
    dict["" + GAME_STATUS.GAME_ROUND_6_USER2_DONE] = 'Раунд 6.';
    dict["" + GAME_STATUS.GAME_ROUND_6_USER1_GIVEUP] = 'Раунд 6.';
    dict["" + GAME_STATUS.GAME_ROUND_6_USER2_GIVEUP] = 'Раунд 6.';
    dict["" + GAME_STATUS.GAME_ROUND_6_TIMEOUT] =  'Раунд 6.';

    // FINISH
    dict["" + GAME_STATUS.GAME_FINISH_USER1_WIN] =  'Игра завершена';
    dict["" + GAME_STATUS.GAME_FINISH_USER2_WIN] =  'Игра завершена';
    dict["" + GAME_STATUS.GAME_FINISH_USER2_DRAW] =  'Игра завершена';

	pack.AddDictionary('gamestatus.round', dict);


    dict = [];
    dict["" + GAME_STATUS.GAME_CREATING] =  'Идёт создание...';
    dict["" + GAME_STATUS.GAME_WAIT_USER1] =  'Приглашение поиграть';
    dict["" + GAME_STATUS.GAME_WAIT_USER2] =  'Ожидание соперника';
    dict["" + GAME_STATUS.GAME_ACCEPT] =  'Игра начинается...';
    dict["" + GAME_STATUS.GAME_DECLINE_USER1] =  'Вы отказались играть';
    dict["" + GAME_STATUS.GAME_DECLINE_USER2] =  'Соперник отказался';
    dict["" + GAME_STATUS.GAME_CANCEL] =  'Игра отменена';
    dict["" + GAME_STATUS.GAME_TIMEOUT] =  'Истекло время ожидания';
    dict["" + GAME_STATUS.GAME_RANDOM_CREATING] =  'Идёт поиск соперника...';
    dict["" + GAME_STATUS.GAME_RANDOM_FOUND] =  'Игра начинается...';
    dict["" + GAME_STATUS.GAME_RANDOM_CANCEL] =  'Игра отменена';
    dict["" + GAME_STATUS.GAME_RANDOM_TIMEOUT] =  'Истекло время поиска';
    
    // 1 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_1_NOUSER] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_1_USER1_DONE] =  'Ожидание соперника...';
    dict["" + GAME_STATUS.GAME_ROUND_1_USER2_DONE] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_1_USER1_GIVEUP] = 'Вы сдались';
    dict["" + GAME_STATUS.GAME_ROUND_1_USER2_GIVEUP] = 'Соперник сдался';
    dict["" + GAME_STATUS.GAME_ROUND_1_TIMEOUT] =  'Время истекло';
    
    // 2 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_2_NOUSER] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_2_USER1_DONE] =  'Ожидание соперника...';
    dict["" + GAME_STATUS.GAME_ROUND_2_USER2_DONE] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_2_USER1_GIVEUP] = 'Вы сдались';
    dict["" + GAME_STATUS.GAME_ROUND_2_USER2_GIVEUP] = 'Соперник сдался';
    dict["" + GAME_STATUS.GAME_ROUND_2_TIMEOUT] =  'Время истекло';
    
    // 3 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_3_NOUSER] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_3_USER1_DONE] =  'Ожидание соперника...';
    dict["" + GAME_STATUS.GAME_ROUND_3_USER2_DONE] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_3_USER1_GIVEUP] = 'Вы сдались';
    dict["" + GAME_STATUS.GAME_ROUND_3_USER2_GIVEUP] = 'Соперник сдался';
    dict["" + GAME_STATUS.GAME_ROUND_3_TIMEOUT] =  'Время истекло';

    // 4 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_4_NOUSER] = 'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_4_USER1_DONE] =  'Ожидание соперника...';
    dict["" + GAME_STATUS.GAME_ROUND_4_USER2_DONE] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_4_USER1_GIVEUP] = 'Вы сдались';
    dict["" + GAME_STATUS.GAME_ROUND_4_USER2_GIVEUP] = 'Соперник сдался';
    dict["" + GAME_STATUS.GAME_ROUND_4_TIMEOUT] =  'Время истекло';
    
    // 5 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_5_NOUSER] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_5_USER1_DONE] = 'Ожидание соперника...';
    dict["" + GAME_STATUS.GAME_ROUND_5_USER2_DONE] = 'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_5_USER1_GIVEUP] = 'Вы сдались';
    dict["" + GAME_STATUS.GAME_ROUND_5_USER2_GIVEUP] = 'Соперник сдался';
    dict["" + GAME_STATUS.GAME_ROUND_5_TIMEOUT] =  'Время истекло';
    
    // 6 ROUND
    dict["" + GAME_STATUS.GAME_ROUND_6_NOUSER] =  'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_6_USER1_DONE] = 'Ожидание соперника...';
    dict["" + GAME_STATUS.GAME_ROUND_6_USER2_DONE] = 'Ваш ход';
    dict["" + GAME_STATUS.GAME_ROUND_6_USER1_GIVEUP] = 'Вы сдались';
    dict["" + GAME_STATUS.GAME_ROUND_6_USER2_GIVEUP] = 'Соперник сдался';
    dict["" + GAME_STATUS.GAME_ROUND_6_TIMEOUT] =  'Время истекло';

    // FINISH
    dict["" + GAME_STATUS.GAME_FINISH_USER1_WIN] =  'Победа';
    dict["" + GAME_STATUS.GAME_FINISH_USER2_WIN] =  'Поражение';
    dict["" + GAME_STATUS.GAME_FINISH_USER2_DRAW] =  'Ничья';

	pack.AddDictionary('gamestatus.action', dict);

    pack.AddDictionary('game.page', 
	{
        'StartGame.WaitMeTitle' : 'Приглашение',
		'StartGame.WaitMe' : 'Соперник предложил Вам сыграть',
        'StartGame.Wait' : 'Приглашение сыграть отправлено',

		'StartGame.AcceptMe' : 'Вы приняли приглашение',
        'StartGame.Accept' : 'Соперник принял приглашение',
        
        'StartGame.DeclineMe' : 'Вы отказались играть',
        'StartGame.Decline' : 'Соперник отказался играть',

        'StartGame.CancelMe' : 'Вы отозвали приглашение',
        'StartGame.Cancel' : 'Соперник отозвал приглагение',

        'StartGame.TimeoutInvitation' : 'Время ответа на приглашение истекло',

        'StartGame.RoundPlay' : 'Ваш ход',
        'StartGame.RoundDone' : 'Ожидание соперника',
        'StartGame.RoundDoneTimeout' : 'Время истекло',
        
        'StartGame.GiveUpMe' : 'Вы сдались',
        'StartGame.GiveUp' : 'Соперник сдался',

        'StartGame.Win' : 'Вы победили!',
        'StartGame.Defease' : 'Вы проиграли.',
        'StartGame.Draw' : 'Ничья',


        'StartGame.WaitPlease' : 'Пожалуйста подождите',
        'StartGame.Loading' : 'Идёт загрузка данных...',

        'GiveUp' : 'Сдаться',

        'GameHeader'  : 'Modulo',

        'FooterButtonPlayRound'  : 'Сделать ход',
        'FooterButtonPlayNextRound'  : 'Следующий ход',
        'FooterButtonWait'  : 'Ожидаем соперника',
        'FooterButtonWithdraw'  : 'Отменить приглашение',
        'FooterButtonBack' : 'Назад',


        'InvitationText1' : 'Ваше приглашение было отправлено игроку.',
        'InvitationText2' : 'Ожидайте ответа...',

        'StartGame.NoGame':'Игра не состоялась',

        'Score.Waiting' : 'Ожидание хода',
        'Score.NotFinish' : 'Раунд не закончен',

        'RoundName1':'Раунд 1',
        'RoundName2':'Раунд 2',
        'RoundName3':'Раунд 3',
        'RoundName4':'Раунд 4',
        'RoundName5':'Раунд 5',
	});


    pack.AddDictionary('menu', 
    {
        'menu' : 'Меню',
        'statistic' : 'Статистика',
        'rules' : 'Правила игры',
        'conditions' : 'Пользовательское соглашение',
        'settings' : 'Настройки',
        'exit' : 'Выход',
    });

    pack.AddDictionary('SignIn.ShowError.UserNotFound', 
    {
        'title' : 'Пользователь не найден',
        'text' : 'Неверно указанна электронная почта',
    });
    pack.AddDictionary('SignIn.ShowError.AlreadyBound', 
    {
        'title' : 'Ошибка входа',
        'text' : 'Данное устройство уже привязано, попробуйте перезагрузить приложение',
    });
    pack.AddDictionary('SignIn.ShowError.UserBlocked', 
    {
        'title' : 'Пользователь заблокирован',
        'text' : 'Вы не можете привязать устройство к данному пользователю',
    }); 
    pack.AddDictionary('SignIn.ShowError.BadUser', 
    {
        'title' : 'Ошибка входа',
        'text' : 'Вы не можете привязать устройство к данному пользователю',
    });           

    pack.AddDictionary('SignIn.ShowError.TooQuick', 
	{
		'title' : 'Слишком быстро',
		'text' : 'Нельзя запрашивать повтор отправки так часто.',
	});

    pack.AddDictionary('SignIn.ShowError.BadCode', 
	{
		'title' : 'Внимание',
		'text' : 'Некорректный код.',
	});
    
    pack.AddDictionary('SignIn.ShowError.BadCode', 
	{
		'title' : 'Внимание',
		'text' : 'Некорректный код.',
	});

    pack.AddDictionary('SignIn.ShowError.ExpiredCode', 
	{
		'title' : 'Внимание',
		'text' : 'Срок действия кода истёк.',
	});
    

	pack.AddDictionary('country',
	{
		"AU":"\u0410\u0432\u0441\u0442\u0440\u0430\u043b\u0438\u044f",
		"AT":"\u0410\u0432\u0441\u0442\u0440\u0438\u044f",
		"AZ":"\u0410\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043d",
		"AX":"\u0410\u043b\u0430\u043d\u0434\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430",
		"AL":"\u0410\u043b\u0431\u0430\u043d\u0438\u044f",
		"DZ":"\u0410\u043b\u0436\u0438\u0440",
		"AS":"\u0410\u043c\u0435\u0440\u0438\u043a\u0430\u043d\u0441\u043a\u043e\u0435 \u0421\u0430\u043c\u043e\u0430",
		"AI":"\u0410\u043d\u0433\u0438\u043b\u044c\u044f",
		"AO":"\u0410\u043d\u0433\u043e\u043b\u0430",
		"AD":"\u0410\u043d\u0434\u043e\u0440\u0440\u0430",
		"AQ":"\u0410\u043d\u0442\u0430\u0440\u043a\u0442\u0438\u0434\u0430",
		"AG":"\u0410\u043d\u0442\u0438\u0433\u0443\u0430 \u0438 \u0411\u0430\u0440\u0431\u0443\u0434\u0430",
		"AR":"\u0410\u0440\u0433\u0435\u043d\u0442\u0438\u043d\u0430",
		"AM":"\u0410\u0440\u043c\u0435\u043d\u0438\u044f",
		"AW":"\u0410\u0440\u0443\u0431\u0430",
		"AF":"\u0410\u0444\u0433\u0430\u043d\u0438\u0441\u0442\u0430\u043d",
		"BS":"\u0411\u0430\u0433\u0430\u043c\u044b",
		"BD":"\u0411\u0430\u043d\u0433\u043b\u0430\u0434\u0435\u0448",
		"BB":"\u0411\u0430\u0440\u0431\u0430\u0434\u043e\u0441",
		"BH":"\u0411\u0430\u0445\u0440\u0435\u0439\u043d",
		"BY":"\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c",
		"BZ":"\u0411\u0435\u043b\u0438\u0437",
		"BE":"\u0411\u0435\u043b\u044c\u0433\u0438\u044f",
		"BJ":"\u0411\u0435\u043d\u0438\u043d",
		"BM":"\u0411\u0435\u0440\u043c\u0443\u0434\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430",
		"BG":"\u0411\u043e\u043b\u0433\u0430\u0440\u0438\u044f",
		"BO":"\u0411\u043e\u043b\u0438\u0432\u0438\u044f",
		"BQ":"\u0411\u043e\u043d\u044d\u0439\u0440, \u0421\u0438\u043d\u0442-\u042d\u0441\u0442\u0430\u0442\u0438\u0443\u0441 \u0438 \u0421\u0430\u0431\u0430",
		"BA":"\u0411\u043e\u0441\u043d\u0438\u044f \u0438 \u0413\u0435\u0440\u0446\u0435\u0433\u043e\u0432\u0438\u043d\u0430",
		"BW":"\u0411\u043e\u0442\u0441\u0432\u0430\u043d\u0430",
		"BR":"\u0411\u0440\u0430\u0437\u0438\u043b\u0438\u044f",
		"IO":"\u0411\u0440\u0438\u0442\u0430\u043d\u0441\u043a\u0430\u044f \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u044f \u0432 \u0418\u043d\u0434\u0438\u0439\u0441\u043a\u043e\u043c \u043e\u043a\u0435\u0430\u043d\u0435",
		"BN":"\u0411\u0440\u0443\u043d\u0435\u0439-\u0414\u0430\u0440\u0443\u0441\u0441\u0430\u043b\u0430\u043c",
		"BF":"\u0411\u0443\u0440\u043a\u0438\u043d\u0430-\u0424\u0430\u0441\u043e",
		"BI":"\u0411\u0443\u0440\u0443\u043d\u0434\u0438",
		"BT":"\u0411\u0443\u0442\u0430\u043d",
		"VU":"\u0412\u0430\u043d\u0443\u0430\u0442\u0443",
		"VA":"\u0412\u0430\u0442\u0438\u043a\u0430\u043d",
		"GB":"\u0412\u0435\u043b\u0438\u043a\u043e\u0431\u0440\u0438\u0442\u0430\u043d\u0438\u044f",
		"HU":"\u0412\u0435\u043d\u0433\u0440\u0438\u044f",
		"VE":"\u0412\u0435\u043d\u0435\u0441\u0443\u044d\u043b\u0430",
		"VG":"\u0412\u0438\u0440\u0433\u0438\u043d\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430 (\u0412\u0435\u043b\u0438\u043a\u043e\u0431\u0440\u0438\u0442\u0430\u043d\u0438\u044f)",
		"VI":"\u0412\u0438\u0440\u0433\u0438\u043d\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430 (\u0421\u0428\u0410)",
		"UM":"\u0412\u043d\u0435\u0448\u043d\u0438\u0435 \u043c\u0430\u043b\u044b\u0435 \u043e-\u0432\u0430 (\u0421\u0428\u0410)",
		"TL":"\u0412\u043e\u0441\u0442\u043e\u0447\u043d\u044b\u0439 \u0422\u0438\u043c\u043e\u0440",
		"VN":"\u0412\u044c\u0435\u0442\u043d\u0430\u043c",
		"GA":"\u0413\u0430\u0431\u043e\u043d",
		"HT":"\u0413\u0430\u0438\u0442\u0438",
		"GY":"\u0413\u0430\u0439\u0430\u043d\u0430",
		"GM":"\u0413\u0430\u043c\u0431\u0438\u044f",
		"GH":"\u0413\u0430\u043d\u0430",
		"GP":"\u0413\u0432\u0430\u0434\u0435\u043b\u0443\u043f\u0430",
		"GT":"\u0413\u0432\u0430\u0442\u0435\u043c\u0430\u043b\u0430",
		"GN":"\u0413\u0432\u0438\u043d\u0435\u044f",
		"GW":"\u0413\u0432\u0438\u043d\u0435\u044f-\u0411\u0438\u0441\u0430\u0443",
		"DE":"\u0413\u0435\u0440\u043c\u0430\u043d\u0438\u044f",
		"GG":"\u0413\u0435\u0440\u043d\u0441\u0438",
		"GI":"\u0413\u0438\u0431\u0440\u0430\u043b\u0442\u0430\u0440",
		"HN":"\u0413\u043e\u043d\u0434\u0443\u0440\u0430\u0441",
		"HK":"\u0413\u043e\u043d\u043a\u043e\u043d\u0433 (\u0421\u0410\u0420)",
		"GD":"\u0413\u0440\u0435\u043d\u0430\u0434\u0430",
		"GL":"\u0413\u0440\u0435\u043d\u043b\u0430\u043d\u0434\u0438\u044f",
		"GR":"\u0413\u0440\u0435\u0446\u0438\u044f",
		"GE":"\u0413\u0440\u0443\u0437\u0438\u044f",
		"GU":"\u0413\u0443\u0430\u043c",
		"DK":"\u0414\u0430\u043d\u0438\u044f",
		"JE":"\u0414\u0436\u0435\u0440\u0441\u0438",
		"DJ":"\u0414\u0436\u0438\u0431\u0443\u0442\u0438",
		"DM":"\u0414\u043e\u043c\u0438\u043d\u0438\u043a\u0430",
		"DO":"\u0414\u043e\u043c\u0438\u043d\u0438\u043a\u0430\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
		"EG":"\u0415\u0433\u0438\u043f\u0435\u0442",
		"ZM":"\u0417\u0430\u043c\u0431\u0438\u044f",
		"EH":"\u0417\u0430\u043f\u0430\u0434\u043d\u0430\u044f \u0421\u0430\u0445\u0430\u0440\u0430",
		"ZW":"\u0417\u0438\u043c\u0431\u0430\u0431\u0432\u0435",
		"IL":"\u0418\u0437\u0440\u0430\u0438\u043b\u044c",
		"IN":"\u0418\u043d\u0434\u0438\u044f",
		"ID":"\u0418\u043d\u0434\u043e\u043d\u0435\u0437\u0438\u044f",
		"JO":"\u0418\u043e\u0440\u0434\u0430\u043d\u0438\u044f",
		"IQ":"\u0418\u0440\u0430\u043a",
		"IR":"\u0418\u0440\u0430\u043d",
		"IE":"\u0418\u0440\u043b\u0430\u043d\u0434\u0438\u044f",
		"IS":"\u0418\u0441\u043b\u0430\u043d\u0434\u0438\u044f",
		"ES":"\u0418\u0441\u043f\u0430\u043d\u0438\u044f",
		"IT":"\u0418\u0442\u0430\u043b\u0438\u044f",
		"YE":"\u0419\u0435\u043c\u0435\u043d",
		"CV":"\u041a\u0430\u0431\u043e-\u0412\u0435\u0440\u0434\u0435",
		"KZ":"\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d",
		"KH":"\u041a\u0430\u043c\u0431\u043e\u0434\u0436\u0430",
		"CM":"\u041a\u0430\u043c\u0435\u0440\u0443\u043d",
		"CA":"\u041a\u0430\u043d\u0430\u0434\u0430",
		"QA":"\u041a\u0430\u0442\u0430\u0440",
		"KE":"\u041a\u0435\u043d\u0438\u044f",
		"CY":"\u041a\u0438\u043f\u0440",
		"KG":"\u041a\u0438\u0440\u0433\u0438\u0437\u0438\u044f",
		"KI":"\u041a\u0438\u0440\u0438\u0431\u0430\u0442\u0438",
		"CN":"\u041a\u0438\u0442\u0430\u0439",
		"KP":"\u041a\u041d\u0414\u0420",
		"CC":"\u041a\u043e\u043a\u043e\u0441\u043e\u0432\u044b\u0435 \u043e-\u0432\u0430",
		"CO":"\u041a\u043e\u043b\u0443\u043c\u0431\u0438\u044f",
		"KM":"\u041a\u043e\u043c\u043e\u0440\u044b",
		"CG":"\u041a\u043e\u043d\u0433\u043e - \u0411\u0440\u0430\u0437\u0437\u0430\u0432\u0438\u043b\u044c",
		"CD":"\u041a\u043e\u043d\u0433\u043e - \u041a\u0438\u043d\u0448\u0430\u0441\u0430",
		"CR":"\u041a\u043e\u0441\u0442\u0430-\u0420\u0438\u043a\u0430",
		"CI":"\u041a\u043e\u0442-\u0434\u2019\u0418\u0432\u0443\u0430\u0440",
		"CU":"\u041a\u0443\u0431\u0430",
		"KW":"\u041a\u0443\u0432\u0435\u0439\u0442",
		"CW":"\u041a\u044e\u0440\u0430\u0441\u0430\u043e",
		"LA":"\u041b\u0430\u043e\u0441",
		"LV":"\u041b\u0430\u0442\u0432\u0438\u044f",
		"LS":"\u041b\u0435\u0441\u043e\u0442\u043e",
		"LR":"\u041b\u0438\u0431\u0435\u0440\u0438\u044f",
		"LB":"\u041b\u0438\u0432\u0430\u043d",
		"LY":"\u041b\u0438\u0432\u0438\u044f",
		"LT":"\u041b\u0438\u0442\u0432\u0430",
		"LI":"\u041b\u0438\u0445\u0442\u0435\u043d\u0448\u0442\u0435\u0439\u043d",
		"LU":"\u041b\u044e\u043a\u0441\u0435\u043c\u0431\u0443\u0440\u0433",
		"MU":"\u041c\u0430\u0432\u0440\u0438\u043a\u0438\u0439",
		"MR":"\u041c\u0430\u0432\u0440\u0438\u0442\u0430\u043d\u0438\u044f",
		"MG":"\u041c\u0430\u0434\u0430\u0433\u0430\u0441\u043a\u0430\u0440",
		"YT":"\u041c\u0430\u0439\u043e\u0442\u0442\u0430",
		"MO":"\u041c\u0430\u043a\u0430\u043e (\u0421\u0410\u0420)",
		"MW":"\u041c\u0430\u043b\u0430\u0432\u0438",
		"MY":"\u041c\u0430\u043b\u0430\u0439\u0437\u0438\u044f",
		"ML":"\u041c\u0430\u043b\u0438",
		"MV":"\u041c\u0430\u043b\u044c\u0434\u0438\u0432\u044b",
		"MT":"\u041c\u0430\u043b\u044c\u0442\u0430",
		"MA":"\u041c\u0430\u0440\u043e\u043a\u043a\u043e",
		"MQ":"\u041c\u0430\u0440\u0442\u0438\u043d\u0438\u043a\u0430",
		"MH":"\u041c\u0430\u0440\u0448\u0430\u043b\u043b\u043e\u0432\u044b \u041e\u0441\u0442\u0440\u043e\u0432\u0430",
		"MX":"\u041c\u0435\u043a\u0441\u0438\u043a\u0430",
		"MZ":"\u041c\u043e\u0437\u0430\u043c\u0431\u0438\u043a",
		"MD":"\u041c\u043e\u043b\u0434\u043e\u0432\u0430",
		"MC":"\u041c\u043e\u043d\u0430\u043a\u043e",
		"MN":"\u041c\u043e\u043d\u0433\u043e\u043b\u0438\u044f",
		"MS":"\u041c\u043e\u043d\u0442\u0441\u0435\u0440\u0440\u0430\u0442",
		"MM":"\u041c\u044c\u044f\u043d\u043c\u0430 (\u0411\u0438\u0440\u043c\u0430)",
		"NA":"\u041d\u0430\u043c\u0438\u0431\u0438\u044f",
		"NR":"\u041d\u0430\u0443\u0440\u0443",
		"NP":"\u041d\u0435\u043f\u0430\u043b",
		"NE":"\u041d\u0438\u0433\u0435\u0440",
		"NG":"\u041d\u0438\u0433\u0435\u0440\u0438\u044f",
		"NL":"\u041d\u0438\u0434\u0435\u0440\u043b\u0430\u043d\u0434\u044b",
		"NI":"\u041d\u0438\u043a\u0430\u0440\u0430\u0433\u0443\u0430",
		"NU":"\u041d\u0438\u0443\u044d",
		"NZ":"\u041d\u043e\u0432\u0430\u044f \u0417\u0435\u043b\u0430\u043d\u0434\u0438\u044f",
		"NC":"\u041d\u043e\u0432\u0430\u044f \u041a\u0430\u043b\u0435\u0434\u043e\u043d\u0438\u044f",
		"NO":"\u041d\u043e\u0440\u0432\u0435\u0433\u0438\u044f",
		"BV":"\u043e-\u0432 \u0411\u0443\u0432\u0435",
		"IM":"\u043e-\u0432 \u041c\u044d\u043d",
		"NF":"\u043e-\u0432 \u041d\u043e\u0440\u0444\u043e\u043b\u043a",
		"CX":"\u043e-\u0432 \u0420\u043e\u0436\u0434\u0435\u0441\u0442\u0432\u0430",
		"SH":"\u043e-\u0432 \u0421\u0432. \u0415\u043b\u0435\u043d\u044b",
		"PN":"\u043e-\u0432\u0430 \u041f\u0438\u0442\u043a\u044d\u0440\u043d",
		"TC":"\u043e-\u0432\u0430 \u0422\u0451\u0440\u043a\u0441 \u0438 \u041a\u0430\u0439\u043a\u043e\u0441",
		"HM":"\u043e-\u0432\u0430 \u0425\u0435\u0440\u0434 \u0438 \u041c\u0430\u043a\u0434\u043e\u043d\u0430\u043b\u044c\u0434",
		"AE":"\u041e\u0410\u042d",
		"OM":"\u041e\u043c\u0430\u043d",
		"KY":"\u041e\u0441\u0442\u0440\u043e\u0432\u0430 \u041a\u0430\u0439\u043c\u0430\u043d",
		"CK":"\u041e\u0441\u0442\u0440\u043e\u0432\u0430 \u041a\u0443\u043a\u0430",
		"PK":"\u041f\u0430\u043a\u0438\u0441\u0442\u0430\u043d",
		"PW":"\u041f\u0430\u043b\u0430\u0443",
		"PS":"\u041f\u0430\u043b\u0435\u0441\u0442\u0438\u043d\u0441\u043a\u0438\u0435 \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u0438",
		"PA":"\u041f\u0430\u043d\u0430\u043c\u0430",
		"PG":"\u041f\u0430\u043f\u0443\u0430 \u2014 \u041d\u043e\u0432\u0430\u044f \u0413\u0432\u0438\u043d\u0435\u044f",
		"PY":"\u041f\u0430\u0440\u0430\u0433\u0432\u0430\u0439",
		"PE":"\u041f\u0435\u0440\u0443",
		"PL":"\u041f\u043e\u043b\u044c\u0448\u0430",
		"PT":"\u041f\u043e\u0440\u0442\u0443\u0433\u0430\u043b\u0438\u044f",
		"PR":"\u041f\u0443\u044d\u0440\u0442\u043e-\u0420\u0438\u043a\u043e",
		"KR":"\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u0440\u0435\u044f",
		"RE":"\u0420\u0435\u044e\u043d\u044c\u043e\u043d",
		"RU":"\u0420\u043e\u0441\u0441\u0438\u044f",
		"RW":"\u0420\u0443\u0430\u043d\u0434\u0430",
		"RO":"\u0420\u0443\u043c\u044b\u043d\u0438\u044f",
		"SV":"\u0421\u0430\u043b\u044c\u0432\u0430\u0434\u043e\u0440",
		"WS":"\u0421\u0430\u043c\u043e\u0430",
		"SM":"\u0421\u0430\u043d-\u041c\u0430\u0440\u0438\u043d\u043e",
		"ST":"\u0421\u0430\u043d-\u0422\u043e\u043c\u0435 \u0438 \u041f\u0440\u0438\u043d\u0441\u0438\u043f\u0438",
		"SA":"\u0421\u0430\u0443\u0434\u043e\u0432\u0441\u043a\u0430\u044f \u0410\u0440\u0430\u0432\u0438\u044f",
		"MK":"\u0421\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u044f",
		"MP":"\u0421\u0435\u0432\u0435\u0440\u043d\u044b\u0435 \u041c\u0430\u0440\u0438\u0430\u043d\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430",
		"SC":"\u0421\u0435\u0439\u0448\u0435\u043b\u044c\u0441\u043a\u0438\u0435 \u041e\u0441\u0442\u0440\u043e\u0432\u0430",
		"BL":"\u0421\u0435\u043d-\u0411\u0430\u0440\u0442\u0435\u043b\u0435\u043c\u0438",
		"MF":"\u0421\u0435\u043d-\u041c\u0430\u0440\u0442\u0435\u043d",
		"PM":"\u0421\u0435\u043d-\u041f\u044c\u0435\u0440 \u0438 \u041c\u0438\u043a\u0435\u043b\u043e\u043d",
		"SN":"\u0421\u0435\u043d\u0435\u0433\u0430\u043b",
		"VC":"\u0421\u0435\u043d\u0442-\u0412\u0438\u043d\u0441\u0435\u043d\u0442 \u0438 \u0413\u0440\u0435\u043d\u0430\u0434\u0438\u043d\u044b",
		"KN":"\u0421\u0435\u043d\u0442-\u041a\u0438\u0442\u0441 \u0438 \u041d\u0435\u0432\u0438\u0441",
		"LC":"\u0421\u0435\u043d\u0442-\u041b\u044e\u0441\u0438\u044f",
		"RS":"\u0421\u0435\u0440\u0431\u0438\u044f",
		"SG":"\u0421\u0438\u043d\u0433\u0430\u043f\u0443\u0440",
		"SX":"\u0421\u0438\u043d\u0442-\u041c\u0430\u0440\u0442\u0435\u043d",
		"SY":"\u0421\u0438\u0440\u0438\u044f",
		"SK":"\u0421\u043b\u043e\u0432\u0430\u043a\u0438\u044f",
		"SI":"\u0421\u043b\u043e\u0432\u0435\u043d\u0438\u044f",
		"US":"\u0421\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u043d\u044b\u0435 \u0428\u0442\u0430\u0442\u044b",
		"SB":"\u0421\u043e\u043b\u043e\u043c\u043e\u043d\u043e\u0432\u044b \u041e\u0441\u0442\u0440\u043e\u0432\u0430",
		"SO":"\u0421\u043e\u043c\u0430\u043b\u0438",
		"SD":"\u0421\u0443\u0434\u0430\u043d",
		"SR":"\u0421\u0443\u0440\u0438\u043d\u0430\u043c",
		"SL":"\u0421\u044c\u0435\u0440\u0440\u0430-\u041b\u0435\u043e\u043d\u0435",
		"TJ":"\u0422\u0430\u0434\u0436\u0438\u043a\u0438\u0441\u0442\u0430\u043d",
		"TH":"\u0422\u0430\u0438\u043b\u0430\u043d\u0434",
		"TW":"\u0422\u0430\u0439\u0432\u0430\u043d\u044c",
		"TZ":"\u0422\u0430\u043d\u0437\u0430\u043d\u0438\u044f",
		"TG":"\u0422\u043e\u0433\u043e",
		"TK":"\u0422\u043e\u043a\u0435\u043b\u0430\u0443",
		"TO":"\u0422\u043e\u043d\u0433\u0430",
		"TT":"\u0422\u0440\u0438\u043d\u0438\u0434\u0430\u0434 \u0438 \u0422\u043e\u0431\u0430\u0433\u043e",
		"TV":"\u0422\u0443\u0432\u0430\u043b\u0443",
		"TN":"\u0422\u0443\u043d\u0438\u0441",
		"TM":"\u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d",
		"TR":"\u0422\u0443\u0440\u0446\u0438\u044f",
		"UG":"\u0423\u0433\u0430\u043d\u0434\u0430",
		"UZ":"\u0423\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u0430\u043d",
		"UA":"\u0423\u043a\u0440\u0430\u0438\u043d\u0430",
		"WF":"\u0423\u043e\u043b\u043b\u0438\u0441 \u0438 \u0424\u0443\u0442\u0443\u043d\u0430",
		"UY":"\u0423\u0440\u0443\u0433\u0432\u0430\u0439",
		"FO":"\u0424\u0430\u0440\u0435\u0440\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430",
		"FM":"\u0424\u0435\u0434\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u0435 \u0428\u0442\u0430\u0442\u044b \u041c\u0438\u043a\u0440\u043e\u043d\u0435\u0437\u0438\u0438",
		"FJ":"\u0424\u0438\u0434\u0436\u0438",
		"PH":"\u0424\u0438\u043b\u0438\u043f\u043f\u0438\u043d\u044b",
		"FI":"\u0424\u0438\u043d\u043b\u044f\u043d\u0434\u0438\u044f",
		"FK":"\u0424\u043e\u043b\u043a\u043b\u0435\u043d\u0434\u0441\u043a\u0438\u0435 \u043e-\u0432\u0430",
		"FR":"\u0424\u0440\u0430\u043d\u0446\u0438\u044f",
		"GF":"\u0424\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0430\u044f \u0413\u0432\u0438\u0430\u043d\u0430",
		"PF":"\u0424\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0430\u044f \u041f\u043e\u043b\u0438\u043d\u0435\u0437\u0438\u044f",
		"TF":"\u0424\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0438\u0435 \u042e\u0436\u043d\u044b\u0435 \u0442\u0435\u0440\u0440\u0438\u0442\u043e\u0440\u0438\u0438",
		"HR":"\u0425\u043e\u0440\u0432\u0430\u0442\u0438\u044f",
		"CF":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u043e-\u0410\u0444\u0440\u0438\u043a\u0430\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
		"TD":"\u0427\u0430\u0434",
		"ME":"\u0427\u0435\u0440\u043d\u043e\u0433\u043e\u0440\u0438\u044f",
		"CZ":"\u0427\u0435\u0445\u0438\u044f",
		"CL":"\u0427\u0438\u043b\u0438",
		"CH":"\u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0438\u044f",
		"SE":"\u0428\u0432\u0435\u0446\u0438\u044f",
		"SJ":"\u0428\u043f\u0438\u0446\u0431\u0435\u0440\u0433\u0435\u043d \u0438 \u042f\u043d-\u041c\u0430\u0439\u0435\u043d",
		"LK":"\u0428\u0440\u0438-\u041b\u0430\u043d\u043a\u0430",
		"EC":"\u042d\u043a\u0432\u0430\u0434\u043e\u0440",
		"GQ":"\u042d\u043a\u0432\u0430\u0442\u043e\u0440\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u0413\u0432\u0438\u043d\u0435\u044f",
		"ER":"\u042d\u0440\u0438\u0442\u0440\u0435\u044f",
		"SZ":"\u042d\u0441\u0432\u0430\u0442\u0438\u043d\u0438",
		"EE":"\u042d\u0441\u0442\u043e\u043d\u0438\u044f",
		"ET":"\u042d\u0444\u0438\u043e\u043f\u0438\u044f",
		"GS":"\u042e\u0436\u043d\u0430\u044f \u0413\u0435\u043e\u0440\u0433\u0438\u044f \u0438 \u042e\u0436\u043d\u044b\u0435 \u0421\u0430\u043d\u0434\u0432\u0438\u0447\u0435\u0432\u044b \u043e-\u0432\u0430",
		"ZA":"\u042e\u0436\u043d\u043e-\u0410\u0444\u0440\u0438\u043a\u0430\u043d\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430",
		"SS":"\u042e\u0436\u043d\u044b\u0439 \u0421\u0443\u0434\u0430\u043d",
		"JM":"\u042f\u043c\u0430\u0439\u043a\u0430",
		"JP":"\u042f\u043f\u043e\u043d\u0438\u044f"
	});
}