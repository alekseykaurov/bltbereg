<?php
/*********************************
Module : JoCo (Jot Comments module) : Russian-UTF8 language file
By : iJack (Kuzminov Eugene)
Version: 0.9.2
*********************************/

$JoCo_lang = array();

// labels
$JoCo_lang['name'] = "Имя";
$JoCo_lang['email'] = "Email";
$JoCo_lang['website'] = "Сайт";
$JoCo_lang['user'] = "Пользователь";
$JoCo_lang['subject'] = "Тема";



// main page
$JoCo_lang['sectionHeader'] = "Система управление комментариями Jot";
$JoCo_lang['des_para'] = 'JoCo это модуль для MODxCMS позволяющий модерировать все комментарии на сайте <b>' .$modx->config['site_name']. '</b>.';

$JoCo_lang['search'] = "Поиск";
$JoCo_lang['search_para'] = 'Поиск и выборка результатов';

$JoCo_lang['permission'] = "Доступ";
$JoCo_lang['permission_para'] = 'Установить права доступа для просмотра комментариев';

$JoCo_lang['summary'] = "Обзор";
$JoCo_lang['summary_para'] = 'Общий обзор документов с вызовом Jot';

$JoCo_lang['jotcall'] = "Вызовы Jot";
$JoCo_lang['jotcall_para'] = 'Manage all Jot calls of site.';

$JoCo_lang['help'] = "Помощь";
$JoCo_lang['help_para'] = 'О JoCo и помощь';

$JoCo_lang['my_comments'] = "Мои комментарии";
$JoCo_lang['view_my_comments_para'] = '<a href="index.php?a=112&id='.$_GET['id'].'&WHERE=createdby='.$_SESSION['mgrInternalKey'].'">'.$JoCo_lang['my_comments'].'</a>';

$JoCo_lang['loading'] = "Загрузка...";
$JoCo_lang['display'] = "Показать";
$JoCo_lang['go_back_home'] = "Вернуться назад Home >>";
$JoCo_lang['ie6_warning'] = "Рекомендуются другие популярные броузеры, например, Firefox!";

$JoCo_lang['check_all'] = "Выбрать все";

$JoCo_lang['compressd_comments'] = "JoCo комментарии";
$JoCo_lang['expand'] = "Развернуть";
$JoCo_lang['collapse'] = "Свернуть";
$JoCo_lang['description'] = "Описание";



// pagination
$JoCo_lang['all_results'] = "Всего:";
$JoCo_lang['next_page'] = "Следующая стр.";
$JoCo_lang['previous_page'] = "Предидущая стр.";



// each comment row
$JoCo_lang['sent_on'] = "Отправлено";
$JoCo_lang['edit'] = "Ред.";
$JoCo_lang['delete'] = "Удалить";
$JoCo_lang['save'] = "Сохранить";

$JoCo_lang['published_comments'] = "Опубликованные комментарии";
$JoCo_lang['unpublished_comments'] = "НЕопубликованные комментарии";
$JoCo_lang['all_comments'] = "Все комментарии";
$JoCo_lang['last_comments'] = "Последние комментарии";
$JoCo_lang['view_last_comments'] = '<a href="index.php?a=112&id='.$_GET['id'].'&show=3">'.$JoCo_lang['last_comments'].'</a>';
$JoCo_lang['created_doc_comments'] = "Created docs comments";
$JoCo_lang['view_created_doc_comments'] = '<a href="index.php?a=112&id='.$_GET['id'].'&show=6">'.$JoCo_lang['created_doc_comments'].'</a>';
$JoCo_lang['published_doc_comments'] = "Published docs comments";
$JoCo_lang['view_published_doc_comments'] = '<a href="index.php?a=112&id='.$_GET['id'].'&show=7">'.$JoCo_lang['published_doc_comments'].'</a>';
$JoCo_lang['edited_doc_comments'] = "Edited docs comments";
$JoCo_lang['view_edited_doc_comments'] = '<a href="index.php?a=112&id='.$_GET['id'].'&show=8">'.$JoCo_lang['edited_doc_comments'].'</a>';
$JoCo_lang['cancel'] = "Отмена";

$JoCo_lang['publish_log'] = "Комментарий [+comment_id+] был опубликован";
$JoCo_lang['unpublish_log'] = "Комментарий [+comment_id+] был скрыт";
$JoCo_lang['delete_log'] = "Комментарий [+comment_id+] был удалён";
$JoCo_lang['edit_log'] = "Комментарий [+comment_id+] был отредактирован";

