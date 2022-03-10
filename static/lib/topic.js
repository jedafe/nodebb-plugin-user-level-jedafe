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
					class: 'small',
				});
				if (currentLevel['next-level']) {
					const text = await translator.translate(`[[userlevel:topic-REPUTATION-progress, ${currentLevel.reputation}, ${currentLevel['next-level']['min-reputation']}]]`);
					popoverContent.text(text);
					const descText = await translator.translate(`[[userlevel:topic-next-level, ${currentLevel['next-level']['level-name']}]]`);
					description.text(descText);
				} else {
					const text = await translator.translate(`[[userlevel:topic-REPUTATION, ${currentLevel.reputation}]]`);
					popoverContent.text(text);
					description.text(await translator.translate('[[userlevel:highest-level]]'));
				}
				popoverContent.append(description);
				const title = await translator.translate(`[[userlevel:level, ${currentLevel['level-index']}, ${currentLevel['level-name']}]]`);
				const div = $('<a/>', {
					class: `user-level-topic user-level-rank-${currentLevel['level-index']}`,
					title: title,
					'data-toggle': 'popover',
					'data-placement': 'top',
					'data-content': popoverContent.get(0).outerHTML,
					'data-html': true,
				});
				const levelName = await translator.translate(currentLevel['level-name']);
				div.html(levelName).insertBefore(postEl.find('.post-header a[data-username]'));
			}
		}));
		$('[data-toggle="popover"]').popover();
	}
});

