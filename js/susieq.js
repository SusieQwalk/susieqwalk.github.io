window.openSection = function(target) {
  var selector = target.match(/[^\#]*(\#.*)/)[1];
  $(selector).removeAttr('hidden');
  $('[href="' + selector + '"]').parent('p').addClass('is-open');
}

window.openTargetAndPreviousSections = function(target) {
  // open previous sections
  for(var found = false, i = openers.length ; i; i--) {
    if (openers[i-1].href.match(/[^\#]+(\#.*)/)[1]== '#' + target) {
      found = true;
    }
    if (found && !openers[i-1].className.match(/dont\-auto\-open/)) {
      openSection(openers[i - 1].href);
    }
  }
};

$(function() {
  window.openers = $('.opener');

  $('.closerer').on('click', function(event) {
    var $this = $(this),
        selector = $this.data('target'),
        $el = $(selector);

    event.preventDefault();

    if ($el.length) {
      $el.prop('hidden', true);

      $this.parent('p').toggleClass('is-open');

      location.hash = $this.attr('href');
    }
  });

  $('.opener').on('click', function(event) {
    var $this = $(this),
        selector = $this.attr('href'),
        $el = $(selector);

    $this.parent('p').toggleClass('is-open');

    if ($el.length) {
      $el.removeAttr('hidden');

      event.preventDefault();

      location.hash = selector.replace(/^\#/, 'seccao-');
    
      window.scrollBy(0, 1);
    }
  });

  if (location.hash.match(/\#seccao-/)) {
    var target = location.hash.replace(/^\#seccao-/, '');

    openTargetAndPreviousSections(target);

    //jumpTo('#' + target, false);
  } else if (location.hash != "" && location.hash != "#") {
    var $element = $(location.hash),
        section = $element.parents('[hidden][id]');

    jumpTo(location.hash);
  }
});

window.jumpTo = function(selector) {
  var $target = $(selector),
      section = $target.parents('[hidden][id]'),
      updateHash = arguments[1] || false;

  if ($target.length) {
    if (section.length) {
      openSection('#' + section.attr('id'));
    }
    $('html, body').animate({
        scrollTop: $target.offset().top - 120
    }, 500);
    if (updateHash) {
      setTimeout(function() {
        location.hash = selector;
      }, 500);
    }
  }
};

// Jump animation
$(".jump").click(function() {
  var selector = this.href.match(/[^\#]*(\#.*)/)[1];

  jumpTo(selector);

  return false;
});

$('.right-drawer a').on('click', function(event) {
  $('.ink-drawer').toggleClass('push right');
});