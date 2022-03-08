'use strict';

define('admin/plugins/user-level', [
	'settings', 'alerts',
], function (settings, alerts) {
	var ACP = {};

	ACP.init = function () {
		settings.load('user-level', $('.user-level-settings'));
		$('#save').on('click', saveSettings);
	};

	function saveSettings() {
		settings.save('user-level', $('.user-level-settings'), function () {
			alerts.success('Settings Saved');
		});
	}

	return ACP;
});
