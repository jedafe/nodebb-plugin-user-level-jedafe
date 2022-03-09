'use strict';

$(window).on('action:ajaxify.end', async function () {
	if (ajaxify.data.template.name === 'account/profile') {
		const translator = await app.require('translator');
		const currentLevel = ajaxify.data.level;
		if (!currentLevel || !currentLevel['level-name']) {
			return;
		}

		const divStatLable = $('<div/>', {
			class: 'level-description',
		});
		if (currentLevel['next-level']) {
			const diff = currentLevel['next-level']['min-reputation'] - currentLevel.reputation;
			const text = await translator.translate(`[[userlevel:user-account-popover, ${diff}, ${currentLevel['next-level']['level-name']}]]`);
			divStatLable.text(text);
		} else {
			const text = await translator.translate('[[userlevel:highest-level]]');
			divStatLable.text(text);
		}
		const divReadNumber = $('<div/>', {
			class: 'level-index',
		});
		const content = $('<div/>', {
			'data-toggle': 'popover',
			'data-content': divStatLable.get(0).outerHTML,
			'data-html': true,
		});
		const text = await translator.translate(`[[userlevel:level, ${currentLevel['level-index']}, ${currentLevel['level-name']}]]`);
		content.text(text);
		divReadNumber.append(content);
		divReadNumber.insertAfter('.profile .fullname');
		$('[data-toggle="popover"]').popover();
	}
});
