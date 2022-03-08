<form role="form" class="user-level-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">[[userlevel:admin-add-level]]</div>
		<div class="col-sm-10 col-xs-12">
			<div class="form-group" data-type="sorted-list" data-sorted-list="level-list" data-item-template="admin/plugins/user-level/partials/sorted-list/item-user-level" data-form-template="admin/plugins/user-level/partials/sorted-list/form-user-level">
				<input hidden="text" name="level-list">
				<ul data-type="list" class="list-group"></ul>
				<button type="button" data-type="add" class="btn btn-info">[[userlevel:admin-add-item]]</button>
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
