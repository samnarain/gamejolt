import Vue from 'vue';
import VueRouter from 'vue-router';
import { Component } from 'vue-property-decorator';
import * as View from '!view!./view.html';

import { BeforeRouteEnter } from '../../../../../../../../../lib/gj-lib-client/utils/router';
import { Api } from '../../../../../../../../../lib/gj-lib-client/components/api/api.service';
import { ModalConfirm } from '../../../../../../../../../lib/gj-lib-client/components/modal/confirm/confirm-service';
import { Meta } from '../../../../../../../../../lib/gj-lib-client/components/meta/meta-service';
import { RouteState, RouteStore } from '../../../../manage.state';
import { GameDataStoreItem } from '../../../../../../../../../lib/gj-lib-client/components/game/data-store/item/item.model';
import { AppJolticon } from '../../../../../../../../../lib/gj-lib-client/vue/components/jolticon/jolticon';
import { date } from '../../../../../../../../../lib/gj-lib-client/vue/filters/date';

@View
@Component({
	components: {
		AppJolticon,
	},
	filters: {
		date,
	},
})
export default class RouteDashGamesManageApiDataStorageItemsView extends Vue {
	@RouteState game: RouteStore['game'];

	item: GameDataStoreItem = null as any;

	@BeforeRouteEnter()
	routeEnter(this: undefined, route: VueRouter.Route) {
		return Api.sendRequest(
			'/web/dash/developer/games/api/data-storage/' +
				route.params.id +
				'/' +
				route.params.item
		);
	}

	routed() {
		Meta.title = this.$gettextInterpolate('Item Details - %{ game }', {
			game: this.game.title,
		});

		this.item = new GameDataStoreItem(this.$payload.item);
	}

	async remove() {
		const result = await ModalConfirm.show(
			this.$gettext('dash.games.data_store.items.remove_confirmation')
		);

		if (!result) {
			return;
		}

		await this.item.$remove();
		this.$router.push('dash.games.manage.api.data-storage.items.list');
	}
}
