jQuery(document).ready(function($) {

	// var socket = io();

	$('#add-liveblog .submit').click(function(event) {

		// Don't want the click to be clicked like normal.
		event.preventDefault();

		var form = {
			name: $('#name').val(),
			url:  $('#url').val(),
			break: $('#break-by-date').prop('checked')
		};

		// Make the ajax request with the form data.
		$.ajax({
			url: '/liveblogs',
			data: form,
			type: 'POST',
			success: function(res) {
				console.log( res );
				$('#liveblog tbody').append(
					$('<tr>')
						.append(
							$('<td>').text(res._id)
						)
						.append(
							$('<td>').text(res.name)
						)
						.append(
							$('<td>').text(res.url)
						)
						.append(
							$('<td>').text(res.break)
						)
				);
			}
		});

	});

});