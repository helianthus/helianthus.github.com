$(function() {
  var doors = ['A','B','C'];
  var stat = function(target) {
    return target+ '/' + total + ' (' + ((target/ total) * 100).toFixed(2) + '%)';
  };
  var jDoors = $('#doors > div');
  var stage = 1;
  var wins = 0;
  var changeWins = 0;
  var total = 0;
  var gold;
  var game = {
    reset: function() {
      stage = 0;
      gold = ~~(Math.random() * 3);
      $('#msg').text('Choose a door.');
      $('#reset').hide();
      $.each(doors, function(i, door) {
        jDoors.eq(i).removeClass().text(door);
      });
    },

    start: function(clicked) {
    	stage = 1;
      var remains = [0,1,2];
      remains.splice(clicked, 1);
      if(clicked !== gold) {
        ++changeWins;
      }

      jDoors.eq(clicked).addClass('selected');
      $('#msg').text('Keep ' + doors[clicked] + ' or change to ' + doors[remains.splice(clicked !== gold ? (gold === remains[0] : 0 : 1) : ~~(Math.random() * 2), 1)] + '?');
      jDoors.eq(remains[0]).addClass('removed');
    },

    result: function(clicked) {
    	stage = 2;
      ++total;
      var win = clicked === gold;
      jDoors.eq(gold).addClass('gold');
      $('#msg').text((win ? 'You win!' : 'You lose!') + ' The gold is in ' + doors[gold] + '.');
      $('#wins').text(stat(win ? ++wins : wins));
      $('#chance').text(stat(changeWins));
      $('#reset').show();
    },

    autoplay: function(times) {
      game.reset();
      game.start(0);
      game.result(0);
      if(--times) {
        setTimeout(function(){ game.autoplay(times); }, 0);
      }
    }
  };

  $('#doors').delegate('div', 'click', function() {
    if(stage < 2) {
      game[stage === 0 ? 'start' : 'result']($(this).index());
    }
  });

  $('#reset').click(game.reset);

  $('#autoplay').click(function() {
  	var times = +$('#times').val();
    times && game.autoplay(times);
  });

  game.reset();
});
