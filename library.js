'use strict';

const controllers = require('./lib/controllers');

const meta = require.main.require('./src/meta');

const plugin = module.exports;

plugin.init = function (params, callback) {
	const { router, middleware } = params;

	const helpers = require.main.require('./src/routes/helpers');

	helpers.setupPageRoute(router, '/user-levels', middleware, [], controllers.renderUserLevelsPage);

	helpers.setupAdminPageRoute(router, '/admin/plugins/user-level', middleware, [], controllers.renderAdminPage);

	callback();
};

async function getLevelList() {
	const settings = await meta.settings.get('user-level');
	let levelList = settings['level-list'] || [];
	levelList = levelList.filter(Boolean);
	levelList.forEach((level) => {
		level['min-reputation'] = parseInt(level['min-reputation'], 10);
	});

	levelList.sort((a, b) => b['min-reputation'] - a['min-reputation']);
	levelList.forEach((level, i) => {
		level['level-index'] = levelList.length - i;
		level['next-level'] = levelList[i - 1];
	});
	return levelList;
}

plugin.filterPostsGetUserInfoForPosts = async (hookData) => {
	const levelList = await getLevelList();
	hookData.users.forEach((user) => {
		if (user) {
			user.level = {
				...levelList.find(l => l['min-reputation'] <= user.reputation),
				reputation: user.reputation,
			};
		}
	});
	return hookData;
};

plugin.filterAccountProfileBuild = async (hookData) => {
	const levelList = await getLevelList();
	hookData.templateData.level = levelList.find(l => l['min-reputation'] <= hookData.templateData.reputation);
	if (hookData.templateData.level) {
		hookData.templateData.level.reputation = hookData.templateData.reputation;
	}
	return hookData;
};

plugin.addAdminNavigation = function (header, callback) {
	header.plugins.push({
		route: '/plugins/user-level',
		icon: 'fa-tint',
		name: 'User level',
	});

	callback(null, header);
};
