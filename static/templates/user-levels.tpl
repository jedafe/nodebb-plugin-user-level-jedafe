<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
<div class="row">
    <div data-widget-area="left" class="col-lg-3 col-sm-12 {{{ if !widgets.left.length }}}hidden{{{ end }}}">
        {{{each widgets.left}}}
        {{widgets.left.html}}
        {{{end}}}
    </div>

    {{{ if (widgets.left.length && widgets.right.length) }}}
    <div class="col-lg-6 col-sm-12">
    {{{ end }}}
    {{{ if (!widgets.left.length && !widgets.right.length) }}}
    <div class="col-lg-12 col-sm-12">
    {{{ end }}}
    {{{ if ((widgets.left.length && !widgets.right.length) || (!widgets.left.length && widgets.right.length)) }}}
    <div class="col-lg-9 col-sm-12">
    {{{ end }}}
        <ul class="list-group">
        {{{ each levels }}}
        <li class="list-group-item">
            <div class="row">
                <div class="col-lg-3">
                    <strong>{./level-name}</strong>
                    <p class="help-block">[[userlevel:topic-REPUTATION, {./min-reputation}]]</p>
                </div>
            </div>
        </li>
        {{{ end }}}
        </ul>
        <!-- IMPORT partials/paginator.tpl -->
    </div>

    <div data-widget-area="right" class="col-lg-3 col-sm-12 {{{ if !widgets.right.length }}}hidden{{{ end }}}">
        {{{each widgets.right}}}
        {{widgets.right.html}}
        {{{end}}}
    </div>
</div>
<div data-widget-area="footer">
	{{{each widgets.footer}}}
	{{widgets.footer.html}}
	{{{end}}}
</div>