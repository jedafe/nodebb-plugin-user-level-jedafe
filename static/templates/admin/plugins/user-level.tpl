<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 px-0 mb-4" tabindex="0">
			<form role="form" class="user-level-settings">
				<div class="row">
					<div class="col-sm-2 col-12 settings-header">[[userlevel:admin-add-level]]</div>
					<div class="col-sm-10 col-12">
						<div class="mb-3" data-type="sorted-list" data-sorted-list="level-list" data-item-template="admin/plugins/user-level/partials/sorted-list/item-user-level" data-form-template="admin/plugins/user-level/partials/sorted-list/form-user-level">
							<input hidden="text" name="level-list">
							<ul data-type="list" class="list-group mb-3"></ul>
							<button type="button" data-type="add" class="btn btn-info">[[userlevel:admin-add-item]]</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
