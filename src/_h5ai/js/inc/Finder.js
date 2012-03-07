
(function ($, h5ai) {

	var filter = function (re) {

			var match = [],
				noMatch = [];

			if (re) {
				$('#extended .entry').each(function () {

					var label = $(this).find('.label').text();

					if (label.match(re)) {
						match.push(this);
					} else {
						noMatch.push(this);
					}
				});
			} else {
				match = $('#extended .entry');
			}

			if ($(match).length) {
				$('#extended .no-match').hide();
			} else {
				setTimeout(function () {

						$('#extended .no-match').show();
				}, 200);
			}
			$(match).fadeIn(200);
			$(noMatch).fadeOut(200);
		},
		checkState = function (focus) {

			var $filter = $('#filter'),
				$input = $filter.find('input'),
				val = $input.val();

			if (val || focus) {
				$filter.addClass('current');
			} else {
				$filter.removeClass('current');
			}
			h5ai.core.hash({filter: val});
		},
		parseFilterSequence = function (sequence) {

			if (sequence.substr(0,3) === 're:') {
				return new RegExp(sequence.substr(3));
			}

			sequence = $.map($.trim(sequence).split(/\s+/), function (part) {

				return h5ai.util.reEscape(part);
			}).join('|');
			return new RegExp(sequence);
		},
		init = function () {

			if (h5ai.settings.showFilter) {
				$('<li id="filter"><span class="element"><img alt="filter" /><input type="text" value="" placeholder="filter" /></span></li>')
					.on('click', function () {

						var $input = $(this).find('input');
						$input.focus();
					})
					.find('img').attr('src', h5ai.core.image('filter')).end()
					.find('input')
						.on('focus', function () {

							checkState(true);
						})
						.on('blur', function () {

							checkState(false);
						})
						.on('keyup', function () {

							var $input = $(this),
								val = $input.val();

							if (val) {
								filter(parseFilterSequence(val));
							} else {
								filter();
							}
							checkState($input.is(':focus'));
						})
					.end()
					.appendTo($('#navbar'));

				var initialFilter = h5ai.core.hash('filter');
				if (initialFilter) {
					$('#filter input').val(initialFilter);
					checkState(false);
				}
			}
		};

	h5ai.finder = {
		init: init,
		filter: filter
	};

}(jQuery, h5ai));