$JoCo_lang['publish'] = "Опубликовать";
$JoCo_lang['unpublish'] = "Скрыть";
$JoCo_lang['submit'] = "Действие";

$JoCo_lang['published'] = "Опубликовано!";
$JoCo_lang['unpublished'] = "Скрыто!";
$JoCo_lang['edited'] = "Отредактировано!";
$JoCo_lang['deleted'] = "Удалено!";

$JoCo_lang['are_you_sure_publish'] = "Точно опубликовать?";
$JoCo_lang['are_you_sure_unpublish'] = "Точно скрыть?";
$JoCo_lang['are_you_sure_edit'] = "Точно редактировать?";
$JoCo_lang['are_you_sure_delete'] = "Точно удалить?";

$JoCo_lang['result_from_parents'] = "(Parents result)";
$JoCo_lang['result_from_docgroups'] = "(Docgroups result)";
$JoCo_lang['result_from_docs'] = "(Documents result)";
$JoCo_lang['result_from_webgroups'] = "(Webgroups result)";
$JoCo_lang['result_from_users'] = "(Users result)";
$JoCo_lang['result_from_guestUsers'] = "(Guests result)";



// search
$JoCo_lang['search_in_comments'] = "Search in comments";
$JoCo_lang['search_in_docs'] = "Search in documents";
$JoCo_lang['search_by_parents'] = "Parents";
$JoCo_lang['search_by_parents_des'] = "Comma delimated Parent IDs to search in themselves and their childern.";
$JoCo_lang['search_by_docgroups'] = "Docgroups";
$JoCo_lang['search_by_docgroups_des'] = "Comma delimated Docgroup names to search in their members.";
$JoCo_lang['search_by_docs'] = "Documents";
$JoCo_lang['search_by_docs_des'] = "Comma delimated Document IDs.";
$JoCo_lang['search_by_notdocs'] = "NOT in documents";
$JoCo_lang['search_by_notdocs_des'] = "Comma delimated Document IDs to remove from results.";
$JoCo_lang['search_by_users'] = "Search by users";
$JoCo_lang['search_users'] = "Users";
$JoCo_lang['search_users_des'] = "Comma delimated User IDs (Webusers have negative ID).";
$JoCo_lang['search_by_quests'] = "Guest users";
$JoCo_lang['search_guests'] = "Guests, the users who has not login or are not member of " .$modx->config['site_name']. ".";
$JoCo_lang['search_by_webgroups'] = "Webgroups";
$JoCo_lang['search_by_webgroups_des'] = "Comma delimated Webgroup names to search in their members.";
$JoCo_lang['search_by_notusers'] = "NOT by users";
$JoCo_lang['search_by_notusers_des'] = "Comma delimated User IDs to remove from results.";
$JoCo_lang['search_string'] = "Search string";
$JoCo_lang['search_not_string'] = "Search NOT string";
$JoCo_lang['search_regex'] = "Search by Regex";
$JoCo_lang['search_not_regex'] = "Search by NOT Regex";
$JoCo_lang['in_content'] = "in content";
$JoCo_lang['in_title'] = "in title";
$JoCo_lang['in_tagid'] = "in tagid";
$JoCo_lang['in_flags'] = "in flags";
$JoCo_lang['limit_number'] = "Maximum number of results";
$JoCo_lang['fields_are_empty'] = "Fields are empty!";
$JoCo_lang['getNames_des_para'] = "Striked names have not any comment and italic striked IDs do not exists.";
$JoCo_lang['recentComments'] = "Recent comments";
$JoCo_lang['only_recent_from_my_last_active'] = "Only recent results from your last login";
$JoCo_lang['see_users_you_choosen'] = "See users you have choosen....";
$JoCo_lang['see_docs_you_choosen'] = "See documents you have choosen....";

$JoCo_lang['id_option'] = "ID of comments";
$JoCo_lang['title_option'] = "Subject of comments";
$JoCo_lang['tagid_option'] = "Tagid of Jot calls";
$JoCo_lang['uparent_option'] = "Documents";
$JoCo_lang['secip_option'] = "IPs";
$JoCo_lang['createdby_option'] = "Created by";
$JoCo_lang['createdon_option'] = "Created on";
$JoCo_lang['editedby_option'] = "Edited by";
$JoCo_lang['editedon_option'] = "Edited on";
$JoCo_lang['publishedby_option'] = "Published by";
$JoCo_lang['publishedon_option'] = "Published on";

