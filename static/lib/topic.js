'use strict';

$(window).on('action:topic.loaded action:posts.loaded', async function (ev, data) {
	if (ajaxify.data.template.name === 'topic') {
		const translator = await app.require('translator');
		await Promise.all(data.posts.map(async (post) => {
			if (post && post.user && post.user.level && post.user.level['level-name']) {
				const currentLevel = post.user.level;
				const postEl = $(`[component="post"][data-pid=${post.pid}]`);
				const popoverContent = $('<div/>', {});
				const description = $('<div/>', {
					class: 'text-sm fw-normal',
				});
				if (currentLevel['next-level']) {
					const text = await translator.translate(`[[userlevel:topic-REPUTATION-progress, ${currentLevel.reputation}, ${currentLevel['next-level']['min-reputation']}]]`);
					popoverContent.text(text);
					const descText = await translator.translate(`[[userlevel:topic-next-level, ${currentLevel['next-level']['level-name']}]]`);
					description.html(utils.decodeHTMLEntities(descText));
				} else {
					const text = await translator.translate(`[[userlevel:topic-REPUTATION, ${currentLevel.reputation}]]`);
					popoverContent.text(text);
					description.html(await translator.translate('[[userlevel:highest-level]]'));
				}
				popoverContent.append(description);

				const title = await translator.translate(`[[userlevel:level, ${currentLevel['level-index']}, ${currentLevel['level-name']}]]`);
				const div = $('<a/>', {
					class: `user-level-topic fw-bold user-level-rank-${currentLevel['level-index']} text-decoration-none`,
					title: utils.decodeHTMLEntities(title),
					tabindex: 0,
					'data-bs-container': '#content',
					'data-bs-toggle': 'popover',
					'data-bs-placement': 'top',
					'data-bs-trigger': 'focus',
					'data-bs-content': popoverContent.get(0).outerHTML,
					'data-bs-html': true,
				});
				const levelName = await translator.translate(currentLevel['level-name']);
				postEl.each((i, el) => {
					const $el = $(el);
					if (!$el.find('.user-level-topic').length) {
						div.html(levelName).insertBefore($el.find('.post-header a[data-username]'));
					}
				});
			}
		}));
		$('[data-bs-toggle="popover"]').popover();
	}
});

