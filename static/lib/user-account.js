'use strict';

$(window).on('action:ajaxify.end', async function () {
	if (ajaxify.data.template.name === 'account/profile') {
		const translator = await app.require('translator');
		const currentLevel = ajaxify.data.level;
		if (!currentLevel || !currentLevel['level-name']) {
			return;
		}

		const divStatLabel = $('<div/>', {
			class: 'level-description',
		});
		if (currentLevel['next-level']) {
			const diff = currentLevel['next-level']['min-reputation'] - currentLevel.reputation;
			const text = await translator.translate(`[[userlevel:user-account-popover, ${diff}, ${currentLevel['next-level']['level-name']}]]`);
			divStatLabel.html(utils.decodeHTMLEntities(text));
		} else {
			const text = await translator.translate('[[userlevel:highest-level]]');
			divStatLabel.html(text);
		}
		const divReadNumber = $('<div/>', {
			class: 'level-index',
		});
		const content = $('<div/>', {
			'data-bs-toggle': 'popover',
			'data-bs-container': '#content',
			'data-bs-trigger': 'focus',
			tabindex: 0,
			'data-bs-content': divStatLabel.get(0).outerHTML,
			'data-bs-html': true,
		});
		const text = await translator.translate(`[[userlevel:level, ${currentLevel['level-index']}, ${currentLevel['level-name']}]]`);
		content.html(utils.decodeHTMLEntities(text));
		divReadNumber.append(content);
		const badgeArea = $('[component="user/badges"]');
		if (badgeArea.length) {
			// divReadNumber.append(badgeArea);
			badgeArea.append(divReadNumber);
		} else if ($('.profile .fullname').length) {
			// fallbacks for themes that don't have above component
			divReadNumber.insertAfter('.profile .fullname');
		} else if ($('.account .fullname').length) {
			// fallbacks for themes that don't have above component
			divReadNumber.insertAfter('.account .fullname');
		}

		$('[data-bs-toggle="popover"]').popover();
	}
});