$JoCo_lang['date_limit'] = "Ограниченяи по дате";
$JoCo_lang['from'] = "От";
$JoCo_lang['to'] = "До";
$JoCo_lang['sample'] = "YYYY-mm-dd";
$JoCo_lang['limit'] = "Предел (Limit)";
$JoCo_lang['sort'] = "Сортировка";
$JoCo_lang['ASC'] = "по Возрастанию";
$JoCo_lang['DESC'] = "по Убыванию";
$JoCo_lang['sortBy'] = "Сортировать по";



// permissions
$JoCo_lang['actions'] = "Действия";
$JoCo_lang['permissions'] = "Права доступа";
$JoCo_lang['all_users'] = "Все пользователи";
$JoCo_lang['exist_users'] = "Существующие пользователи";

$JoCo_lang['publishPermi'] = "Опубликовать комментарии";
$JoCo_lang['unpublishPermi'] = "Скрыть комментарии";
$JoCo_lang['editPermi'] = "Редактировать комментарии";
$JoCo_lang['removePermi'] = "Удалить комментарии";
$JoCo_lang['loggingPermi'] = "Занести действие в лог";
$JoCo_lang['viewAllPermi'] = "Показать все комментарии";
$JoCo_lang['viewPublishedPermi'] = "Показать опубликованные комментарии";
$JoCo_lang['viewUnpublishedPermi'] = "Показать неопубликованные комментарии";
$JoCo_lang['ipPermi'] = "Показать IP";
$JoCo_lang['webUsersPermi'] = "Управление правами доступа веб-пользователя";
$JoCo_lang['createdDocsPermi'] = "Комментарии к документам, которые создал пользователь";
$JoCo_lang['publishedDocsPermi'] = "Комментарии к документам, которые опубликовал пользователь";
$JoCo_lang['editedDocsPermi'] = "Комментарии к документам, которые отредактировал пользователь";
$JoCo_lang['searchPermi'] = "Смотреть поисковые результаты";
$JoCo_lang['permissionPermi'] = "Смотреть права доступа";
$JoCo_lang['summaryPermi'] = "Смотреть подборку";
$JoCo_lang['jotCallPermi'] = "Управление вызовами Jot";
$JoCo_lang['changeThemePermi'] = "Изменить элемент";
$JoCo_lang['defaultThemePermi'] = "Стандартная тема";
$JoCo_lang['defaultViewPermi'] = "Стандартный вид";
$JoCo_lang['summaryResPerPagePermi'] = "Количество результатов в подборке";
$JoCo_lang['resPerPagePermi'] = "Количество результатов в главном окне";
$JoCo_lang['jotCallResPerPagePermi'] = "Количество результатов при поиске вызовов Jot";
$JoCo_lang['impossible_change_admins_permissions'] = "Невозможно изменить права доступа администратора!";
$JoCo_lang['user_exists'] = "Этот пользователь уже существует.<br />Пожалуйста, ждите...";
$JoCo_lang['impossible_romove_yourself'] = "Невозможно удалить ваш JoCo аккаунт!<br />Пожалуйста, ждите...";
$JoCo_lang['move_in_confirm'] = "Вы уверены, что хотите добавить нового пользователя?";
$JoCo_lang['move_out_confirm'] = "Вы уверены, что хотите удалить этого пользователя?";
$JoCo_lang['user_creation_failed'] = "Неудачая попытка создать нового пользователя!<br />Пожалуйста, ждите...";
$JoCo_lang['view_recent'] = "Просмотреть недавние комментарии";
$JoCo_lang['view_user_comments'] = "Просмотреть комментарии пользователя";
$JoCo_lang['setPermissions_success'] = "Права доступа изменены успешно!";
$JoCo_lang['save_changes'] = "Сохранить изменения";
$JoCo_lang['allow'] = "Разрешить";
$JoCo_lang['disallow'] = "Запретить";
$JoCo_lang['add_user'] = "Добавить пользователя!";
$JoCo_lang['remove_user'] = "Удалить пользователя!";
$JoCo_lang['view_nothing'] = "Не просматривать ничего";
$JoCo_lang['no_permission'] = "Нет разрешения на доступ";
$JoCo_lang['permission_part_para'] = "Select user from all-user column and click enable button to add him/her to JoCo users. select existed user to remove him/her and see permissions.<br />Do NOT select more then one user at same time!<br />Also JoCo snippet logs web-moderators actions and you can see it after installing JoCo snippet: <a href=\"".$modx->config['base_url']."assets/snippets/JoCo/logs/logs.html\" target=\"blank\">Web-moderators logs</a>";
$JoCo_lang['mgr_moderators'] = "Менеджер";
$JoCo_lang['web_moderators'] = "Веб пользователь";
$JoCo_lang['choose_a_user'] = "Пожалуйста, выберите пользователя!";



