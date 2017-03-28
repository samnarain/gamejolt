import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as View from '!view!./history.html?style=./history.styl';

import { SearchHistory } from './history-service';
import { Popover } from '../../../../lib/gj-lib-client/components/popover/popover.service';
import { AppPopoverTrigger } from '../../../../lib/gj-lib-client/components/popover/popover-trigger.directive.vue';
import { AppTrackEvent } from '../../../../lib/gj-lib-client/components/analytics/track-event.directive.vue';
import { AppJolticon } from '../../../../lib/gj-lib-client/vue/components/jolticon/jolticon';
import { AppPopover } from '../../../../lib/gj-lib-client/components/popover/popover';

@View
@Component({
	name: 'search-history',
	components: {
		AppJolticon,
		AppPopover,
	},
	directives: {
		AppPopoverTrigger,
		AppTrackEvent,
	},
})
export class AppSearchHistory extends Vue
{
	isVisible = false;
	recentSearches: string[] = [];

	refresh()
	{
		this.recentSearches = SearchHistory.get();
	}

	onShow()
	{
		this.isVisible = true;
		this.refresh();
	}

	onHide()
	{
		this.isVisible = false;
	}

	go( query: string )
	{
		// TODO
		// const $state = getProvider<StateService>( '$state' );
		// $state.go( 'search.results', { q: query } );
		Popover.hideAll();
	}

	clear()
	{
		SearchHistory.clear();
		Popover.hideAll();
	}
}