'use strict';

$(window).on('action:ajaxify.end', async function () {
	const translator = await app.require('translator');

	if (ajaxify.data.template.name === 'account/profile') {
		const currentLevel = ajaxify.data.level;
		if (!currentLevel) {
			return;
		}

		var divStatLable = $('<div/>', {
			class: 'level-description',
		});
		if (currentLevel['next-level']) {
			var diff = currentLevel['next-level']['min-reputation'] - currentLevel.reputation;
			const text = await translator.translate(`[[userlevel:user-account-popover, ${diff}, ${currentLevel['next-level']['level-name']}]]`);
			divStatLable.text(text);
		} else {
			const text = await translator.translate('[[userlevel:highest-level]]');
			divStatLable.text(text);
		}
		var divReadNumber = $('<div/>', {
			class: 'level-index',
		});
		var content = $('<div/>', {
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