// summary
$JoCo_lang['subscriptions'] = "Слежение за комментариями";
$JoCo_lang['guest'] = "Гость";
$JoCo_lang['title'] = "Тема";
$JoCo_lang['id'] = "ID";
$JoCo_lang['comments'] = "Комментарии";
$JoCo_lang['last_comment_on'] = "Последний комментарий";
$JoCo_lang['last_comment_by'] = "Последний комментатор";
$JoCo_lang['get_subscriptions'] = "Искать подписки на слежение!";
$JoCo_lang['get_permissions'] = "Искать права доступа!";
$JoCo_lang['see_this_comments'] = "Просмотреть комментарии.";
$JoCo_lang['there_is_no_comment_here'] = "Здесь нет комментариев.";
$JoCo_lang['there_is_no_subscription_here'] = "Здесь нет подпсок на слежение за комментариями.";

$JoCo_lang['comments_img'] = '<img src="'.$modx->config['base_url'].'assets/modules/JoCo/images/home.png" width="20" alt="'.$JoCo_lang['there_is_no_comment_here'].'" title="'.$JoCo_lang['there_is_no_comment_here'].'" />';
$JoCo_lang['subscriptions_img'] = '<img src="'.$modx->config['base_url'].'assets/modules/JoCo/images/search_magnifier.png" width="16" alt="'.$JoCo_lang['get_subscriptions'].'" />';

$JoCo_lang['summary_part_para'] = "There is some summary information about your comments in <b>".$modx->config['site_name']."</b> documnets. You can go to document on click on documnet title. you can see and manage comments of each documnet on click on ".$JoCo_lang['comments_img']." too.<br />Clicking on ".$JoCo_lang['subscriptions_img'].", give you subscriptions of each document.";



// jotcall
$JoCo_lang['jotcall_nothing_found'] = "Ничего не найдено!<br />The Jot calls in this document may be generated by a <b>Snippet</b> or in a <b>Chunk</b>. Would you like to see <a href='index.php?a=112&id=" .$_GET['id']. "&jotCall=1&chunks=1'>Jot calls in Chunks</a>?";
$JoCo_lang['jotcall_get_calls'] = "Найти вызовы";
$JoCo_lang['jotcall_show'] = "Показать";
$JoCo_lang['jotcall_hide'] = "Спрятать";
$JoCo_lang['jotcall_part_para'] = 'Вы можете просмотреть вызовы Jot на вашем сайте и отредактировать их.<br />
Этот раздел отобразит вам вызовы Jot в
	<ul>
		<li><a href="index.php?a=112&id=' .$_GET['id']. '&jotCall=1"><b>Содержимом Документов</b> и <b>Переменных Шаблонов</b></a></li>
		<li><a href="index.php?a=112&id=' .$_GET['id']. '&jotCall=1&chunks=1"><b>Чанках</b></a></li>
	</ul>';
$JoCo_lang['jotcall_view_document_role'] = '<center><h2>Ваши менеджерские права не позволяют просмотреть детали документа.</h2></center>';



// theme
$JoCo_lang['select_theme'] = "Формат";
$JoCo_lang['normalTheme'] = "Стандартный";
$JoCo_lang['compressedTheme'] = "Минимизированный";



// errors
$JoCo_lang['permission_denied'] = "You have not permission to set or change permissions!";
$JoCo_lang['viewAll_denied'] = "You have not permission to see all comments!";
$JoCo_lang['viewPublished_denied'] = "You have not permission to see published comments!";
$JoCo_lang['viewUnpublished_denied'] = "You have not permission to see unpublished comments!";
$JoCo_lang['search_denied'] = "You have not permission to search comments!";
$JoCo_lang['summary_denied'] = "You have not permission to search comments!";
$JoCo_lang['nothing_to_dispaly'] = "Для отображения ничего не найдено!";



// help
$JoCo_lang['help_joco'] = "Помощь по JoCo";

?>