'use strict';

const validator = require('validator');

const db = require.main.require('./src/database');

const Controllers = module.exports;

Controllers.renderUserLevelsPage = async function (req, res) {
	const ids = await db.getSortedSetRange(`settings:user-level:sorted-list:level-list`, 0, -1);
	const levels = await db.getObjects(ids.map(id => `settings:user-level:sorted-list:level-list:${id}`));

	if (Array.isArray(levels)) {
		await Promise.all(levels.map(async (level) => {
			if (level && level.name) {
				level.name = validator.escape(String(level.name));
				level['min-reputation'] = parseInt(level['min-reputation'], 10);
			}
		}));
	}
	levels.sort((a, b) => b['min-reputation'] - a['min-reputation']);
	res.render('user-levels', { levels });
};

Controllers.renderAdminPage = function (req, res/* , next */) {
	res.render('admin/plugins/user-level', {});
};

