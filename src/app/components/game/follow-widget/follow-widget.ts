import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as View from '!view!./follow-widget.html';

import { Game } from '../../../../lib/gj-lib-client/components/game/game.model';
import { AppState } from '../../../../lib/gj-lib-client/vue/services/app/app-store';
import { Growls } from '../../../../lib/gj-lib-client/components/growls/growls.service';
import { AppJolticon } from '../../../../lib/gj-lib-client/vue/components/jolticon/jolticon';
import { number } from '../../../../lib/gj-lib-client/vue/filters/number';
import { AppAuthRequired } from '../../../../lib/gj-lib-client/components/auth/auth-required-directive.vue';
import { AppTrackEvent } from '../../../../lib/gj-lib-client/components/analytics/track-event.directive.vue';
import { AppTooltip } from '../../../../lib/gj-lib-client/components/tooltip/tooltip';

@View
@Component({
	components: {
		AppJolticon,
	},
	directives: {
		AppAuthRequired,
		AppTrackEvent,
		AppTooltip,
	},
	filters: {
		number,
	},
})
export class AppGameFollowWidget extends Vue
{
	@Prop( Game ) game: Game;
	@Prop( Boolean ) sparse?: boolean;

	@State app: AppState;

	followTooltip: string;
	isProcessing = false;

	async onClick()
	{
		if ( !this.app.user || this.isProcessing ) {
			return;
		}

		this.isProcessing = true;

		if ( !this.game.is_following ) {
			try {
				await this.game.$follow();
			}
			catch ( e ) {
				Growls.error(
					this.$gettext( 'Something has prevented you from following this game.' )
				);
			}
		}
		else {
			try {
				await this.game.$unfollow();
			}
			catch ( e ) {
				Growls.error(
					this.$gettext( 'library.followed.remove_game_error_growl' ),
					this.$gettext( 'library.followed.remove_game_error_growl_title' )
				);
			}
		}

		this.isProcessing = false;
	}
}
