var currentDay = moment().format('dddd, MMMM Do');
$('#currentDay').text(currentDay);

var activities = JSON.parse(localStorage.getItem('activities')) || [];

var renderActivities = function() {
    if (activities !== []) {
    activities.forEach(function(activity) {
            $('#' + activity.hour).closest('.time-block').find('.description').val(activity.description);
        });
    }
    auditTimeBlocks();
}

$('.saveBtn').on('click', function () {
    event.preventDefault();
    var hour = $(this).closest('.time-block').find('.hour').text();
    var description = $(this).closest('.time-block').find('.description').val();

    var newActivity = true;
    activities.forEach(function(activity) {
        if (activity.hour === hour) {
            activity.description = description;
            return newActivity = false;
        } 
    });
    if (newActivity) {
        activities.push({'hour': hour, 'description': description});
    }
    localStorage.setItem('activities', JSON.stringify(activities));
});


var auditTimeBlocks = function() { 
    var currentHour = moment().hour();
    $('.time-block').each(function (timeBlock) {
        var hour = $(this).find('p.hour').attr('id');       
        hour = moment(hour, 'hA').hour();                  
        if (hour < currentHour) {
            $(this).find('textarea').addClass('past');      
        }
        else if (hour === currentHour) {
            $(this).find('textarea').addClass('present');   
        }
        else {
            $(this).find('textarea').addClass('future');   
        }
    });
};


renderActivities();
