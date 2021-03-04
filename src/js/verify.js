$(document).ready(function()
{
	// Navigation
	$('.menu').on('click', function()
	{
		$('body').toggleClass('nav-open');
	});

	$('nav a.close').on('click', function()
	{
		$('body').removeClass('nav-open');
	});

	// Close menu on any outside-nav click
	$('body').on('click', function(e)
	{
		if (!$(e.target).is('.menu') && $(e.target).closest('nav').length < 1)
		{
			$('body').removeClass('nav-open');
		}
	});

	// Homepage slider
	$('.venture-slider').slick({
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000
	});

	// Open bios
	$('.chips').on('click', '.chip a[data-action="open-bio"]', function(e)
	{
		e.preventDefault();
		$(this).next().toggleClass('open');
	});


	// Delay animations from playing until they're on the screen
	var players = [];
	$('lottie-player').each(function()
	{
		players.push({
			top: $(this).offset().top,
			element: this,
			playing: false
		});
	});

	var scrollPosition = $(window).scrollTop();
	var windowHeight = $(window).height();
	$(window).on('scroll', function()
	{
		scrollPosition = $(this).scrollTop();
		windowHeight = $(this).height();
	});

	var animations = [];
	$('[data-in-view-class]').each(function()
	{
		animations.push({
			top: $(this).offset().top,
			element: this,
			transitioned: false,
			newClass: $(this).data('in-view-class'),
			removeClass: $(this).data('remove-class')
		});
	});


	var checkPlayers = function()
	{
		for(var p = 0; p < players.length; p++)
		{
			var player = players[p];
			if (!player.playing && player.top < (scrollPosition + windowHeight - 200))
			{
				player.element.play();
				players[p].playing = true;
			}

		}
	};

	var checkAnimations = function()
	{
		for(var a = 0; a < animations.length; a++)
		{
			var animation = animations[a];
			if (!animation.transitioned && animation.top < (scrollPosition + windowHeight - 200))
			{
				$(animation.element).addClass(animation.newClass).removeClass(animation.removeClass);
				animations[a].transitioned = true;
			}

		}
	};

	setInterval(checkPlayers, 1000);
	setInterval(checkAnimations, 1000);

});